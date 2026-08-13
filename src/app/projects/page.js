import ProjectCard from "@/components/ProjectCard";

export const metadata = {
  title: "Projects | My Portfolio",
  description: "A showcase of my recent web development projects.",
};

const projects = [
  {
    id: 1,
    title: "UI Evolution",
    description: "AI code analysis and improvement lab that helps developers refine their user interfaces with advanced recommendations.",
    technologies: ["React", "Next.js", "Tailwind CSS", "AI Integration"],
    image: "/ui_evolution.png",
    githubUrl: "https://github.com/MuhammadShahzaib7/Capstone-Project",
    liveUrl: "https://capstone-project-hifr.vercel.app/"
  },
  {
    id: 2,
    title: "Atlas AI",
    description: "A streaming chat AI interface providing real-time interactions, smooth UI updates, and an intuitive user experience.",
    technologies: ["React", "Next.js", "AI SDK", "Tailwind CSS"],
    image: "/atlas_ai.png",
    githubUrl: "https://github.com/MuhammadShahzaib7/Streaming-AI-Chat-Interface",
    liveUrl: "https://streaming-ai-chat-interface.vercel.app/"
  },
  {
    id: 3,
    title: "Website Analyzer Tool",
    description: "A comprehensive tool to analyze website performance, SEO metrics, and accessibility scores instantly.",
    technologies: ["JavaScript", "React", "Performance APIs"],
    image: "/website_analyzer.png",
    githubUrl: "https://github.com/MuhammadShahzaib7/WebsiteAnalyzerTool",
    liveUrl: "https://website-analyzer-tool-two.vercel.app/"
  },
  {
    id: 4,
    title: "Nexus Quantum",
    description: "A visually stunning modern website showcasing high-quality 3D models with interactive 3D rendering capabilities.",
    technologies: ["React", "Three.js", "Tailwind CSS"],
    image: "/nexus_quantum.png",
    githubUrl: "https://github.com/MuhammadShahzaib7/3D-Model-Web",
    liveUrl: "https://3-d-model-web-rho.vercel.app/"
  }
];

export default function Projects() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-primary mb-4">My Projects</h1>
        <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
          Here are some of the projects I&apos;ve worked on recently. They showcase my skills in frontend and backend development.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </div>
  );
}
