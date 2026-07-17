import ProjectCard from "@/components/ProjectCard";

export const metadata = {
  title: "Projects | My Portfolio",
  description: "A showcase of my recent web development projects.",
};

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform with cart management, user authentication, and payment processing integration.",
    technologies: ["Next.js", "Tailwind CSS", "Stripe", "MongoDB"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and drag-and-drop functionality.",
    technologies: ["React", "Node.js", "Socket.io", "Express"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com"
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "A beautiful weather dashboard providing real-time forecasts, historical data, and interactive maps.",
    technologies: ["JavaScript", "HTML", "CSS", "OpenWeather API"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com"
  },
  {
    id: 4,
    title: "Personal Blog",
    description: "A static blog generated with markdown content, featuring dark mode and SEO optimization.",
    technologies: ["Next.js", "Tailwind CSS", "MDX"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com"
  },
  {
    id: 5,
    title: "Fitness Tracker",
    description: "A mobile-responsive web app to track workouts, monitor progress, and visualize data with charts.",
    technologies: ["React", "Chart.js", "Firebase"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com"
  },
  {
    id: 6,
    title: "Recipe Finder",
    description: "An application to discover recipes based on available ingredients, complete with dietary filters.",
    technologies: ["Vue.js", "Tailwind CSS", "Spoonacular API"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com"
  }
];

export default function Projects() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-primary mb-4">My Projects</h1>
        <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
          Here are some of the projects I've worked on recently. They showcase my skills in frontend and backend development.
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
