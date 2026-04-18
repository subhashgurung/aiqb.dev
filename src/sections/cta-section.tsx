import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GlassButton } from "@/components/ui/glass-button";
import { GlassCard } from "@/components/ui/glass-card";

gsap.registerPlugin(ScrollTrigger);

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=130%",
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(
        imageRef.current,
        { scale: 1.1, opacity: 0.7 },
        { scale: 1, opacity: 1, ease: "none" },
        0
      );

      scrollTl.fromTo(
        cardRef.current,
        { x: "60vw", opacity: 0, rotateY: 10 },
        { x: 0, opacity: 1, rotateY: 0, ease: "none" },
        0.05
      );

      scrollTl.fromTo(
        headingRef.current,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, ease: "none" },
        0.15
      );

      scrollTl.fromTo(
        bodyRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, ease: "none" },
        0.2
      );

      scrollTl.fromTo(
        btnRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, ease: "none" },
        0.25
      );

      // SETTLE (30% - 70%) - hold

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        cardRef.current,
        { y: 0, opacity: 1 },
        { y: "-10vh", opacity: 0, ease: "power2.in" },
        0.7
      );

      scrollTl.fromTo(
        imageRef.current,
        { scale: 1, opacity: 1 },
        { scale: 1.04, opacity: 0.75, ease: "power2.in" },
        0.72
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned relative z-[14] flex items-end justify-end bg-background"
    >
      {/* Full-bleed Background Image */}
      <img
        ref={imageRef}
        src="/cta-background.png"
        alt="Futuristic workspace"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-background/55" />

      {/* CTA Card */}
      <GlassCard
        ref={cardRef}
        className="relative z-10 w-[90%] sm:w-[70%] lg:w-[44vw] min-w-[320px] max-w-[560px] m-6 lg:m-0 lg:mr-[6vw] lg:mb-[10vh] p-7"
      >
        <h2
          ref={headingRef}
          className="text-2xl sm:text-3xl lg:text-4xl text-white font-display leading-tight mb-4"
        >
          See what's possible in one week.
        </h2>

        <p
          ref={bodyRef}
          className="text-sm lg:text-base text-white/70 font-body leading-relaxed mb-6"
        >
          We'll map your highest-friction workflow and ship a working
          prototype—fast.
        </p>

        <div ref={btnRef} className="flex flex-col gap-3">
          <GlassButton variant="default">
            Request a prototype plan
          </GlassButton>
          <a
            href="mailto:hello@aiqb.dev"
            className="text-xs text-white/50 font-body hover:text-white/80 transition-colors"
          >
            Or email hello@aiqb.dev
          </a>
        </div>
      </GlassCard>
    </section>
  );
}