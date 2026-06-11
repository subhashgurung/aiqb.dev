import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SensorTicker } from "@/components/sensor-ticker";

gsap.registerPlugin(ScrollTrigger);

const footerLinks = [
  { label: "Farm", href: "#farm" },
  { label: "Shop", href: "#shop" },
  { label: "Tech", href: "#tech" },
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
      className="relative z-[17] bg-background-secondary py-16 lg:py-24"
    >
      <div
        ref={contentRef}
        className="max-w-4xl mx-auto px-6 flex flex-col items-center text-center"
      >
        {/* Logo */}
        <a
          href="#home"
          className="text-4xl tracking-tight text-white font-display mb-2"
        >
          AI<span className="text-accent"> KHETI</span>
        </a>

        <p className="text-mono text-[10px] tracking-[0.3em] text-white/40 uppercase mb-6">
          by AIQB.dev
        </p>

        {/* Tagline */}
        <p className="text-lg text-white/60 font-display mb-8">
          Soil, sunrise, and sensors.
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

        {/* Live ticker */}
        <div className="mb-10">
          <SensorTicker />
        </div>

        {/* Divider */}
        <div className="w-16 h-px bg-white/10 mb-8" />

        {/* Legal */}
        <p className="text-xs text-white/30 font-body">
          © 2026 AI Kheti · Pharping, Nepal · All rights reserved.
        </p>
      </div>
    </footer>
  );
}
