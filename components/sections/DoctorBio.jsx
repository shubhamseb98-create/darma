"use client";

import { Award, GraduationCap, Calendar, MessageSquare } from "lucide-react";
import { clinicInfo } from "../../data/clinicInfo";
import { useBooking } from "../providers/BookingContext";
import { SlideUp, SlideInLeft, SlideInRight, StaggerContainer, StaggerItemSlide } from "../ui/MotionWrappers";
import CountUp from "../ui/CountUp";
import SplitText from "../ui/SplitText";
import MagneticButton from "../ui/MagneticButton";

export default function DoctorBio() {
  const { openBooking } = useBooking();
  const doc = clinicInfo.doctor;

  return (
    <section
      id="doctor"
      className="scroll-mt-24 py-[60px] bg-white bg-dots-light border-b border-brand-violet/15 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Doctor Portrait */}
          <SlideInLeft duration={0.8} className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative Frame */}
              <div className="absolute -inset-4 rounded-3xl border-2 border-brand-violet/40 transform -rotate-1 pointer-events-none shadow-sm" />
              <div className="absolute -inset-4 rounded-3xl bg-brand-coral/10 transform rotate-2 pointer-events-none" />

              {/* Portrait Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white aspect-[3/4] border-2 border-brand-violet/30 group">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-plum-deep/80 via-transparent to-transparent pointer-events-none" />

                {/* Floating Caption on Image */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass-dark border border-brand-violet/40 text-cream-50 space-y-1 shadow-lg">
                  <p className="text-xs uppercase tracking-widest text-brand-rose font-bold">
                    Chief Dermatologist
                  </p>
                  <p className="text-2xl font-bold text-white font-sans">{doc.name}</p>
                  <p className="text-xs text-cream-200/90 font-medium">{doc.qualifications}</p>
                </div>
              </div>
            </div>
          </SlideInLeft>

          {/* Right Column: Biography, Credentials & Count-Up Stats */}
          <SlideInRight duration={0.8} className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-violet-light text-brand-violet text-xs font-bold tracking-widest uppercase shadow-sm">
                <Award className="w-3.5 h-3.5 text-brand-coral" />
                <span>Direct Physician Leadership</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <SplitText
                tag="h2"
                className="text-3xl sm:text-4xl lg:text-5xl font-sans font-black text-charcoal-950 block"
              >
                {doc.name}
              </SplitText>
              <p className="text-brand-coral text-sm font-bold tracking-wide">
                {doc.title} • Founder, Truly Derma Clinic & Academy
              </p>
            </div>

            <p className="text-base sm:text-lg text-charcoal-800/90 leading-relaxed font-sans border-l-4 border-brand-violet pl-4 py-1 bg-white rounded-r-xl shadow-sm">
              "{doc.philosophy}"
            </p>

            <p className="text-xs sm:text-sm text-charcoal-800 leading-relaxed font-normal">
              {doc.bio}
            </p>

            {/* Doctor Stats Grid with Stagger & Count-Up */}
            <StaggerContainer stagger={0.1} className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-brand-violet/20">
              {doc.stats.map((stat, idx) => (
                <StaggerItemSlide
                  key={idx}
                  yOffset={20}
                  className="space-y-1 p-3 rounded-xl bg-white border border-brand-violet/20 shadow-sm"
                >
                  <p className="text-2xl sm:text-3xl font-black text-brand-plum font-sans">
                    <CountUp value={stat.value} duration={1.8} />
                  </p>
                  <p className="text-[11px] text-charcoal-800 uppercase tracking-wider font-bold">
                    {stat.label}
                  </p>
                </StaggerItemSlide>
              ))}
            </StaggerContainer>

            {/* Truly Derma Academy Badge */}
            <SlideUp delay={0.15} className="p-5 rounded-2xl bg-white border border-brand-violet/30 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-violet-light text-brand-violet flex items-center justify-center shrink-0 shadow-sm">
                <GraduationCap className="w-6 h-6 text-brand-plum" />
              </div>
              <div>
                <h4 className="text-base font-bold text-charcoal-950">
                  Director, Truly Derma Aesthetic Academy
                </h4>
                <p className="text-xs text-charcoal-800/80 mt-1 leading-relaxed">
                  Training certified dermatologists and cosmetic physicians across India in advanced laser protocols, facial anatomy, and microcurrent physics.
                </p>
              </div>
            </SlideUp>

            {/* Doctor Consultation CTAs with Magnetic Effect */}
            <SlideUp delay={0.25} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <MagneticButton strength={0.25}>
                <button
                  onClick={() => openBooking()}
                  className="w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-brand-plum text-white text-xs sm:text-sm font-bold tracking-wider uppercase hover:bg-brand-plum-hover active:scale-95 transition-all shadow-lg shadow-brand-plum/20 flex items-center justify-center gap-2.5 border border-brand-violet/40 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-brand-rose" />
                  <span>Consult Dr. Megha Aggarwal</span>
                </button>
              </MagneticButton>

              <MagneticButton strength={0.2}>
                <a
                  href={`https://wa.me/${clinicInfo.contact.whatsapp}?text=${encodeURIComponent("Hello Dr. Megha, I would like to book a private clinical consultation.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-brand-coral-light hover:bg-brand-coral/20 text-brand-coral text-xs sm:text-sm font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 border border-brand-coral/30 shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Appointment Desk</span>
                </a>
              </MagneticButton>
            </SlideUp>
          </SlideInRight>
        </div>
      </div>
    </section>
  );
}
