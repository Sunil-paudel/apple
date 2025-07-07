import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cpu, HardDrive, Network, ShieldCheck, TerminalSquare } from "lucide-react";

interface SkillsSectionProps {
  id: string;
}

const skillsData = {
  "Operating Systems & Servers": {
    icon: <HardDrive className="w-6 h-6 text-primary" />,
    skills: ["Windows Server (2016, 2019, 2022)", "Linux (Ubuntu, CentOS)", "Windows 10/11", "macOS"]
  },
  "Networking": {
    icon: <Network className="w-6 h-6 text-primary" />,
    skills: ["TCP/IP, DNS, DHCP, VPN", "Router & Switch Configuration", "Network Troubleshooting", "Wireless Networking"]
  },
  "Directory Services & Cloud": {
    icon: <Cpu className="w-6 h-6 text-primary" />,
    skills: ["Active Directory Management", "Microsoft Office 365 Admin", "Azure AD", "Basic AWS/Azure knowledge"]
  },
  "Scripting & Automation": {
    icon: <TerminalSquare className="w-6 h-6 text-primary" />,
    skills: ["PowerShell", "Bash (Basic)", "Python (Basic for scripting)"]
  },
  "Security": {
    icon: <ShieldCheck className="w-6 h-6 text-primary" />,
    skills: ["Endpoint Security", "Firewall Basics", "Security Best Practices", "Vulnerability Assessment (Basic)"]
  },
  "Hardware & Software": {
    icon: <Cpu className="w-6 h-6 text-primary" />, // Re-using icon, can be more specific
    skills: ["Hardware Troubleshooting & Repair", "Software Deployment & Management", "Ticketing Systems (Jira, ServiceNow)", "Remote Desktop Tools"]
  }
};

export default function SkillsSection({ id }: SkillsSectionProps) {
  return (
    <Container id={id} className="bg-secondary/30">
      <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-12 text-center">Technical Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.entries(skillsData).map(([category, data]) => (
          <Card key={category} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center space-x-3 pb-2">
              {data.icon}
              <CardTitle className="text-xl font-semibold font-heading">{category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-sm px-3 py-1">{skill}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
       <div className="mt-12 text-center">
        <h3 className="text-2xl font-bold font-heading mb-4">Soft Skills</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {["Problem Solving", "Communication", "Customer Service", "Teamwork", "Adaptability", "Time Management"].map(skill => (
             <Badge key={skill} variant="outline" className="text-md px-4 py-2 border-primary text-primary">{skill}</Badge>
          ))}
        </div>
      </div>
    </Container>
  );
}
