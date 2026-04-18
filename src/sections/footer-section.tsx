import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const footerLinks = [
  { label: "Services", href: "#about" },
  { label: "Process", href: "#studio" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function FooterSection() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footer,
            start: "top 90%",
            end: "top 60%",
            scrub: 0.4,
          },
        }
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative z-[16] bg-background-secondary py-16 lg:py-24"
    >
      <div
        ref={contentRef}
        className="max-w-4xl mx-auto px-6 flex flex-col items-center text-center"
      >
        {/* Logo */}
        <a
          href="#home"
          className="text-4xl tracking-tight text-white font-display mb-4"
        >
          AIQB<sup className="text-xs">®</sup>
        </a>

        {/* Tagline */}
        <p className="text-lg text-white/60 font-display mb-8">
          Automate what slows you down.
        </p>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-white/50 font-body hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="w-16 h-px bg-white/10 mb-8" />

        {/* Legal */}
        <p className="text-xs text-white/30 font-body">
          © 2026 AIQB. All rights reserved.
        </p>
      </div>
    </footer>
  );
}