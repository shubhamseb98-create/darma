"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, ShieldCheck, Sparkles, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { treatments } from "../../data/treatments";
import { useBooking } from "../providers/BookingContext";
import { SlideUp, SlideInLeft, SlideInRight } from "../ui/MotionWrappers";

export default function ServicesGallery() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef(null);
  const { openBooking } = useBooking();

  const filters = [
    { id: "all", label: "All Procedures" },
    { id: "skin", label: "Skin Treatments" },
    { id: "hair", label: "Hair Treatments" },
    { id: "laser", label: "Laser Treatments" },
    { id: "fat-loss", label: "Fat Loss" },
  ];

  const filteredTreatments = treatments.filter((t) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "skin") return t.category === "Skin Treatment";
    if (selectedFilter === "hair") return t.category === "Hair Treatment";
    if (selectedFilter === "laser") return t.category === "Laser Treatment";
    if (selectedFilter === "fat-loss") return t.category === "Fat Loss";
    return true;
  });

  const getScrollStep = useCallback(() => {
    if (!scrollContainerRef.current) return 340;
    const card = scrollContainerRef.current.querySelector(".treatment-card");
    const gap = typeof window !== "undefined" && window.innerWidth < 640 ? 16 : 24;
    return card ? card.offsetWidth + gap : 340;
  }, []);

  const scrollLeft = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const step = getScrollStep();
    const maxScroll = container.scrollWidth - container.clientWidth;

    if (container.scrollLeft <= 15) {
      container.scrollTo({ left: maxScroll, behavior: "smooth" });
    } else {
      container.scrollBy({ left: -step, behavior: "smooth" });
    }
  }, [getScrollStep]);

  const scrollRight = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const step = getScrollStep();
    const maxScroll = container.scrollWidth - container.clientWidth;

    if (container.scrollLeft >= maxScroll - 15) {
      container.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      container.scrollBy({ left: step, behavior: "smooth" });
    }
  }, [getScrollStep]);

  // Autoplay with continuous looping
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      if (!scrollContainerRef.current) return;
      const container = scrollContainerRef.current;
      const step = getScrollStep();
      const maxScroll = container.scrollWidth - container.clientWidth;

      if (maxScroll <= 0) return;

      if (container.scrollLeft >= maxScroll - 15) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: step, behavior: "smooth" });
      }
    }, 3500);

    return () => clearInterval(timer);
  }, [isPaused, getScrollStep, filteredTreatments]);

  // Reset scroll position when category changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [selectedFilter]);

  return (
    <section
      id="services"
      className="py-[60px] bg-brand-plum-deep text-white bg-dark-grain overflow-hidden border-b border-brand-violet/20 relative"
    >
      {/* Ambient Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-violet/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-brand-coral/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SlideInLeft>
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-brand-violet/40 text-brand-rose text-xs font-bold tracking-widest uppercase mb-3 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-brand-coral" />
                <span>Targeted Clinical Treatments</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-white">
                Evidence-Based Aesthetic Care
              </h2>
              <p className="text-cream-200/80 text-sm sm:text-base mt-2 max-w-xl font-normal">
                From our proprietary TD Glowtech 360° lifting to medical-grade Hydrafacials and Q-Switch Laser toning.
              </p>
            </div>
          </SlideInLeft>

          {/* Navigation Scroll Buttons */}
          <SlideInRight>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={scrollLeft}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all active:scale-90 shadow-sm backdrop-blur-md cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={scrollRight}
                className="p-3 rounded-full bg-brand-coral hover:bg-brand-coral/90 text-white transition-all active:scale-90 shadow-md shadow-brand-coral/30 cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </SlideInRight>
        </div>

        {/* Category Filter Pills - Responsive wrap */}
        <SlideUp delay={0.1}>
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-6 pb-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                  selectedFilter === filter.id
                    ? "bg-white text-charcoal-950 shadow-md scale-105"
                    : "bg-white/10 text-cream-200/80 hover:bg-white/20 hover:text-white border border-white/15"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </SlideUp>
      </div>

      {/* Fluid Horizontal Scroll Card Carousel */}
      <SlideUp delay={0.2} className="w-full relative z-10">
        <div
          ref={scrollContainerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => {
            setTimeout(() => setIsPaused(false), 2000);
          }}
          className="flex gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8 overflow-x-auto no-scrollbar scroll-smooth pt-6 sm:pt-10 pb-16 sm:pb-12 snap-x snap-mandatory"
        >
          {filteredTreatments.map((treatment, idx) => (
            <div
              key={treatment.slug}
              className="treatment-card py-2 flex-shrink-0 snap-center sm:snap-start"
            >
              <motion.div
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="group relative w-[84vw] max-w-[340px] sm:w-[380px] lg:w-[410px] bg-charcoal-950/70 backdrop-blur-xl rounded-3xl border border-white/15 overflow-hidden shadow-2xl hover:border-brand-coral/60 hover:shadow-brand-coral/20 transition-all duration-300 flex flex-col justify-between h-full text-white"
              >
                {/* Image & Overlay */}
                <div className="relative h-48 sm:h-64 overflow-hidden bg-charcoal-900">
                  <img
                    src={treatment.heroImage}
                    alt={treatment.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/30 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between gap-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-brand-rose text-[10px] sm:text-xs font-bold tracking-wide border border-white/15 shadow-sm truncate">
                      {treatment.category}
                    </span>
                    <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-brand-coral text-white text-[10px] sm:text-[11px] font-bold tracking-wide shadow-sm truncate">
                      {treatment.badge}
                    </span>
                  </div>

                  {/* Bottom Tags inside Image */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center gap-2 text-cream-100 text-[11px] sm:text-xs">
                    <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2 py-1 sm:px-2.5 rounded-lg border border-white/10">
                      <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-rose shrink-0" />
                      <span className="font-medium whitespace-nowrap">{treatment.sessionDuration}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2 py-1 sm:px-2.5 rounded-lg border border-white/10 overflow-hidden">
                      <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-rose shrink-0" />
                      <span className="font-medium truncate">{treatment.downtime}</span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between space-y-4 sm:space-y-5">
                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="text-[10px] sm:text-[11px] uppercase tracking-widest text-brand-coral font-bold">
                      Protocol 0{idx + 1}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-brand-rose transition-colors line-clamp-2">
                      {treatment.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-cream-200/80 line-clamp-2 sm:line-clamp-3 leading-relaxed font-normal">
                      {treatment.description}
                    </p>
                  </div>

                  {/* Highlights List */}
                  <div className="space-y-1.5 pt-2 border-t border-white/10">
                    {treatment.highlights.slice(0, 2).map((highlight, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-cream-200/90">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-coral mt-1.5 shrink-0" />
                        <span className="line-clamp-1 font-medium">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Card Actions */}
                  <div className="pt-3 sm:pt-4 flex items-center gap-2 sm:gap-2.5">
                    <button
                      type="button"
                      onClick={() => openBooking(treatment.slug)}
                      className="flex-1 py-2.5 px-3 sm:py-3 sm:px-4 rounded-xl bg-brand-plum text-white text-[11px] sm:text-xs font-bold tracking-wider uppercase hover:bg-brand-plum-hover active:scale-98 transition-all flex items-center justify-center gap-1.5 sm:gap-2 shadow-md border border-brand-violet/40 cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5 text-brand-rose shrink-0" />
                      <span className="whitespace-nowrap">Book Protocol</span>
                    </button>

                    <Link
                      href={`/treatments/${treatment.slug}`}
                      className="p-2.5 sm:p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/15 cursor-pointer shrink-0"
                      title={`View details for ${treatment.name}`}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </SlideUp>
    </section>
  );
}
