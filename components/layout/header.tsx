
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

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

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <nav className={cn("flex items-center gap-4", mobile ? "flex-col items-start space-y-2" : "hidden md:flex")}>
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          onClick={() => mobile && setIsMobileMenuOpen(false)}
          className={cn(
            "px-3 py-2 rounded-md text-sm font-medium transition-colors",
            activeSection === item.href.substring(1)
              ? "text-primary bg-primary/10"
              : "text-foreground/70 hover:text-primary",
            mobile && "w-full text-lg"
          )}
        >
          {item.label}
        </Link>
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
 <Link
 href="#hero"
 className={cn(
 "text-2xl font-bold font-heading transition-colors",
 activeSection === "hero" || !activeSection ? "text-primary" : "text-foreground hover:text-primary"
 )}
 onClick={() => setIsMobileMenuOpen(false)}
 >
 Shikhar KC
 </Link>
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
 <Button variant="ghost" size="icon">\
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

