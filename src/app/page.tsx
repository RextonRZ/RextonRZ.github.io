import "./page.css";

export default function Home() {
  return (
    <div className="container">
      <section className="hero">
        <div className="hero-grid">
          {/* Left Column: Text Content */}
          <div className="hero-content">
            <h3 className="title">Hi, I'm </h3>
            <h1 className="name"><span className="highlight">Rui Zhe</span></h1>
            <h2 className="subtitle">AI Undergraduate</h2>
            <p className="description">
              Focused on AI, full-stack development, and building data-driven systems that deliver real impact.
            </p>
            <div className="actions">
              <a href="/projects" className="btn btn-primary">View Projects</a>
              <a href="/contact" className="btn btn-secondary">Get in touch</a>
            </div>
          </div>

          {/* Right Column: Profile Media */}
          <div className="hero-media">
            <div className="media-blob">
              <video
                className="profile-video"
                src="/Rui%20Zhe%20Profile.mp4"
                muted
                loop
                playsInline
                autoPlay
              />
              <img
                className="profile-image"
                src="/Rui%20Zhe%20Profile%201.jpg"
                alt="Rui Zhe Profile"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
