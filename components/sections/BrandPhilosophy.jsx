"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Award,
  Microscope,
  Zap,
  Droplet,
  CheckCircle2,
} from "lucide-react";
import { SlideDown, SlideUp, StaggerContainer, StaggerItemSlide } from "../ui/MotionWrappers";

export default function BrandPhilosophy() {
  const pillars = [
    {
      num: "01",
      category: "DIAGNOSTICS",
      title: "Microscopic Tissue Analysis",
      description:
        "Every appointment starts with multi-spectral polarized dermoscopy. We diagnose deep cellular histology and tissue pathology rather than masking surface symptoms.",
      icon: Microscope,
      tag: "Polarized Dermoscopy",
      iconColor: "bg-brand-coral-light text-brand-coral",
      borderColor: "border-brand-coral/30",
    },
    {
      num: "02",
      category: "TECHNOLOGY",
      title: "Patented Bio-Technologies",
      description:
        "From authentic TD Glowtech 360° resonance microcurrents to certified Dermapen 4 and US-FDA cleared Q-Switch lasers, our instrumentation is calibrated daily.",
      icon: Zap,
      tag: "US-FDA Cleared",
      iconColor: "bg-brand-violet-light text-brand-violet",
      borderColor: "border-brand-violet/30",
    },
    {
      num: "03",
      category: "EXPERIENCE",
      title: "Zero-Downtime Luxury",
      description:
        "Experience boutique clinic calm paired with medical potency. Leave with visible cellular radiance and zero peeling, allowing an effortless return to your routine.",
      icon: Droplet,
      tag: "Immediate Radiance",
      iconColor: "bg-brand-plum/10 text-brand-plum",
      borderColor: "border-brand-plum/30",
    },
  ];

  return (
    <section className="py-[60px] px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden bg-grid-light border-b border-brand-violet/15">
      {/* Subtle Ambient Radial Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-brand-violet/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
        {/* Section Pill */}
        <SlideDown>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream-50 border border-brand-coral/30 text-brand-coral text-xs tracking-widest uppercase font-bold shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Truly Derma Clinical Philosophy</span>
          </div>
        </SlideDown>

        {/* Clean, Modern Headline */}
        <SlideUp delay={0.1}>
          <div className="relative pt-2 max-w-4xl mx-auto">
            <blockquote className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold text-charcoal-950 leading-[1.3] tracking-tight">
              “True aesthetic elegance cannot be achieved through generic salon facials or overfilling. It begins with{" "}
              <span className="text-brand-coral underline decoration-brand-violet decoration-2 underline-offset-4 font-black">
                deep cellular calibration
              </span>
              , medical laser accuracy, and an uncompromising respect for natural facial anatomy.”
            </blockquote>
          </div>
        </SlideUp>

        {/* Doctor Signature Credit */}
        <SlideUp delay={0.2}>
          <div className="flex items-center justify-center gap-3.5 pt-2">
            <div className="w-11 h-11 rounded-full bg-brand-plum text-brand-rose flex items-center justify-center shadow-md">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <p className="text-base font-bold text-charcoal-950 tracking-wide">
                  Dr. Megha Aggarwal
                </p>
                <span className="px-2 py-0.5 rounded bg-brand-coral-light text-brand-coral text-[10px] font-bold uppercase">
                  MD Dermatology
                </span>
              </div>
              <p className="text-xs text-charcoal-800/80 font-medium">
                Founder & Aesthetic Director • Pitampura & Rajouri Garden, Delhi
              </p>
            </div>
          </div>
        </SlideUp>

        {/* 3 Pillar Clinical Philosophy Cards */}
        <StaggerContainer stagger={0.15} className="pt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <StaggerItemSlide key={idx} yOffset={30}>
                <motion.div
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="p-7 sm:p-8 rounded-3xl bg-white border border-brand-violet/20 shadow-md hover:shadow-xl hover:border-brand-coral/40 transition-all duration-300 flex flex-col justify-between h-full group relative overflow-hidden"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${pillar.iconColor}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-full bg-cream-100 text-charcoal-800/70 border border-brand-violet/15">
                        {pillar.num}
                      </span>
                    </div>

                    <p className="text-[10px] font-bold uppercase tracking-wider text-brand-coral mb-1">
                      {pillar.category}
                    </p>
                    <h3 className="text-lg font-bold text-charcoal-950 mb-2 group-hover:text-brand-violet transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-charcoal-800/80 leading-relaxed font-normal">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-cream-200/80 flex items-center justify-between text-xs font-bold text-brand-plum">
                    <span className="flex items-center gap-1.5 text-[11px] text-charcoal-900">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-coral" />
                      <span>{pillar.tag}</span>
                    </span>
                    <span className="text-[10px] uppercase text-charcoal-800/50 font-medium">
                      Verified
                    </span>
                  </div>
                </motion.div>
              </StaggerItemSlide>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
