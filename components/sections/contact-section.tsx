import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Github } from "lucide-react";

interface ContactSectionProps {
  id: string;
}

const contactLinks = [
  {
    name: "Email",
    icon: <Mail className="h-5 w-5" />,
    href: "mailto:shikhar.kc.dev@example.com", // Placeholder email
    label: "shikhar.kc.dev@example.com"
  },
  {
    name: "LinkedIn",
    icon: <Linkedin className="h-5 w-5" />,
    href: "https://www.linkedin.com/in/shikharkc-example", // Placeholder LinkedIn
    label: "linkedin.com/in/shikharkc"
  },
  {
    name: "GitHub",
    icon: <Github className="h-5 w-5" />,
    href: "https://github.com/shikharkc", // Placeholder GitHub
    label: "github.com/shikharkc"
  }
];

export default function ContactSection({ id }: ContactSectionProps) {
  return (
    <Container id={id} className="bg-background">
      <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-8 text-center">Get In Touch</h2>
      <p className="text-lg text-foreground/80 mb-12 text-center max-w-2xl mx-auto">
        I&apos;m always open to discussing new opportunities, collaborations, or just connecting with fellow tech enthusiasts. Feel free to reach out!
      </p>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
        {contactLinks.map((link) => (
          <Button key={link.name} asChild variant="outline" size="lg" className="w-full sm:w-auto shadow-sm hover:shadow-md transition-shadow">
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              {link.icon}
              <span className="ml-2">{link.label}</span>
            </a>
          </Button>
        ))}
      </div>
    </Container>
  );
}
