"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MessageSquare, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useBooking } from "../providers/BookingContext";
import { clinicInfo } from "../../data/clinicInfo";
import MagneticButton from "../ui/MagneticButton";

const BANNER_SLIDES = [
  {
    id: "main-hero",
    eyebrow: "TRULY DERMA CLINIC & ACADEMY",
    title: "Transform Your Beauty & Health with Our Expert Treatments.",
    subtitle:
      "Specialized Skin, Hair, Laser, and Fat Loss Treatments by Certified Experts. Led by Dr. Megha Aggarwal across our Pitampura & Rajouri Garden clinics.",
    image: "/banners/banner-facial.orig.jpg",
    alt: "Truly Derma Expert Treatments in Delhi",
    ctaText: "BOOK APPOINTMENT",
  },
  {
    id: "glowtech-exclusive",
    eyebrow: "EXCLUSIVE IN INDIA",
    title: "Truly Derma Exclusive in India: TD Glowtech 360°.",
    subtitle:
      "Patented electroporation with 7 micro-current frequencies. A non-invasive skin gym offering customized treatments that lift, tone, and contour with zero downtime.",
    image: "/banners/banner-glow.jpg",
    alt: "TD Glowtech 360 at Truly Derma Aesthetic Clinic",
    ctaText: "Explore TD Glowtech",
  },
  {
    id: "laser-care",
    eyebrow: "ADVANCED LASER CLINIC",
    title: "Clinical Laser Toning & Medical Hydra Facials.",
    subtitle:
      "Advanced Q-Switch laser, Hollywood Carbon Peel, and patented Vortex-Fusion hydration delivering pure medical clarity and pore tightening.",
    image: "/banners/banner-laser.orig.jpg",
    alt: "State of the art Laser and Hydra Facial at Truly Derma",
    ctaText: "Schedule Laser Visit",
  },
];

const AUTOPLAY_DURATION = 5200; // 5.2 seconds per slide

// Directional slide variants with depth & parallax
const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0.95,
    scale: 1.08,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
      scale: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.4 },
    },
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction > 0 ? "-35%" : "35%",
    opacity: 0.15,
    scale: 0.96,
    transition: {
      x: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
      scale: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.5 },
    },
  }),
};

export default function HeroSection() {
  const [[currentIdx, direction], setPage] = useState([0, 1]);
  const { openBooking } = useBooking();

  const nextSlide = useCallback(() => {
    setPage(([prev]) => [(prev + 1) % BANNER_SLIDES.length, 1]);
  }, []);

  const prevSlide = useCallback(() => {
    setPage(([prev]) => [(prev - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length, -1]);
  }, []);

  const goToSlide = useCallback((idx) => {
    setPage(([prev]) => [idx, idx >= prev ? 1 : -1]);
  }, []);

  // Continuous Autoplay & Infinite Loop
  useEffect(() => {
    const timer = setInterval(() => {
      setPage(([prev]) => [(prev + 1) % BANNER_SLIDES.length, 1]);
    }, AUTOPLAY_DURATION);

    return () => clearInterval(timer);
  }, [currentIdx]);

  const slide = BANNER_SLIDES[currentIdx];
  const titleWords = slide.title.split(" ");

  return (
    <section className="relative w-full pt-20 sm:pt-24 bg-cream-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-[60px]">
        {/* Banner Container - Preserved Original Design */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden min-h-[500px] sm:min-h-[540px] md:min-h-[580px] flex items-center shadow-xl border border-brand-violet/20 bg-charcoal-950">
          
          {/* Animated Directional Slide Background with Ken-Burns Motion */}
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={slide.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 z-0 overflow-hidden"
            >
              {/* Image with Continuous Ken Burns Camera Drift */}
              <motion.img
                src={slide.image}
                alt={slide.alt}
                initial={{ scale: 1.14, filter: "brightness(0.88) contrast(1.04)" }}
                animate={{ scale: 1.02, filter: "brightness(0.92) contrast(1.02)" }}
                transition={{ duration: 5.5, ease: "easeOut" }}
                className="w-full h-full object-cover object-center will-change-transform"
              />

              {/* Gentle Left Scrim for Text Contrast */}
              <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/85 via-charcoal-950/45 to-transparent z-10 w-full sm:w-3/4 md:w-3/5" />
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-charcoal-950/60 to-transparent z-10" />

              {/* Luminous Shimmer Light Sweep on Slide Change */}
              <motion.div
                key={`shimmer-${slide.id}`}
                initial={{ x: "-120%", opacity: 0.6 }}
                animate={{ x: "240%", opacity: 0 }}
                transition={{ duration: 1.3, ease: "easeOut", delay: 0.08 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none z-10"
              />
            </motion.div>
          </AnimatePresence>

          {/* Banner Content Area: Richly Animated Per-Slide Entrance */}
          <div className="relative z-20 w-full px-6 sm:px-12 md:px-16 py-12 max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${slide.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
                className="space-y-4"
              >
                {/* 1. Spring-Animated Eyebrow with Pulsing Dot */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: -16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25, delay: 0.08 }}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold tracking-widest uppercase shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-brand-coral animate-ping" />
                    <span>{slide.eyebrow}</span>
                  </div>
                </motion.div>

                {/* 2. Word-by-Word Mask Roll-Up Headline */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold text-white leading-tight tracking-tight block">
                  {titleWords.map((word, i) => (
                    <span key={i} className="inline-block overflow-hidden align-top mr-[0.26em] last:mr-0">
                      <motion.span
                        initial={{ y: "115%", opacity: 0, rotate: 1.5 }}
                        animate={{ y: "0%", opacity: 1, rotate: 0 }}
                        transition={{
                          duration: 0.65,
                          delay: 0.15 + i * 0.035,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="inline-block"
                      >
                        {word}
                      </motion.span>
                    </span>
                  ))}
                </h1>

                {/* 3. Subtitle with Blur-to-Clear Reveal */}
                <motion.p
                  initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.6, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="text-sm sm:text-base text-cream-100/90 font-normal leading-relaxed max-w-lg"
                >
                  {slide.subtitle}
                </motion.p>

                {/* 4. Action Buttons with Spring Cascade */}
                <motion.div
                  initial={{ opacity: 0, y: 22, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.42 }}
                  className="flex flex-wrap items-center gap-3 pt-2"
                >
                  <MagneticButton strength={0.28}>
                    <button
                      onClick={() => openBooking()}
                      className="px-6 py-3 rounded-full bg-brand-plum text-white text-xs sm:text-sm font-bold tracking-wider uppercase hover:bg-brand-plum-hover active:scale-95 transition-all shadow-lg shadow-brand-plum/30 flex items-center gap-2 border border-brand-violet/40 cursor-pointer group"
                    >
                      <Calendar className="w-4 h-4 text-brand-rose" />
                      <span>{slide.ctaText}</span>
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                        className="inline-block"
                      >
                        <ArrowRight className="w-3.5 h-3.5 text-brand-rose" />
                      </motion.span>
                    </button>
                  </MagneticButton>

                  <MagneticButton strength={0.2}>
                    <a
                      href={`https://wa.me/${clinicInfo.contact.whatsapp}?text=${encodeURIComponent(
                        "Hello Dr. Megha, I would like to inquire about Truly Derma clinic."
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md text-white text-xs sm:text-sm font-bold tracking-wider uppercase transition-all flex items-center gap-2 border border-white/25 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 text-brand-coral" />
                      <span>WhatsApp</span>
                    </a>
                  </MagneticButton>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Minimalist Bottom Slide Controls with Animated Transitions */}
          <div className="absolute bottom-5 right-5 sm:right-8 z-20 flex items-center gap-3 bg-charcoal-950/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 shadow-xl">
            {/* Liquid Number Dots */}
            <div className="flex items-center gap-1.5">
              {BANNER_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className="relative p-0.5 cursor-pointer"
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  <motion.div
                    animate={{
                      width: currentIdx === idx ? 24 : 6,
                      backgroundColor: currentIdx === idx ? "#E06D53" : "rgba(255, 255, 255, 0.4)",
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    className="h-1.5 rounded-full"
                  />
                </button>
              ))}
            </div>

            {/* Sliding Number Readout */}
            <div className="text-xs text-cream-200/80 font-mono pl-1 flex items-center overflow-hidden h-4">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={currentIdx}
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -14, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  0{currentIdx + 1}
                </motion.span>
              </AnimatePresence>
              <span className="text-cream-300/60"> / 0{BANNER_SLIDES.length}</span>
            </div>

            {/* Prev/Next Buttons */}
            <div className="flex items-center gap-1 border-l border-white/20 pl-2">
              <button
                onClick={prevSlide}
                aria-label="Previous Slide"
                className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 active:scale-90 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next Slide"
                className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 active:scale-90 transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bottom Progress Bar (fills over slide duration) */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20 overflow-hidden">
            <motion.div
              key={currentIdx}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: AUTOPLAY_DURATION / 1000, ease: "linear" }}
              className="h-full bg-gradient-to-r from-brand-violet to-brand-coral"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
