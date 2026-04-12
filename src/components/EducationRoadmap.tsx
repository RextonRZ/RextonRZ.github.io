import { useEffect, useRef, useState } from "react";
import "./EducationRoadmap.css";

const educationData = [
  {
    period: "JULY 2022 – MAY 2023",
    institution: "SMJK Chung Ling Pulau Pinang",
    stream: "Science Stream",
    grades: "SPM Grade : 8 A+, 4 A",
    images: [
      "/clhs1.jpg",
      "/clhs2.jpg",
      "/clhs3.jpg",
      "/clhs4.jpg",
      "/clhs5.jpg",
      "/clhs6.jpg"
    ]
  },
  {
    period: "JULY 2022 – MAY 2023",
    institution: "Penang Matriculation College",
    stream: "Matriculation (Life Science)",
    grades: "CGPA 4.00",
    images: [
      "/pmc1.jpg",
      "/pmc2.jpg",
      "/pmc3.jpg",
      "/pmc4.jpg",
      "/pmc5.jpg",
      "/pmc6.jpg"
    ]
  },
  {
    period: "Oct. 2023 - Present",
    institution: "University Malaya",
    stream: "Bachelor of Computer Science (Artificial Intelligence)",
    grades: "",
    images: [
      "/um.jpg",
      "/um1.jpg",
      "/um2.jpg",
      "/um3.jpg",
      "/um4.jpg",
      "/um5.jpg"
    ]
  }
];

export function EducationRoadmap() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const DRAG_THRESHOLD = 250;

  // Manage currently visible images for each milestone (6 total per milestone)
  const [activeIndices, setActiveIndices] = useState<number[][]>([
    [0, 1, 2, 3, 4, 5], // images for SMJK
    [0, 1, 2, 3, 4, 5], // images for Penang
    [0, 1, 2, 3, 4, 5]  // images for UM
  ]);

  // State for pop animations
  const [popState, setPopState] = useState<{ milestone: number, type: "idle" | "pop-b1" | "pop-b2" }>({ milestone: -1, type: "idle" });
  const [enteringState, setEnteringState] = useState<{ milestone: number }>({ milestone: -1 });

  // Auto-slide effect (5s no touch)
  useEffect(() => {
    if (isDragging || popState.type !== "idle" || enteringState.milestone !== -1) {
      return;
    }
    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % educationData.length);
    }, 5000);

    return () => clearTimeout(timer);
  }, [activeIndex, isDragging, popState.type, enteringState.milestone]);

  const handleDoubleClick = (milestoneIndex: number, bubble: 1 | 2) => {
    // Only allow popping if not already dragging or animating
    if (popState.type !== "idle" || isDragging || enteringState.milestone !== -1 || Math.round(continuousIndex) !== milestoneIndex) return;

    setPopState({ milestone: milestoneIndex, type: bubble === 1 ? "pop-b1" : "pop-b2" });

    // Animate for 400ms, then swap arrays
    setTimeout(() => {
      setActiveIndices(prev => {
        const next = [...prev];
        const currentArr = [...next[milestoneIndex]];

        if (bubble === 1) {
          // Pop Bubble 1 (item at index 0)
          const popped = currentArr.shift()!;
          currentArr.push(popped);
        } else {
          // Pop Bubble 2 (item at index 1)
          const popped = currentArr.splice(1, 1)[0];
          currentArr.push(popped);
        }

        next[milestoneIndex] = currentArr;
        return next;
      });

      // Clear the pop out classes and trigger the pop in classes
      setPopState({ milestone: -1, type: "idle" });
      setEnteringState({ milestone: milestoneIndex });

      // After 400ms pop in completes, clear state
      setTimeout(() => {
        setEnteringState({ milestone: -1 });
      }, 400);
    }, 400);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
    // Prevent default to avoid text selection during drag
    e.target.addEventListener('pointercapture', (ev: any) => ev.target.releasePointerCapture(ev.pointerId), { once: true });
  };

  useEffect(() => {
    if (!isDragging) return;

    const onPointerMove = (e: PointerEvent) => {
      const diff = e.clientX - startXRef.current;
      setDragOffset(diff);
    };

    const onPointerUp = () => {
      setIsDragging(false);
      if (dragOffset < -80 && activeIndex < educationData.length - 1) {
        setActiveIndex(prev => prev + 1);
      } else if (dragOffset > 80 && activeIndex > 0) {
        setActiveIndex(prev => prev - 1);
      }
      setDragOffset(0);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, [isDragging, dragOffset, activeIndex]);

  let dragFraction = dragOffset / DRAG_THRESHOLD;
  if (activeIndex === 0 && dragFraction > 0) dragFraction *= 0.3; // clamp rubberband
  if (activeIndex === educationData.length - 1 && dragFraction < 0) dragFraction *= 0.3;

  const continuousIndex = isDragging ? activeIndex - dragFraction : activeIndex;

  // The rendering active index determines the bubble images
  const renderActiveIndex = Math.min(2, Math.max(0, Math.round(continuousIndex)));

  return (
    <section id="education" className="education-section">
      <div className="education-layout">
        {/* Left: Interactive Timeline Items */}
        <div
          className="education-timeline"
          onPointerDown={handlePointerDown}
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
        >
          {educationData.map((item, index) => {
            const offset = index - continuousIndex;

            let opacity = 0;
            let translateX = 0;
            let scale = 1;

            if (offset >= 0) {
              // Future to Active
              translateX = offset * 250;
              // Fade text quickly so next item's text is not visible
              opacity = 1 - (offset * 1.2);
              scale = 1.15 - (offset * 0.15);
            } else {
              // Active to Past
              translateX = offset * 350;
              opacity = 1 + (offset * 1.5);
              scale = 1.15 + (offset * 0.15);
            }

            opacity = Math.max(0, Math.min(1, opacity));

            return (
              <div
                key={index}
                className={`education-item ${isDragging ? "dragging" : ""}`}
                style={{
                  transform: `translateY(-50%) translateX(${translateX}px) scale(${scale})`,
                  opacity: opacity,
                  pointerEvents: index === renderActiveIndex ? "auto" : "none",
                  zIndex: 10 - index
                }}
              >
                <p className="edu-period">{item.period}</p>
                <h3 className="edu-institution">{item.institution}</h3>
                <div className="edu-stream">{item.stream}</div>
                {item.grades && <div className="edu-grades">{item.grades}</div>}
              </div>
            );
          })}
        </div>

        <div
          className="education-bubbles-area"
          onPointerDown={isDragging ? undefined : handlePointerDown}
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
        >
          {educationData.map((item, index) => {
            const offset = index - continuousIndex;
            const [idx1, idx2] = activeIndices[index] || [0, 1];

            // Pop States
            const isPopB1 = popState.milestone === index && popState.type === "pop-b1";
            const isPopB2 = popState.milestone === index && popState.type === "pop-b2";
            const isEntering = enteringState.milestone === index;

            let b1TranslateX = 0;
            let b1TranslateY = 0;
            let b1Scale = 1;
            let b1Opacity = 0;
            let b1Blur = 0;

            let b2TranslateX = 0;
            let b2Opacity = 0;
            let b2Scale = 1;

            if (offset >= 0 && offset <= 1) {
              // Interpolating towards active
              // When offset = 1 (it is the next item preview, appearing as the "3rd bubble")
              b1TranslateX = offset * 220;
              b1TranslateY = offset * 80;
              b1Scale = 1 - (offset * 0.4); // 0.6 size when preview
              b1Opacity = 1 - (offset * 0.4); // 0.6 opacity when preview
              b1Blur = offset * 5;

              b2TranslateX = offset * 100;
              b2Scale = 1 - (offset * 0.2);
              b2Opacity = 1 - (offset * 2); // Fades completely out early so it doesn't show in preview
            } else if (offset > 1) {
              // Next-next preview is invisible
              b1Opacity = 0;
              b2Opacity = 0;
            } else if (offset < 0) {
              // Past item fading out quickly
              b1TranslateX = offset * 150;
              b1Opacity = 1 + (offset * 2.5);
              b1Scale = 1 + (offset * 0.1);
              b2TranslateX = offset * 150;
              b2Opacity = 1 + (offset * 2.5);
              b2Scale = 1 + (offset * 0.1);
            }

            b1Opacity = Math.max(0, Math.min(1, b1Opacity));
            b2Opacity = Math.max(0, Math.min(1, b2Opacity));

            return (
              <div
                key={index}
                className="edu-bubble-group"
                style={{
                  zIndex: 10 - Math.abs(offset)
                }}
              >
                <div
                  className={`edu-bubble-wrapper ${isDragging ? "dragging" : ""}`}
                  style={{
                    transform: `translate(${b1TranslateX}px, ${b1TranslateY}px) scale(${b1Scale})`,
                    opacity: b1Opacity,
                    filter: `blur(${b1Blur}px)`
                  }}
                >
                  <div
                    className={`edu-bubble edu-bubble-1 ${isPopB1 ? "pop-out" : ""}`}
                    onDoubleClick={() => handleDoubleClick(index, 1)}
                    style={{ pointerEvents: "auto", cursor: "pointer" }}
                  >
                    <img src={item.images[idx1]} draggable="false" alt={`${item.institution} image 1`} />
                  </div>
                </div>

                <div
                  className={`edu-bubble-wrapper ${isDragging ? "dragging" : ""}`}
                  style={{
                    transform: `translateX(${b2TranslateX}px) scale(${b2Scale})`,
                    opacity: b2Opacity
                  }}
                >
                  <div
                    className={`edu-bubble edu-bubble-2 ${isPopB1 ? "move-to-1" : ""} ${isPopB2 ? "pop-out" : ""} ${isEntering ? "pop-in" : ""}`}
                    onDoubleClick={() => handleDoubleClick(index, 2)}
                    style={{
                      animationDelay: (isPopB1 || isPopB2 || isEntering) ? "0s" : "1s",
                      animationDirection: (isPopB1 || isPopB2 || isEntering) ? "normal" : "reverse",
                      pointerEvents: "auto",
                      cursor: "pointer"
                    }}
                  >
                    <img src={item.images[idx2]} draggable="false" alt={`${item.institution} image 2`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
