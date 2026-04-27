"use client";
import { useState } from "react";
import "./ExperienceSection.css";

export interface ExperienceCard {
  image: string;
  position: React.ReactNode;
  description: React.ReactNode;
  date?: string;
}

const experiences: ExperienceCard[] = [
  { 
    image: "/ellmdirector.png",  
    position: <>Director <br /> ELLM Startup Initiative 2025</>,  
    date: "Apr – May 2025",
    description: "Led a national AI/LLM startup competition for 40+ university teams. Secured partnerships with MoneyLion, Cradle Fund, and 17+ media partners." 
  },
  { 
    image: "/umscom.jpeg",  
    position: <>Head of Department <br />Sponsorship<br />UM Startup Community</>,  
    date: "Jul 2024 – Aug 2025",
    description: "Developed PR strategies and led stakeholder partnerships with organizations like Ignite Asia, NTT Startup, and UniLah to boost community exposure." 
  },
  { image: "/exp3.jpg",  position: "Position 3",  description: "Short description of what you did in this role." },
  { image: "/exp4.jpg",  position: "Position 4",  description: "Short description of what you did in this role." },
  { image: "/exp5.jpg",  position: "Position 5",  description: "Short description of what you did in this role." },
  { image: "/exp6.jpg",  position: "Position 6",  description: "Short description of what you did in this role." },
  { image: "/exp7.jpg",  position: "Position 7",  description: "Short description of what you did in this role." },
  { image: "/exp8.jpg",  position: "Position 8",  description: "Short description of what you did in this role." },
  { image: "/exp9.jpg",  position: "Position 9",  description: "Short description of what you did in this role." },
  { image: "/exp10.jpg", position: "Position 10", description: "Short description of what you did in this role." },
];

// CSS z-index per card (index 0 = card 1). Front=5, Mid=3, Back=1
const Z_LAYERS = [5, 3, 1, 3, 5, 1, 3, 5, 3, 1];

export function ExperienceSection() {
  const [selected, setSelected] = useState<ExperienceCard | null>(null);

  return (
    <section id="experience" className="experience-section">
      <h2 className="experience-heading">Experience</h2>

      <div className="experience-float-area">
        {experiences.map((exp, i) => (
          <div
            key={i}
            className={`exp-card-drift exp-card-drift--${i + 1}`}
          >
            <div className="exp-card" onClick={() => setSelected(exp)}>
              <div className="exp-card-img-wrap">
                <img src={exp.image} alt="Experience image" className="exp-card-img" draggable="false" />
                {exp.date && <span className="exp-card-date-tag">{exp.date}</span>}
              </div>
              <div className="exp-card-body">
                <h3 className="exp-card-position">{exp.position}</h3>
                <p className="exp-card-desc">{exp.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="exp-modal-overlay" onClick={() => setSelected(null)}>
          <div className="exp-modal" onClick={e => e.stopPropagation()}>
            <button className="exp-modal-close" onClick={() => setSelected(null)} aria-label="Close">✕</button>
            <div className="exp-modal-img-wrap">
              <img src={selected.image} alt="Experience modal image" className="exp-modal-img" />
              {selected.date && <span className="exp-card-date-tag exp-modal-date-tag">{selected.date}</span>}
            </div>
            <div className="exp-modal-body">
              <h3 className="exp-modal-position">{selected.position}</h3>
              <p className="exp-modal-desc">{selected.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
