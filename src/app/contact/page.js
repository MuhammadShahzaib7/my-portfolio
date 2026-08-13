import ContactForm from "@/components/ContactForm";

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
        <ContactForm />
      </div>
    </div>
  );
}
