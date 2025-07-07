
"use client";

import type { ReactNode } from 'react';
import { Container } from "@/components/ui/container";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const experienceData = [
    {
        title: "IT Support Internship Mentor",
        company: "GraduatePLUS Pty Ltd.",
        date: "Dec 2024 - Present",
        responsibilities: [
            "Guided and supervised interns on real-world IT support tasks, including troubleshooting and ticket handling.",
            "Designed structured learning modules on networking, system administration, and customer support best practices.",
            "Conducted weekly check-ins and performance reviews to support professional growth.",
            "Provided hands-on training in tools such as Windows Server, Active Directory, and virtualization platforms.",
            "Encouraged documentation habits by mentoring interns in writing KB articles and solution guides."
        ],
        achievements: [
            "Mentored 5+ interns who successfully transitioned into full-time technical roles within 3 months of completion.",
            "Built a reusable intern onboarding guide and knowledge base, reducing ramp-up time by 50%.",
            "Created a mock ticketing lab environment to simulate real-world IT support scenarios.",
            "Recognized by peers for fostering a collaborative and growth-focused learning environment."
        ]
    },
    {
        title: "IT Support Officer",
        company: "Digipearl Pty Ltd.",
        date: "Jan 2023 - Dec 2024",
        responsibilities: [
            "Provided Level 1 and Level 2 technical support for hardware, software, and network-related issues.",
            "Diagnosed and resolved issues related to desktops, laptops, printers, and mobile devices.",
            "Managed user accounts, permissions, and access controls using Active Directory and Office 365.",
            "Handled incident and request tickets through ITSM platforms such as ServiceNow or Zendesk.",
            "Supported onboarding/offboarding processes by preparing user accounts and hardware setups.",
            "Ensured compliance with internal security policies and performed regular system audits."
        ],
        achievements: [
            "Successfully migrated 50+ users to a new email system with minimal downtime.",
            "Reduced average ticket resolution time by 30% through process optimization and documentation.",
            "Successfully migrated 100+ user accounts to a new domain with minimal disruption to operations.",
            "Trained non-technical staff to troubleshoot basic issues, improving IT self-service usage."
        ]
    },
];

interface ExperienceSectionProps {
  id: string;
}

export function ExperienceSection({ id }: ExperienceSectionProps) {
  const filteredExperience = experienceData.slice(0, 2);

  return (
    <Container id={id} className="bg-background">
      <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-16 sm:mb-20 text-center">Work Experience</h2>
      {filteredExperience.length > 0 ? (
        <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch gap-8 md:gap-6 lg:gap-8 w-full [perspective:1200px] min-h-[450px] md:min-h-[500px]">
          {filteredExperience.map((exp, index) => (
            <div
            key={exp.company + exp.title}
            className={cn(
              "w-full sm:w-4/5 md:w-[45%] lg:w-[38%] transition-all duration-700 ease-out transform-gpu",
              {
                // Keep your original layout classes if needed, or simplify
                "md:z-10": index === 0 && filteredExperience.length > 1, // Example: keep z-index if you need it
              }
            )}
          >
            <Card className="w-full h-full shadow-xl transition-all duration-500 ease-in-out bg-card text-card-foreground rounded-lg border border-border/70 flex flex-col transform perspective-[1200px] rotateY(10deg) hover:rotateY(0deg) hover:scale-105">
                <CardHeader className="pb-3 text-center">
                  <CardTitle className="text-xl font-semibold font-heading leading-tight">{exp.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground mt-1">
                    {exp.company} | {exp.date}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2 space-y-3 text-left flex-grow flex flex-col">
                  <div>
                    <h4 className="font-medium text-foreground/90 text-sm mb-1.5">Responsibilities:</h4>
                    <ul className="list-disc list-outside ml-4 text-sm text-foreground/80 space-y-1">
                      {exp.responsibilities.map((res, i) => <li key={i} className="text-justify">{res}</li>)}
                    </ul>
                  </div>
                  {exp.achievements && exp.achievements.length > 0 && (
                    <div className="mt-3">
                      <h4 className="font-medium text-foreground/90 text-sm mb-1.5">Achievements:</h4>
                      <ul className="list-disc list-outside ml-4 text-sm text-foreground/80 space-y-1">
                        {exp.achievements.map((ach, i) => <li key={i} className="text-justify">{ach}</li>)}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-muted-foreground">No work experience to display yet.</p>
      )}
    </Container>
  );
}
