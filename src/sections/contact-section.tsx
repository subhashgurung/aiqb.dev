import { useRef, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";
import { Mail, MapPin, Clock } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    business: "",
    interest: "",
    message: "",
  });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftColRef.current,
        { opacity: 0, x: "-6vw" },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 35%",
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        formCardRef.current,
        { opacity: 0, x: "6vw", y: 40, rotateX: 8 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "top 30%",
            scrub: 0.5,
          },
        }
      );

      const fields = formCardRef.current?.querySelectorAll(".form-field");
      fields?.forEach((field, i) => {
        gsap.fromTo(
          field,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: `top ${70 - i * 5}%`,
              end: `top ${40 - i * 5}%`,
              scrub: 0.4,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire to backend / form service
    alert("Dhanyabad! We'll reply within one business day.");
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative z-[16] bg-background py-20 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left Column */}
          <div ref={leftColRef} className="lg:w-[45%] lg:pr-8">
            <h2 className="text-4xl lg:text-5xl text-white font-display leading-tight mb-6">
              Let's grow something together.
            </h2>

            <p className="text-base text-white/70 font-body leading-relaxed mb-10">
              Restaurant looking for a steady microgreens supply? Farmer
              curious about sensors? Tell us what you need — we reply within
              one business day.
            </p>

            {/* Contact Details */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-accent" strokeWidth={1.5} />
                <span className="text-white font-body">hello@aiqb.dev</span>
              </div>

              <div className="flex items-center gap-4">
                <MapPin className="w-5 h-5 text-accent" strokeWidth={1.5} />
                <span className="text-white/70 font-body">
                  Pharping, Kathmandu Valley · Nepal
                </span>
              </div>

              <div className="flex items-center gap-4">
                <Clock className="w-5 h-5 text-accent" strokeWidth={1.5} />
                <span className="text-white/70 font-body">
                  Usually under 24 hours
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:w-[55%] lg:pl-8" style={{ perspective: "1000px" }}>
            <GlassCard ref={formCardRef} className="p-6 lg:p-8">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="form-field">
                  <label className="block text-xs text-white/60 font-body mb-2 uppercase tracking-wider">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-body text-sm focus:border-accent/50 focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div className="form-field">
                  <label className="block text-xs text-white/60 font-body mb-2 uppercase tracking-wider">
                    Email or phone
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-body text-sm focus:border-accent/50 focus:outline-none transition-colors"
                    placeholder="you@restaurant.com or 98XXXXXXXX"
                  />
                </div>

                <div className="form-field">
                  <label className="block text-xs text-white/60 font-body mb-2 uppercase tracking-wider">
                    Business (optional)
                  </label>
                  <input
                    type="text"
                    name="business"
                    value={formData.business}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-body text-sm focus:border-accent/50 focus:outline-none transition-colors"
                    placeholder="Restaurant, hotel, or farm name"
                  />
                </div>

                <div className="form-field">
                  <label className="block text-xs text-white/60 font-body mb-2 uppercase tracking-wider">
                    I'm interested in
                  </label>
                  <select
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-body text-sm focus:border-accent/50 focus:outline-none transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">Select one</option>
                    <option value="weekly-supply">
                      Weekly microgreens supply (restaurant/hotel)
                    </option>
                    <option value="home-delivery">Home delivery</option>
                    <option value="esp32-kit">ESP32 farm kit</option>
                    <option value="consulting">
                      Smart farm setup / consulting
                    </option>
                    <option value="other">Something else</option>
                  </select>
                </div>

                <div className="form-field">
                  <label className="block text-xs text-white/60 font-body mb-2 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-body text-sm focus:border-accent/50 focus:outline-none transition-colors resize-none"
                    placeholder="Tell us what you're looking for..."
                  />
                </div>

                <div className="form-field mt-2">
                  <GlassButton variant="default" className="w-full">
                    Send message
                  </GlassButton>
                </div>
              </form>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
