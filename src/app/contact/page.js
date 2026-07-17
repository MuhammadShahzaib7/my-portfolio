import Button from "@/components/Button";

export const metadata = {
  title: "Contact Me | My Portfolio",
  description: "Get in touch with me for opportunities or collaborations.",
};

export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">Contact Me</h1>
        <p className="text-xl text-foreground/70">
          Have a question or want to work together? Leave a message below.
        </p>
      </div>

      <div className="bg-card p-8 rounded-2xl border border-border shadow-sm">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground/90 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground/90 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="john@example.com"
                className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-foreground/90 mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="How can I help you?"
              className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-foreground/90 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              placeholder="Your message here..."
              className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none text-foreground"
              required
            ></textarea>
          </div>

          <div className="pt-2">
            <Button type="button" variant="primary" className="w-full sm:w-auto">
              Send Message
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
