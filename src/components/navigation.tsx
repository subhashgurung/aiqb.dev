import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { GlassButton } from "./ui/glass-button";

const navLinks = [
  { label: "Home", href: "#home", active: true },
  { label: "Studio", href: "#studio" },
  { label: "About", href: "#about" },
  { label: "Journal", href: "#journal" },
  { label: "Reach Us", href: "#contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border/50" : "bg-transparent"
      )}
    >
      <div className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        {/* Logo */}
        <a
          href="#home"
          className="text-3xl tracking-tight text-white font-display"
        >
          AIQB<span className="text-accent">.DEV</span>
        </a>

        {/* Nav Links - Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={cn(
                "text-sm font-body transition-colors duration-300",
                link.active
                  ? "text-white"
                  : "text-white/60 hover:text-white"
              )}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <GlassButton variant="default">Let's Talk</GlassButton>
      </div>
    </nav>
  );
}