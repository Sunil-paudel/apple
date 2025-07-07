import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface ResumeSectionProps {
  id: string;
}

export default function ResumeSection({ id }: ResumeSectionProps) {
  return (
    <Container id={id} className="bg-secondary/30 text-center">
      <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-8">My Resume</h2>
      <p className="text-lg text-foreground/80 mb-10 max-w-2xl mx-auto">
        Interested in learning more about my qualifications and experience? Download my latest resume for a comprehensive overview.
      </p>
      <Button asChild size="lg" className="shadow-lg hover:shadow-primary/50 transition-shadow">
        <a href="/Shikhar_KC_Resume.pdf" download="Shikhar_KC_Resume.pdf">
          <Download className="mr-2 h-5 w-5" />
          Download Resume (PDF)
        </a>
      </Button>
    </Container>
  );
}
