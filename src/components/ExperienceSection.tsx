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
    image: "/kitahackworkshop.jpeg",  
    position: <>Speaker<br />KitaHack 2026 Kick-Off Workshop</>,  
    date: "Jan 2026",
    description: "Delivered 'From Zero to Hero' session as a KitaHack 2025 Champion. Shared hackathon winning strategies, ideal pitching, and technical workflows with over 400+ participants." 
  },
  { 
    image: "/umscom.jpeg",  
    position: <>Head of Department <br />Sponsorship<br />UM Startup Community</>,  
    date: "Jul 2024 – Aug 2025",
    description: "Developed PR strategies and led stakeholder partnerships with organizations like Ignite Asia, NTT Startup, and UniLah to boost community exposure." 
  },
  { 
    image: "/ellmdirector.png",  
    position: <>Director <br /> ELLM Startup Initiative 2025</>,  
    date: "Apr – May 2025",
    description: "Led a national AI/LLM startup competition for 40+ university teams. Secured partnerships with MoneyLion, Cradle Fund, and 17+ media partners." 
  },
  { 
    image: "/umdacmnp.jpeg",  
    position: <>HoD Multimedia & Publicity<br />University Malaya Data Analytics Club (UMDAC)</>,  
    date: "Jan 2024 – Mar 2025",
    description: "Led a 9-member team across Videography, Design, Photography, and Publicity. Managed media for various events hosted by UMDAC." 
  },
  { 
    image: "/pekomspr.jpeg",  
    position: <>Sponsorship & PR Team<br />Computer Society UM (PEKOM)</>,  
    date: "Mar 2023 – Jun 2024",
    description: "Collaborated on PR strategies and led meetings to secure corporate partnerships. Crafted comprehensive sponsorship decks and engagement content." 
  },
  { 
    image: "/gdscdev.jpeg",  
    position: <>Developers Core Team<br />Google Developer Student Clubs (GDSC)</>,  
    date: "Mar 2023 – Jun 2024",
    description: "Served as Vice Secretary for AI Study Jam and Technical /Logistics Lead for Data Science Speed Run and ASEAN Data Science Explorer Sessions." 
  },
  { 
    image: "/airasiaindustrial.jpeg",  
    position: <>Secretary<br />AirAsia Industrial Site Visit 2024</>,  
    date: "Apr – May 2024",
    description: "Coordinated event itinerary, managed communications and registration, authored proposals, and provided full on-site support for the industrial visit." 
  },
  { 
    image: "/dsdrtech.jpeg",  
    position: <>HoD Logistic & Technical<br />GDSC Data Science Speed Run</>,  
    date: "Nov – Dec 2023",
    description: "Directed physical setup, floor plans, and technical cue lists. Managed on-site rehearsals, technical equipment, slide control, and the Slido platform for seamless execution." 
  }
];

// CSS z-index per card (index 0 = card 1). Front=5, Mid=3, Back=1
const Z_LAYERS = [5, 3, 1, 3, 5, 1, 3, 5];

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
