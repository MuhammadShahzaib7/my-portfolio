"use client";

import Button from "./Button";

export default function ContactForm() {
  return (
    <form 
      className="space-y-6" 
      action="mailto:hello@example.com" 
      method="POST" 
      encType="text/plain"
    >
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
        <Button type="submit" variant="primary" className="w-full sm:w-auto">
          Send Message
        </Button>
      </div>
    </form>
  );
}
