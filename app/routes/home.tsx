import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { Button } from "~/components/UI/Button";
import { ArrowUpRight, Clock, Layers } from "lucide-react";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Roomify Home" },
    { name: "description", content: "Welcome to Roomify!" },
  ];
}

export default function Home() {
  return (
    <div className="home">
      <Navbar />

      <section className="hero">
        <div className="announce">
          <div className="dot">
            <div className="pulse">
            </div>
          </div>
          <p>Introducing Roomify 2.0</p>
        </div>

        <h1>Build beautiful spaces at the speed of thought with Roomify</h1>

        <p className="subtitle">Roomify is an AI-first design environment that helps you visualize, render and ship architectural designs faster than ever before.</p>

        <div className="actions">

          <a href="#upload" className="btn btn--primary btn--lg">Get Started</a>

          <Button variant="outline" size="lg" className="demo">
            Watch Demo
          </Button>
        </div>

        <div className="upload-shell">
          <div className="grid-overlay" />
          <div className="upload-card">
            <div className="upload-head">
              <div className="upload-icon">
                <Layers className="icon" />
              </div>
              <h3>Upload your floor plan</h3>
              <p>supports JPG,PNG formats upto 10MB</p>
            </div>
            <p>Upload images</p>
          </div>
        </div>
      </section>

      {/* section for project  */}
      <section className="projects">
        <div className="section-inner">
          <div className="section-head">
            <div className="copy">
              <h2>Projects</h2>
              <p> Your latest work and shared community projects all in one place. </p>
            </div>
          </div>
          <div className="projects-grid">
            <div className="project-card group">
              <div className="preview">
                <img src="https://www.archxstudio.com/wp-content/uploads/2018/05/Main-1-scaled.jpg
                " alt="project" />

                <div className="badge">
                  <span>Community</span>
                </div>
              </div>
              <div className="card-body">
                <div>
                  <h3>Project Manhattan</h3>
                  <div className="meta">
                    <Clock size={12} />
                    <span>{new Date(`01.01.2027`).toLocaleDateString()}</span>
                    <span> by John Doe</span>
                  </div>
                </div>
                <div className="arrow">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
