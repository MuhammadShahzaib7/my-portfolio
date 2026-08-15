export const metadata = {
  title: "About Me | My Portfolio",
  description: "Learn more about my background, education, and experience.",
};

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-primary mb-12 text-center">About Me</h1>
      
      <div className="space-y-16">
        <section className="bg-card p-8 rounded-2xl border border-border shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Bio</h2>
          <p className="text-foreground/80 leading-relaxed">
            I am a passionate Full Stack Web Developer with a strong foundation in modern web technologies. 
            I love building applications that solve real-world problems and provide intuitive user experiences.
            When I&apos;m not coding, you can find me exploring new technologies or contributing to open-source projects.
          </p>
        </section>

        <section className="bg-card p-8 rounded-2xl border border-border shadow-sm">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">Education</h2>
          <div className="border-l-2 border-primary/30 pl-6 space-y-6">
            <div>
              <h3 className="text-xl font-medium text-primary">BS IT</h3>
              <p className="text-foreground/60 text-sm mb-2">Numl • 2023 - 2027</p>
              <p className="text-foreground/80">Focused on IT related subjects and web development.</p>
            </div>
          </div>
        </section>

        <section className="bg-card p-8 rounded-2xl border border-border shadow-sm">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">Experience</h2>
          <div className="border-l-2 border-primary/30 pl-6 space-y-8">
            <div>
              <h3 className="text-xl font-medium text-primary">Frontend Engineering Intern</h3>
              <p className="text-foreground/60 text-sm mb-2">Flyrank • June 2026 - Present</p>
              <p className="text-foreground/80">Working on frontend engineering tasks, developing and maintaining responsive web applications.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-primary">React Intern</h3>
              <p className="text-foreground/60 text-sm mb-2">Alberuni Tech • Feb 2026 - April 2026</p>
              <p className="text-foreground/80">Developed UI components and integrated features using React and modern frontend technologies.</p>
            </div>
          </div>
        </section>

        <section className="bg-card p-8 rounded-2xl border border-border shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Goals</h2>
          <p className="text-foreground/80 leading-relaxed">
            My current goals involve deepening my expertise in cloud architecture, learning more about web performance optimization, and building accessible web experiences for all users.
          </p>
        </section>
      </div>

      <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">
        <a 
          href="https://www.linkedin.com/in/muhammad-shahzaib-983ba2266" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
        >
          LinkedIn Profile
        </a>
        <a 
          href="/cv.pdf" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-8 py-3 bg-card border border-border text-foreground font-medium rounded-lg hover:bg-muted transition-colors shadow-sm"
        >
          View CV
        </a>
      </div>
    </div>
  );
}
