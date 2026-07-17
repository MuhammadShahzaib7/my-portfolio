import Button from "@/components/Button";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-primary)_0%,_transparent_50%)] opacity-20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          <span className="block text-foreground">Hi, I'm a</span>
          <span className="block text-primary mt-2">Full Stack Web Developer</span>
        </h1>
        
        <p className="mt-6 max-w-2xl mx-auto text-xl text-foreground/80 leading-relaxed">
          I build modern, responsive, and scalable web applications using the latest technologies. Passionate about creating seamless user experiences and writing clean, maintainable code.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Button href="/projects" variant="primary">
            View My Work
          </Button>
          <Button href="/contact" variant="secondary">
            Contact Me
          </Button>
        </div>
      </div>
    </div>
  );
}
