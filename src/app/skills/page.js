import SkillCard from "@/components/SkillCard";

export const metadata = {
  title: "Skills | My Portfolio",
  description: "Technical skills and technologies I work with.",
};

const skillCategories = [
  {
    category: "Frontend",
    skills: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"]
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express.js", "PHP", "Laravel"]
  },
  {
    category: "Database",
    skills: ["MongoDB", "MySQL"]
  },
  {
    category: "Tools",
    skills: ["Git", "GitHub", "VS Code", "Vercel"]
  }
];

export default function Skills() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-primary mb-4">Technical Skills</h1>
        <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
          Technologies and tools I use to bring ideas to life.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {skillCategories.map((categoryData) => (
          <SkillCard 
            key={categoryData.category} 
            category={categoryData.category} 
            skills={categoryData.skills} 
          />
        ))}
      </div>
    </div>
  );
}
