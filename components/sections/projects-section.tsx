import { Container } from "@/components/ui/container";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import Image from "next/image";

interface ProjectsSectionProps {
  id: string;
}

const projectData = [
  {
    title: "Home Lab Environment Setup",
    description: "Designed and deployed a virtualized home lab using Proxmox VE for testing various operating systems, network configurations, and enterprise software. Includes domain controller, file server, and monitoring tools.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "server rack network",
    githubLink: "https://github.com/shikharkc/homelab-setup", // Placeholder
    liveLink: null,
    tags: ["Virtualization", "Proxmox", "Windows Server", "Networking", "Active Directory"]
  },
  {
    title: "PowerShell Automation Suite",
    description: "Developed a collection of PowerShell scripts to automate common IT tasks such as user account management (creation, modification, disabling), system health checks, and log collection. Improved efficiency and consistency of operations.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "code terminal powershell",
    githubLink: "https://github.com/shikharkc/powershell-automation", // Placeholder
    liveLink: null,
    tags: ["PowerShell", "Automation", "Scripting", "Windows Administration"]
  },
  {
    title: "Network Monitoring Dashboard",
    description: "Set up a network monitoring solution using Zabbix/Grafana to track performance of critical devices and services in the home lab. Configured alerts for proactive issue detection.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "dashboard chart data",
    githubLink: null,
    liveLink: null, // Could link to a blog post or screenshot
    tags: ["Networking", "Monitoring", "Zabbix", "Grafana", "Data Visualization"]
  }
];

export default function ProjectsSection({ id }: ProjectsSectionProps) {
  return (
    <Container id={id} className="bg-background">
      <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-12 text-center">Projects</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectData.map((project, index) => (
          <Card key={index} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <div className="aspect-[3/2] overflow-hidden">
              <Image
                src={project.imageUrl}
                alt={project.title}
                width={600}
                height={400}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                data-ai-hint={project.imageHint}
              />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold font-heading">{project.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="text-foreground/80 mb-3">{project.description}</CardDescription>
               <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{tag}</span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="mt-auto">
              {project.githubLink && (
                <Button variant="outline" size="sm" asChild>
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> GitHub
                  </a>
                </Button>
              )}
              {project.liveLink && (
                 <Button variant="outline" size="sm" asChild className="ml-2">
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                  </a>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </Container>
  );
}
