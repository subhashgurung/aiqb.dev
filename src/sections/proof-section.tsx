import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GlassCard } from "@/components/ui/glass-card";

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { value: "80%", label: "Average time saved on repeat workflows" },
  { value: "3x", label: "Faster execution across ops, support, and content" },
  { value: "24h", label: "Typical first prototype delivery" },
];

export function ProofSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

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
        metricsRef.current,
        { x: "-40vw", opacity: 0 },
        { x: 0, opacity: 1, ease: "none" },
        0
      );

      // Metric values count-up effect (scrubbed)
      const metricValues = metricsRef.current?.querySelectorAll(".metric-value");
      metricValues?.forEach((el, i) => {
        scrollTl.fromTo(
          el,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, ease: "none" },
          0.05 + i * 0.03
        );
      });

      scrollTl.fromTo(
        cardRef.current,
        { x: "55vw", opacity: 0, rotateY: 12 },
        { x: 0, opacity: 1, rotateY: 0, ease: "none" },
        0.05
      );

      scrollTl.fromTo(
        quoteRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, ease: "none" },
        0.15
      );

      scrollTl.fromTo(
        avatarRef.current,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, ease: "none" },
        0.2
      );

      // SETTLE (30% - 70%) - hold

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        metricsRef.current,
        { x: 0, opacity: 1 },
        { x: "-10vw", opacity: 0, ease: "power2.in" },
        0.7
      );

      scrollTl.fromTo(
        cardRef.current,
        { x: 0, opacity: 1 },
        { x: "10vw", opacity: 0, ease: "power2.in" },
        0.72
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned relative z-[13] flex items-center justify-center bg-background-secondary"
    >
      <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-6xl px-8 lg:px-16 gap-12 lg:gap-20">
        {/* Metrics Column */}
        <div ref={metricsRef} className="flex flex-col gap-10 lg:w-[380px]">
          {metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col">
              <span className="metric-value text-5xl lg:text-6xl text-accent font-display mb-2">
                {metric.value}
              </span>
              <span className="text-sm text-white/60 font-body leading-relaxed">
                {metric.label}
              </span>
            </div>
          ))}
        </div>

        {/* Testimonial Card */}
        <GlassCard
          ref={cardRef}
          className="w-full max-w-[520px] h-[420px] lg:h-[480px] flex flex-col justify-end p-8 relative"
        >
          {/* Quote */}
          <p
            ref={quoteRef}
            className="text-xl lg:text-2xl text-white font-display leading-snug mb-8"
          >
            "AIQB turned our messiest process into a calm, repeatable system."
          </p>

          {/* Attribution */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-body font-medium">Jordan Lee</p>
              <p className="text-white/60 text-sm font-body">COO</p>
            </div>

            {/* Avatar */}
            <div
              ref={avatarRef}
              className="w-14 h-14 rounded-full overflow-hidden border border-white/20"
            >
              <img
                src="/testimonial-avatar.jpg"
                alt="Jordan Lee"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}