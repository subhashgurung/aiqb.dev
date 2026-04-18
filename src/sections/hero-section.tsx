import { useEffect, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GlassButton } from "@/components/ui/glass-button";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLParagraphElement>(null);

  // Load animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          headlineRef.current?.querySelectorAll(".word") || [],
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
          "-=0.3"
        )
        .fromTo(
          subheadlineRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 14, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5 },
          "-=0.3"
        )
        .fromTo(
          scrollHintRef.current,
          { opacity: 0 },
          { opacity: 0.18, duration: 0.5 },
          "-=0.2"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
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
          onLeaveBack: () => {
            // Reset elements when scrolling back to top
            gsap.set([labelRef.current, headlineRef.current, subheadlineRef.current, ctaRef.current], {
              opacity: 1,
              y: 0,
              clearProps: "transform"
            });
            gsap.set(videoRef.current, { scale: 1, opacity: 1 });
          }
        },
      });

      // EXIT phase (70% - 100%)
      scrollTl.fromTo(
        headlineRef.current,
        { y: 0, opacity: 1 },
        { y: "-22vh", opacity: 0, ease: "power2.in" },
        0.7
      );

      scrollTl.fromTo(
        [subheadlineRef.current, ctaRef.current],
        { y: 0, opacity: 1 },
        { y: "-14vh", opacity: 0, ease: "power2.in" },
        0.72
      );

      scrollTl.fromTo(
        labelRef.current,
        { opacity: 1 },
        { opacity: 0 },
        0.75
      );

      scrollTl.fromTo(
        videoRef.current,
        { scale: 1, opacity: 1 },
        { scale: 1.06, opacity: 0.85 },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // Split headline into words
  const headlineText = "I build custom SaaS and powerful automations.";
  const words = headlineText.split(" ");

  return (
    <section
      ref={sectionRef}
      id="home"
      className="section-pinned relative z-10 flex items-center justify-center"
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        poster="/hero-bg.jpg"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 to-background/80 z-[1]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-32 pb-40 max-w-5xl mx-auto">
        {/* Micro Label */}
        <p
          ref={labelRef}
          className="text-mono text-xs tracking-[0.18em] text-white/60 uppercase mb-8"
        >
          By Gurun // NYC 🗽 • KTM 🏔️
        </p>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="text-5xl sm:text-7xl md:text-8xl leading-display tracking-tighter text-white font-display font-normal max-w-4xl"
        >
          {words.map((word, i) => (
            <span key={i} className="word inline-block mr-[0.25em]">
              {word}
            </span>
          ))}
        </h1>

        {/* Subheadline */}
        <p
          ref={subheadlineRef}
          className="text-white/70 text-base sm:text-lg max-w-2xl mt-8 leading-relaxed font-body"
        >
          I help businesses in the US and Nepal turn complexity
          into calm. No agency bloat—just one expert developer.
        </p>

        {/* CTA */}
        <div ref={ctaRef} className="mt-12">
          <GlassButton variant="large">Book a discovery call</GlassButton>
        </div>
      </div>

      {/* Scroll Hint */}
      <p
        ref={scrollHintRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-mono text-xs text-white/20 uppercase tracking-widest z-10"
      >
        Scroll
      </p>
    </section>
  );
}