
"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const sectionIds = navItems.map(item => item.href.substring(1));
// Also include "hero" for accurate active section highlighting when at the top.
const allSectionIdsForObserver = ["hero", ...sectionIds];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection(allSectionIdsForObserver);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: href, offsetY: 80 }, // Offset for the fixed header
      ease: "power2.inOut",
    });
  };

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <nav className={cn("flex items-center gap-4", mobile ? "flex-col items-start space-y-2" : "hidden md:flex")}>
      {navItems.map((item) => (
        <a
          key={item.label}
          href={item.href}
          onClick={(e) => {
            handleNavClick(e, item.href);
            if (mobile) setIsMobileMenuOpen(false);
          }}
          className={cn(
            "cursor-pointer px-3 py-2 rounded-md text-sm font-medium transition-colors",
            activeSection === item.href.substring(1)
              ? "text-primary bg-primary/10"
              : "text-foreground/70 hover:text-primary",
            mobile && "w-full text-lg"
          )}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );

  return (
 <header
 className={cn(
 "relative z-50", // Ensure header is positioned for absolute children and has a high z-index
 "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
 isScrolled ? "bg-background/95 shadow-md backdrop-blur-sm" : "bg-transparent"
 )}
 >
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="flex h-16 items-center justify-between">
 <a
    href="#hero"
    className={cn(
        "cursor-pointer text-4xl italic font-extrabold font-heading transition-transform duration-300 ease-in-out hover:scale-105",
        "bg-gradient-to-r from-primary via-blue-500 to-purple-600 dark:from-primary dark:via-cyan-400 dark:to-violet-500",
        "text-transparent bg-clip-text"
    )}
    onClick={(e) => {
        handleNavClick(e, "#hero");
        setIsMobileMenuOpen(false);
    }}
 >
 SKC
 </a>
 <div className="hidden md:flex items-center space-x-4">
 <NavLinks />
 <ThemeToggle />
          </div>
 <div className="md:hidden flex items-center">
 <ThemeToggle />
 <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
 <SheetTrigger asChild>
 <Button variant="ghost" size="icon" className="ml-2">
 <Menu className="h-6 w-6" />
 <span className="sr-only">Open menu</span>
                  </Button>
 </SheetTrigger>
 <SheetContent side="right" className="w-[280px] p-6">
 <div className="flex justify-between items-center mb-6">
 <h2 className="text-xl font-bold font-heading">Menu</h2>
 <SheetClose asChild>
 <Button variant="ghost" size="icon">
 <X className="h-6 w-6" />
 <span className="sr-only">Close menu</span>
                      </Button>
                    </SheetClose>
                  </div>
 <NavLinks mobile />
                </SheetContent>
 </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
