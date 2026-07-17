export default function Footer() {
  return (
    <footer className="bg-secondary/30 border-t border-border mt-12 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-foreground/70">
        <p>&copy; {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
        <p className="mt-2">Built with Next.js and Tailwind CSS.</p>
      </div>
    </footer>
  );
}
