import './About.css'

function About() {
  return (
    <div className="about-container">
      <h1 className="about-title">About Me</h1>

      <section className="about-section">
        <h2>Who I Am</h2>
        <p>
          Write a short intro about yourself here — who you are, what you do,
          and what drives you.
        </p>
      </section>

      <section className="about-section">
        <h2>What I'm Working On</h2>
        <p>
          Describe your current projects, interests, or ventures. What are you
          building and why?
        </p>
      </section>

      <section className="about-section">
        <h2>Background</h2>
        <p>
          Share your background — education, career path, key experiences that
          shaped your perspective.
        </p>
      </section>
    </div>
  )
}

export default About
