"use client";

import { useState } from "react";
import Button from "./Button";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage("");

    const form = e.target;
    const formData = new FormData(form);
    
    // Simulate a network request
    setTimeout(() => {
      setSubmitStatus("success");
      form.reset();
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
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
            className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground disabled:opacity-50"
            required
            disabled={isSubmitting}
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
            className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground disabled:opacity-50"
            required
            disabled={isSubmitting}
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
          className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground disabled:opacity-50"
          required
          disabled={isSubmitting}
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
          className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none text-foreground disabled:opacity-50"
          required
          disabled={isSubmitting}
        ></textarea>
      </div>

      {submitStatus === "success" && (
        <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-500 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <p className="text-sm font-medium">Thank you! Your message has been sent successfully. I will get back to you soon.</p>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-sm font-medium">{errorMessage}</p>
        </div>
      )}

      <div className="pt-2">
        <Button 
          type="submit" 
          variant="primary" 
          className="w-full sm:w-auto"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending...
            </span>
          ) : (
            "Send Message"
          )}
        </Button>
      </div>
    </form>
  );
}
