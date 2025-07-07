
"use client";

import type { ReactNode } from 'react';
import { Container } from "@/components/ui/container";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const experienceData = [
    {
        title: "IT Support Intern",
        company: "Tech Solutions Inc.",
        date: "Jan 2023 - Present",
        responsibilities: [
            "Provided Level 1 and Level 2 technical support to end-users for hardware, software, and network issues.",
            "Managed user accounts and permissions in Active Directory and Office 365.",
            "Assisted in the deployment and configuration of new workstations and software applications.",
            "Documented technical issues and resolutions in the ticketing system."
        ],
        achievements: [
            "Consistently resolved over 95% of assigned tickets within SLA.",
            "Developed PowerShell scripts to automate routine tasks such as user onboarding and system health checks, reducing manual effort by 20%.",
            "Received positive feedback for excellent customer service and problem-solving skills."
        ]
    },
    {
        title: "Junior System Administrator",
        company: "Innovatech Ltd.",
        date: "May 2021 - Dec 2022",
        responsibilities: [
            "Maintained and upgraded server infrastructure.",
            "Implemented backup and disaster recovery solutions.",
            "Monitored network performance and security."
        ],
        achievements: [
            "Successfully migrated 50+ users to a new email system with minimal downtime.",
            "Reduced system vulnerabilities by 15% through proactive patching and configuration management."
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
                  "md:scale-110 md:z-10": index === 0 && filteredExperience.length > 1,
                  "md:scale-90 md:opacity-75 md:rotate-y-[-10deg] md:hover:opacity-100 md:hover:scale-95 md:hover:rotate-y-0": index === 1 && filteredExperience.length > 1,
                  "md:scale-100": filteredExperience.length === 1,
                }
              )}
            >
              <Card className="w-full h-full shadow-xl hover:shadow-2xl transition-all duration-300 bg-card text-card-foreground rounded-lg border border-border/70 flex flex-col">
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
                      {exp.responsibilities.map((res, i) => <li key={i}>{res}</li>)}
                    </ul>
                  </div>
                  {exp.achievements && exp.achievements.length > 0 && (
                    <div className="mt-3">
                      <h4 className="font-medium text-foreground/90 text-sm mb-1.5">Achievements:</h4>
                      <ul className="list-disc list-outside ml-4 text-sm text-foreground/80 space-y-1">
                        {exp.achievements.map((ach, i) => <li key={i}>{ach}</li>)}
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
