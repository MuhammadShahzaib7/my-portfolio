export default function SkillCard({ category, skills }) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
      <h3 className="text-xl font-bold mb-6 text-primary flex items-center gap-2">
        {category}
      </h3>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <span 
            key={skill} 
            className="px-4 py-2 rounded-lg bg-secondary text-sm font-medium border border-border/50 hover:border-primary/50 hover:text-primary transition-colors cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
