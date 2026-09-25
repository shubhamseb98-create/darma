"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Microscope, Cpu, ShieldCheck, Sparkles, CheckCircle2, Play, Pause } from "lucide-react";
import { clinicInfo } from "../../data/clinicInfo";
import { SlideDown, SlideInLeft, SlideInRight, ZoomIn, StaggerContainer, StaggerItemSlide } from "../ui/MotionWrappers";
import SplitText from "../ui/SplitText";

const stepIcons = {
  Microscope: Microscope,
  Cpu: Cpu,
  ShieldCheck: ShieldCheck,
};

export default function TechnologyShowcase() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const steps = clinicInfo.techSteps;
  const currentStep = steps[activeStep] || steps[0];

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPlaying, steps.length]);

  return (
    <section
      id="technology"
      className="py-[60px] bg-[#FAFAFD] text-charcoal-950 bg-grid-light overflow-hidden relative border-b border-brand-violet/15"
    >
      {/* Subtle Ambient Radial Light */}
      <div className="absolute top-1/3 -left-48 w-96 h-96 bg-brand-violet/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-brand-coral/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* Section Header */}
        <SlideDown className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-brand-violet/30 text-brand-plum text-xs font-bold tracking-widest uppercase mb-3 shadow-sm">
            <Cpu className="w-3.5 h-3.5 text-brand-coral" />
            <span>Patented Engineering</span>
          </div>

          <SplitText
            tag="h2"
            className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-charcoal-950 block"
          >
            Precision Clinical Technology
          </SplitText>

          <p className="text-charcoal-800/80 text-sm sm:text-base mt-2 font-normal">
            Witness the synchronized 3-phase biological transformation powered by certified medical-grade instrumentation.
          </p>

          {/* Phase Control Pills */}
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mt-6 sm:mt-8">
            {steps.map((step, idx) => (
              <button
                key={step.stepNumber}
                onClick={() => {
                  setActiveStep(idx);
                  setIsPlaying(false);
                }}
                className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer ${
                  activeStep === idx
                    ? "bg-brand-plum text-white font-black shadow-lg shadow-brand-plum/25 scale-105 border border-brand-violet/40"
                    : "bg-white text-charcoal-800 hover:text-charcoal-950 hover:bg-cream-100 border border-brand-violet/20"
                }`}
              >
                <span>Phase {step.stepNumber}</span>
                {activeStep === idx && (
                  <span className="w-2 h-2 rounded-full bg-brand-coral animate-ping" />
                )}
              </button>
            ))}

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2.5 rounded-full bg-white text-charcoal-800 hover:bg-cream-100 border border-brand-violet/20 shadow-sm"
              title={isPlaying ? "Pause auto-advance" : "Resume auto-advance"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-brand-coral" />}
            </button>
          </div>
        </SlideDown>

        {/* Dynamic Display Grid with Sticky Pinned Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative">
          {/* Left Column: Staggered Step Cards with vertical progress line */}
          <div className="lg:col-span-6 relative">
            {/* Vertical Connecting Line */}
            <div className="hidden sm:block absolute left-8 top-10 bottom-10 w-0.5 bg-gradient-to-b from-brand-coral via-brand-violet to-brand-plum/20 z-0" />

            <StaggerContainer stagger={0.15} className="space-y-4 relative z-10">
              {steps.map((step, idx) => {
                const Icon = stepIcons[step.icon] || Sparkles;
                const isActive = activeStep === idx;

                return (
                  <StaggerItemSlide key={step.stepNumber} yOffset={25}>
                    <div
                      onClick={() => {
                        setActiveStep(idx);
                        setIsPlaying(false);
                      }}
                      className={`cursor-pointer p-6 sm:p-7 rounded-3xl transition-all duration-300 border will-change-transform ${
                        isActive
                          ? "bg-white border-brand-coral shadow-xl translate-x-1 lg:translate-x-2.5 ring-2 ring-brand-coral/10"
                          : "bg-white/75 border-brand-violet/15 hover:bg-white shadow-sm"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-13 h-13 rounded-2xl flex items-center justify-center shrink-0 transition-all p-3.5 shadow-sm ${
                            isActive
                              ? "bg-brand-coral text-white shadow-md shadow-brand-coral/30 scale-105"
                              : "bg-cream-100 text-brand-plum"
                          }`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>

                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs uppercase tracking-widest text-brand-coral font-bold">
                              Phase {step.stepNumber} • {step.subtitle}
                            </span>
                            {isActive && (
                              <span className="text-[10px] uppercase tracking-wider bg-brand-plum px-2.5 py-0.5 rounded-full text-white font-bold">
                                Active Step
                              </span>
                            )}
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold text-charcoal-950">
                            {step.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-charcoal-800/80 leading-relaxed pt-1 font-normal">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </StaggerItemSlide>
                );
              })}
            </StaggerContainer>
          </div>

          {/* Right Column: Pinned Sticky Visual Stage Graphic */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <SlideInRight duration={0.8}>
              <div className="relative rounded-3xl overflow-hidden border-2 border-brand-violet/30 shadow-2xl bg-brand-plum-deep h-[420px] sm:h-[480px] md:h-[550px] w-full group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentStep.stepNumber}
                    src={currentStep.image}
                    alt={currentStep.title}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full object-cover object-center"
                  />
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-brand-plum-deep/75 via-brand-plum-deep/15 to-transparent pointer-events-none" />

                {/* Animated Scanning Line */}
                <motion.div
                  animate={{
                    y: ["0%", "100%", "0%"],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-coral to-transparent opacity-80 pointer-events-none shadow-lg shadow-brand-coral/50"
                />

                {/* Stage Overlay HUD */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-4 sm:p-5 rounded-2xl bg-brand-plum-deep/80 backdrop-blur-md border border-brand-violet/40 space-y-2 shadow-2xl">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-brand-rose font-bold tracking-wider uppercase text-[11px] sm:text-xs">
                      Stage Diagnostic Readout
                    </span>
                    <span className="text-cream-200 font-medium text-[11px] sm:text-xs">Phase {currentStep.stepNumber} of 03</span>
                  </div>
                  <div className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-coral shrink-0" />
                    <span className="truncate">{currentStep.title}</span>
                  </div>
                  <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden">
                    <motion.div
                      className="bg-brand-coral h-full"
                      animate={{ width: `${((activeStep + 1) / 3) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            </SlideInRight>
          </div>
        </div>
      </div>
    </section>
  );
}
