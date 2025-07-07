import { Container } from "@/components/ui/container";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Award } from "lucide-react";

interface EducationSectionProps {
  id: string;
}

const educationData = [
  {
    title: "Google IT Support Professional Certificate",
    institution: "Coursera (Google)",
    date: "2023",
    description: "Completed a comprehensive program covering troubleshooting, customer service, networking, operating systems, system administration, and security."
  },
  {
    title: "Bachelor of Science in Information Technology",
    institution: "Tribhuvan University (Example College)",
    date: "2018 - 2022",
    description: "Focused on core IT principles, software development, database management, and networking fundamentals."
  },
  // Add more education or certifications here
];

export default function EducationSection({ id }: EducationSectionProps) {
  return (
    <Container id={id} className="bg-secondary/30">
      <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-12 text-center">Education & Certifications</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {educationData.map((edu, index) => (
          <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <CardTitle className="text-xl font-semibold font-heading">{edu.title}</CardTitle>
                <Award className="w-8 h-8 text-primary" />
              </div>
              <CardDescription className="text-sm">
                {edu.institution} | {edu.date}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80">{edu.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  );
}
