export default function ProjectCard({ title, description, image, technologies, githubUrl, liveUrl }) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group">
      <div className="relative h-48 w-full bg-secondary/50 overflow-hidden">
        {/* Placeholder image representation if no actual image provided */}
        <div className="absolute inset-0 flex items-center justify-center text-secondary-foreground/20 group-hover:scale-105 transition-transform duration-500">
          <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-primary">{title}</h3>
        <p className="text-foreground/80 mb-4 text-sm line-clamp-3">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {technologies.map((tech) => (
            <span key={tech} className="px-2.5 py-1 text-xs rounded-full bg-secondary text-secondary-foreground border border-border/50">
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex gap-3">
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center py-2 text-sm rounded-lg bg-secondary hover:bg-secondary/80 border border-border transition-colors">
              GitHub
            </a>
          )}
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
