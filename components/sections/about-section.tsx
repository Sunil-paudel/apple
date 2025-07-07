import { Container } from "@/components/ui/container";
import Image from "next/image";

interface AboutSectionProps {
  id: string;
}

export default function AboutSection({ id }: AboutSectionProps) {
  return (
    <Container id={id} className="bg-background">
      <div className="grid md:grid-cols-3 gap-12 items-center">
        <div className="md:col-span-1">
          <div className="aspect-square rounded-lg overflow-hidden shadow-xl mx-auto max-w-xs md:max-w-none">
            <Image
              src="https://placehold.co/400x400.png"
              alt="Shikhar KC"
              width={400}
              height={400}
              className="object-cover w-full h-full"
              data-ai-hint="professional portrait"
            />
          </div>
        </div>
        <div className="md:col-span-2">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-6">About Me</h2>
          <p className="text-lg text-foreground/80 leading-relaxed mb-4">
            Hello! I&apos;m Shikhar KC, a dedicated and Google IT Support Certified professional with a strong passion for technology and problem-solving. My journey in IT started with a curiosity for how systems work and has grown into a deep interest in system administration and IT infrastructure.
          </p>
          <p className="text-lg text-foreground/80 leading-relaxed mb-4">
            I thrive in dynamic environments where I can leverage my technical skills to support users and optimize systems. I am particularly interested in cloud technologies, network security, and automation.
          </p>
          <p className="text-lg text-foreground/80 leading-relaxed">
            My career goal is to continuously expand my knowledge and expertise, contribute to innovative IT solutions, and grow into a role where I can make a significant impact on an organization&apos;s technological landscape. I am always eager to learn new skills and take on challenging projects.
          </p>
        </div>
      </div>
    </Container>
  );
}
