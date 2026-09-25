"use client";

import { MessageSquare, Calendar, Sparkles, Phone, ShieldCheck } from "lucide-react";
import { clinicInfo } from "../../data/clinicInfo";
import { useBooking } from "../providers/BookingContext";
import { ZoomIn } from "../ui/MotionWrappers";
import SplitText from "../ui/SplitText";
import MagneticButton from "../ui/MagneticButton";

export default function CTABanner() {
  const { openBooking } = useBooking();

  return (
    <section className="relative py-[60px] px-4 sm:px-6 lg:px-8 bg-cream-50 bg-dots-light border-b border-brand-violet/15 overflow-hidden text-charcoal-950">
      {/* Subtle Ambient Radial Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[350px] bg-brand-violet/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[350px] bg-brand-coral/10 rounded-full blur-3xl pointer-events-none" />

      {/* Zoom-and-Settle Container */}
      <ZoomIn initialScale={0.95} duration={0.8} className="relative max-w-5xl mx-auto text-center space-y-8 z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-brand-coral/30 text-brand-coral text-xs font-bold tracking-widest uppercase shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-brand-coral" />
          <span>Begin Your Transformation</span>
        </div>

        <SplitText
          tag="h2"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-black leading-tight text-charcoal-950 max-w-4xl mx-auto tracking-tight block"
        >
          Get Free Consultation With Our Experts
        </SplitText>

        <p className="text-charcoal-800 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-normal">
          Everything you need to feel healthy and beautiful. Visit Dr. Megha Aggarwal at our Pitampura or Rajouri Garden clinics, or chat via WhatsApp for priority scheduling.
        </p>

        {/* Action Buttons with Magnetic Touch */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <MagneticButton strength={0.25}>
            <button
              onClick={() => openBooking()}
              className="w-full sm:w-auto px-9 py-4 rounded-full bg-brand-coral text-white text-xs sm:text-sm font-bold tracking-wider uppercase hover:bg-brand-coral-hover active:scale-95 transition-all shadow-xl shadow-brand-coral/25 flex items-center justify-center gap-2.5 border border-brand-rose/40"
            >
              <Calendar className="w-4 h-4 text-white" />
              <span>Schedule Consultation</span>
            </button>
          </MagneticButton>

          <MagneticButton strength={0.2}>
            <a
              href={`https://wa.me/${clinicInfo.contact.whatsapp}?text=${encodeURIComponent(
                "Hello Truly Derma desk, I would like to schedule an appointment with Dr. Megha Aggarwal."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-plum hover:bg-brand-plum-hover text-white text-xs sm:text-sm font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2.5 border border-brand-violet/40 shadow-lg shadow-brand-plum/20"
            >
              <MessageSquare className="w-4 h-4 text-brand-rose" />
              <span>Chat via WhatsApp</span>
            </a>
          </MagneticButton>

          <MagneticButton strength={0.15}>
            <a
              href={`tel:${clinicInfo.contact.phone}`}
              className="w-full sm:w-auto px-7 py-4 rounded-full bg-white hover:bg-cream-100 text-charcoal-950 text-xs sm:text-sm font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 border border-brand-violet/20 shadow-sm"
            >
              <Phone className="w-4 h-4 text-brand-coral" />
              <span>{clinicInfo.contact.phone}</span>
            </a>
          </MagneticButton>
        </div>

        {/* Security & Confidentiality */}
        <div className="pt-4 flex items-center justify-center gap-2 text-xs text-charcoal-800/70 font-medium">
          <ShieldCheck className="w-4 h-4 text-brand-coral" />
          <span>Strict Patient Privacy & Board-Certified Protocols</span>
        </div>
      </ZoomIn>
    </section>
  );
}
