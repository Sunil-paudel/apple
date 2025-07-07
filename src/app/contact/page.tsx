
import { Container } from "@/components/ui/container";
import { ContactForm } from "@/components/contact-form";

export default function ContactPage() {
  return (
    <Container>
      <div className="text-center mb-12 pt-16">
        <h1 className="text-4xl sm:text-5xl font-bold font-heading mb-4">English Test Preparation</h1>
        <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
          Explore our class schedule and book your spot today.
        </p>
      </div>
      <ContactForm />
    </Container>
  );
}
