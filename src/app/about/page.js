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
            When I'm not coding, you can find me exploring new technologies or contributing to open-source projects.
          </p>
        </section>

        <section className="bg-card p-8 rounded-2xl border border-border shadow-sm">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">Education</h2>
          <div className="border-l-2 border-primary/30 pl-6 space-y-6">
            <div>
              <h3 className="text-xl font-medium text-primary">B.S. Computer Science</h3>
              <p className="text-foreground/60 text-sm mb-2">University Name • 2018 - 2022</p>
              <p className="text-foreground/80">Focused on software engineering, web development, and algorithms.</p>
            </div>
          </div>
        </section>

        <section className="bg-card p-8 rounded-2xl border border-border shadow-sm">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">Experience</h2>
          <div className="border-l-2 border-primary/30 pl-6 space-y-8">
            <div>
              <h3 className="text-xl font-medium text-primary">Frontend Developer</h3>
              <p className="text-foreground/60 text-sm mb-2">Tech Company Inc. • 2022 - Present</p>
              <p className="text-foreground/80">Developed and maintained responsive web applications using React and Next.js. Improved performance and accessibility across all company products.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-primary">Web Development Intern</h3>
              <p className="text-foreground/60 text-sm mb-2">Startup LLC • Summer 2021</p>
              <p className="text-foreground/80">Assisted in building UI components and integrating RESTful APIs for the main customer dashboard.</p>
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
    </div>
  );
}
