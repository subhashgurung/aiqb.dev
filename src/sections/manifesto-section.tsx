import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const accentLineRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

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
        accentLineRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, ease: "none" },
        0
      );

      scrollTl.fromTo(
        headlineRef.current?.querySelectorAll(".line") || [],
        { opacity: 0, y: 40, rotateX: 18 },
        { opacity: 1, y: 0, rotateX: 0, stagger: 0.03, ease: "none" },
        0.05
      );

      // SETTLE (30% - 70%) - hold

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        headlineRef.current,
        { y: 0, opacity: 1 },
        { y: "-18vh", opacity: 0, ease: "power2.in" },
        0.7
      );

      scrollTl.fromTo(
        accentLineRef.current,
        { opacity: 1 },
        { opacity: 0 },
        0.75
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const manifestoText =
    "You don't need a massive agency. Engineered in New York, rooted in Nepal—I bridge two worlds to deliver world-class automations.";

  return (
    <section
      ref={sectionRef}
      id="studio"
      className="section-pinned relative z-[11] flex items-center justify-center bg-background"
    >
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.6)_100%)]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">
        {/* Accent Line */}
        <div
          ref={accentLineRef}
          className="w-[72px] h-[2px] bg-accent mb-12 origin-center"
          style={{ transform: "scaleX(0)" }}
        />

        {/* Headline */}
        <h2
          ref={headlineRef}
          className="text-3xl sm:text-5xl md:text-6xl leading-display tracking-tight text-white font-display font-normal"
        >
          {manifestoText.split(" ").map((word, i) => (
            <span key={i} className="line inline-block mr-[0.25em]">
              {word}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}