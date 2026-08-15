import Button from "@/components/Button";
import dynamic from "next/dynamic";

const ShaderHero = dynamic(() => import("@/components/ShaderHero/ShaderHero"));

export default function Home() {
  return (
    <ShaderHero>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          <span className="block text-foreground drop-shadow-md">Hi, I&apos;m a</span>
          <span className="block text-primary mt-2 drop-shadow-md">Full Stack Web Developer</span>
        </h1>
        
        <p className="mt-6 max-w-2xl mx-auto text-xl text-foreground/90 leading-relaxed drop-shadow">
          Building thoughtful digital experiences with modern web technologies.
          Passionate about creating seamless user experiences and writing clean, maintainable code.
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
    </ShaderHero>
  );
}
