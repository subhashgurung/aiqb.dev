import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GlassCard } from "@/components/ui/glass-card";
import { Bot, Workflow, MessageSquare } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    icon: Bot,
    title: "AI Agents",
    description:
      "Autonomous agents that research, draft, schedule, and follow up—so your team stays in flow.",
    image: "/capability-agent.png",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "Connect tools, eliminate handoffs, and enforce consistency across every repeat process.",
    image: "/capability-workflow.png",
  },
  {
    icon: MessageSquare,
    title: "Conversational Interfaces",
    description:
      "Natural language experiences that understand context and act with precision.",
    image: "/capability-interface.png",
  },
];

export function CapabilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=140%",
          pin: true,
          scrub: 0.7,
        },
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(
        labelRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, ease: "none" },
        0
      );

      // Card 1 - from left
      scrollTl.fromTo(
        cardsRef.current[0],
        { x: "-50vw", opacity: 0, rotateY: -18, scale: 0.96 },
        { x: 0, opacity: 1, rotateY: 0, scale: 1, ease: "none" },
        0.02
      );

      // Card 2 - from bottom
      scrollTl.fromTo(
        cardsRef.current[1],
        { y: "60vh", opacity: 0, rotateX: 14, scale: 0.96 },
        { y: 0, opacity: 1, rotateX: 0, scale: 1, ease: "none" },
        0.04
      );

      // Card 3 - from right
      scrollTl.fromTo(
        cardsRef.current[2],
        { x: "50vw", opacity: 0, rotateY: 18, scale: 0.96 },
        { x: 0, opacity: 1, rotateY: 0, scale: 1, ease: "none" },
        0.06
      );

      // Card images
      cardsRef.current.forEach((card, i) => {
        const img = card?.querySelector("img");
        if (img) {
          scrollTl.fromTo(
            img,
            { scale: 1.08, opacity: 0.7 },
            { scale: 1, opacity: 1, ease: "none" },
            0.1 + i * 0.02
          );
        }
      });

      // SETTLE (30% - 70%) - hold

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        cardsRef.current[0],
        { x: 0, opacity: 1 },
        { x: "-18vw", opacity: 0, ease: "power2.in" },
        0.7
      );

      scrollTl.fromTo(
        cardsRef.current[1],
        { y: 0, opacity: 1 },
        { y: "-14vh", opacity: 0, ease: "power2.in" },
        0.72
      );

      scrollTl.fromTo(
        cardsRef.current[2],
        { x: 0, opacity: 1 },
        { x: "18vw", opacity: 0, ease: "power2.in" },
        0.74
      );

      scrollTl.fromTo(
        labelRef.current,
        { opacity: 1 },
        { opacity: 0 },
        0.8
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-pinned relative z-[12] flex flex-col items-center justify-center bg-background"
    >
      {/* Section Label */}
      <p
        ref={labelRef}
        className="absolute top-[10vh] left-1/2 -translate-x-1/2 text-mono text-xs tracking-[0.18em] text-white/60 uppercase"
      >
        What We Build
      </p>

      {/* Cards Grid */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 lg:gap-6 px-4 mt-16">
        {capabilities.map((cap, i) => (
          <GlassCard
            key={cap.title}
            ref={(el) => { cardsRef.current[i] = el; }}
            className="w-[280px] sm:w-[320px] lg:w-[360px] h-[480px] lg:h-[560px] flex flex-col p-6"
            style={{ perspective: "1000px" }}
          >
            {/* Icon */}
            <cap.icon className="w-6 h-6 text-accent mb-4" strokeWidth={1.5} />

            {/* Title */}
            <h3 className="text-2xl text-white font-display mb-3">
              {cap.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-white/60 font-body leading-relaxed mb-6">
              {cap.description}
            </p>

            {/* Image */}
            <div className="flex-1 relative rounded-2xl overflow-hidden mt-auto">
              <img
                src={cap.image}
                alt={cap.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}