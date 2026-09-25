"use client";

import { Star, Quote, Sparkles, CheckCircle2, MapPin } from "lucide-react";
import { clinicInfo } from "../../data/clinicInfo";
import { SlideUp } from "../ui/MotionWrappers";

export default function TestimonialsMarquee() {
  const testimonials = clinicInfo.testimonials;
  
  // Row 1: Leftward continuous scroll (duplicated twice for seamless -50% loop)
  const marqueeRow1 = [...testimonials, ...testimonials];
  
  // Row 2: Rightward continuous scroll (reversed and duplicated twice for seamless loop)
  const reversed = [...testimonials].reverse();
  const marqueeRow2 = [...reversed, ...reversed];

  const renderCard = (item, keyPrefix, idx) => {
    const initials = item.patientName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2);

    return (
      <div
        key={`${keyPrefix}-${item.id}-${idx}`}
        className="w-[300px] sm:w-[360px] md:w-[390px] h-[195px] sm:h-[205px] shrink-0 bg-[#211033]/85 backdrop-blur-xl p-5 rounded-2xl sm:rounded-3xl border border-white/15 shadow-xl hover:border-brand-coral/50 hover:bg-[#28133e]/95 transition-all duration-300 flex flex-col justify-between text-white group/card"
      >
        {/* Top: Avatar, Name, Verified & Star Rating */}
        <div className="flex items-start justify-between gap-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-brand-violet to-brand-coral p-[1.5px] shrink-0 shadow-md">
              <div className="w-full h-full rounded-full bg-[#1C0A29] flex items-center justify-center text-xs font-bold text-cream-100">
                {initials}
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-bold text-white font-sans truncate">
                  {item.patientName}
                </h4>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" title="Verified Patient" />
              </div>
              <p className="text-[11px] text-brand-coral font-bold truncate">
                {item.treatment}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-0.5 shrink-0 pt-0.5">
            {[...Array(item.rating)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-brand-coral text-brand-coral" />
            ))}
          </div>
        </div>

        {/* Middle: Review Quote */}
        <div className="my-auto py-1">
          <p className="text-xs sm:text-[12.5px] text-cream-100/90 leading-relaxed font-sans font-normal line-clamp-3 italic">
            "{item.comment}"
          </p>
        </div>

        {/* Bottom: Location & Quote mark */}
        <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-cream-200/70">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-brand-rose shrink-0" />
            <span className="font-medium text-cream-200/90 truncate">{item.city}</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[10px] text-emerald-400 font-medium">Verified Patient</span>
            <Quote className="w-3.5 h-3.5 text-brand-violet/40 group-hover/card:text-brand-coral/60 transition-colors" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      id="testimonials"
      className="scroll-mt-28 pt-16 sm:pt-20 pb-14 sm:pb-16 bg-[#180A25] text-white bg-dark-grain border-b border-brand-violet/20 overflow-hidden relative"
    >
      {/* Invisible anchor target to guarantee clearance below fixed navbar */}
      <div id="testimonials-anchor" className="absolute -top-24 sm:-top-28 left-0 pointer-events-none" />

      {/* Ambient Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-violet/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-brand-coral/10 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <SlideUp yOffset={25} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10 text-center relative z-10">
        <div>
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-brand-violet/40 text-brand-rose text-xs font-bold tracking-widest uppercase mb-3.5 shadow-sm backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-brand-coral" />
            <span>Patient Experiences</span>
            <span className="text-white/40">•</span>
            <div className="flex items-center gap-1 text-amber-300">
              <span className="text-white font-bold">4.9</span>
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="text-[11px] text-cream-200/90 font-medium lowercase">on Google</span>
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-white tracking-tight">
            Words from Our Discerning Clients
          </h2>
          <p className="text-cream-200/80 text-sm sm:text-base mt-2 max-w-2xl mx-auto font-normal leading-relaxed">
            Read verified clinical accounts from patients who trusted their skin and hair transformations to Dr. Megha Aggarwal.
          </p>
        </div>
      </SlideUp>

      {/* Side 1: Top Marquee Row (Moving Left) */}
      <SlideUp delay={0.08} yOffset={25} className="relative w-full overflow-hidden group mb-4 sm:mb-5 z-10">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-r from-[#180A25] via-[#180A25]/90 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-l from-[#180A25] via-[#180A25]/90 to-transparent z-20 pointer-events-none" />

        <div className="flex gap-4 sm:gap-5 animate-marquee group-hover:[animation-play-state:paused] w-max py-1 px-4">
          {marqueeRow1.map((item, idx) => renderCard(item, "row1", idx))}
        </div>
      </SlideUp>

      {/* Side 2: Bottom Marquee Row (Moving Right - Opposite Side) */}
      <SlideUp delay={0.16} yOffset={25} className="relative w-full overflow-hidden group mb-7 sm:mb-8 z-10">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-r from-[#180A25] via-[#180A25]/90 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-l from-[#180A25] via-[#180A25]/90 to-transparent z-20 pointer-events-none" />

        <div className="flex gap-4 sm:gap-5 animate-marquee-reverse group-hover:[animation-play-state:paused] w-max py-1 px-4">
          {marqueeRow2.map((item, idx) => renderCard(item, "row2", idx))}
        </div>
      </SlideUp>

      {/* Trust Stats Strip */}
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-8 px-6 py-2.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md text-xs text-cream-200/80">
          <span className="flex items-center gap-1.5">
            <span className="font-bold text-white">99.4%</span> Patient Satisfaction
          </span>
          <span className="hidden sm:inline text-white/20">•</span>
          <span className="flex items-center gap-1.5">
            <span className="font-bold text-white">20,000+</span> Procedures Completed
          </span>
          <span className="hidden sm:inline text-white/20">•</span>
          <span className="flex items-center gap-1.5">
            <span className="font-bold text-white">14+ Years</span> Clinical Excellence
          </span>
        </div>
      </div>
    </section>
  );
}
