"use client";

import Link from "next/link";
import { Clock, ShieldCheck, CheckCircle2, Sparkles, Calendar, MessageSquare, ArrowLeft, ArrowRight } from "lucide-react";
import { useBooking } from "../providers/BookingContext";
import { clinicInfo } from "../../data/clinicInfo";

export default function TreatmentDetailClient({ treatment, relatedTreatments }) {
  const { openBooking } = useBooking();

  return (
    <div className="pt-28 pb-20 bg-cream-50 font-sans">
      {/* Back Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Link
          href="/#services"
          className="inline-flex items-center gap-2 text-xs font-bold text-charcoal-800 hover:text-brand-violet transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Treatments</span>
        </Link>
      </div>

      {/* Treatment Hero Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left info */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3.5 py-1.5 rounded-full bg-brand-violet-light text-brand-violet text-xs font-bold tracking-wider uppercase">
                {treatment.category}
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-brand-coral-light text-brand-coral text-xs font-bold tracking-wider uppercase border border-brand-coral/30">
                {treatment.badge}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-black text-charcoal-950 leading-tight">
              {treatment.name}
            </h1>

            <p className="text-lg sm:text-xl font-sans text-brand-violet font-bold">
              "{treatment.tagline}"
            </p>

            <p className="text-sm sm:text-base text-charcoal-800 leading-relaxed max-w-2xl font-normal">
              {treatment.description}
            </p>

            {/* Treatment Fast Facts */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4 border-y border-brand-violet/20">
              <div className="flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-brand-violet shrink-0" />
                <div>
                  <p className="text-[10px] text-charcoal-800 uppercase tracking-wider font-bold">Duration</p>
                  <p className="text-xs font-bold text-charcoal-950">{treatment.sessionDuration}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-brand-coral shrink-0" />
                <div>
                  <p className="text-[10px] text-charcoal-800 uppercase tracking-wider font-bold">Downtime</p>
                  <p className="text-xs font-bold text-charcoal-950">{treatment.downtime}</p>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-brand-rose shrink-0" />
                <div>
                  <p className="text-[10px] text-charcoal-800 uppercase tracking-wider font-bold">Supervision</p>
                  <p className="text-xs font-bold text-charcoal-950">Dr. Megha Aggarwal</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => openBooking(treatment.slug)}
                className="px-8 py-4 rounded-full bg-brand-plum text-white text-xs sm:text-sm font-bold tracking-wider uppercase hover:bg-brand-plum-hover active:scale-95 transition-all shadow-lg shadow-brand-plum/20 flex items-center gap-2.5 border border-brand-violet/40"
              >
                <Calendar className="w-4 h-4 text-brand-rose" />
                <span>Book This Protocol</span>
              </button>

              <a
                href={`https://wa.me/${clinicInfo.contact.whatsapp}?text=${encodeURIComponent(`Hello Dr. Megha, I would like to inquire about ${treatment.name} at Truly Derma.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-4 rounded-full bg-brand-coral-light hover:bg-brand-coral/20 text-brand-coral text-xs sm:text-sm font-bold tracking-wider uppercase transition-colors flex items-center gap-2 border border-brand-coral/30 shadow-sm"
              >
                <MessageSquare className="w-4 h-4 text-brand-coral" />
                <span>WhatsApp Clinical Desk</span>
              </a>
            </div>
          </div>

          {/* Right Visual Image */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-brand-violet/30 aspect-[4/5] bg-brand-plum-deep group">
              <img
                src={treatment.heroImage}
                alt={treatment.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-plum-deep/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass-dark border border-brand-violet/40 text-cream-50 shadow-xl">
                <span className="text-[10px] uppercase tracking-widest text-brand-rose font-bold block mb-1">
                  Ideal Clinical Indications
                </span>
                <p className="text-xs text-cream-100 font-semibold">
                  {treatment.suitableFor}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Procedure Steps & Highlights Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-brand-violet/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Procedure Timeline */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-brand-coral">
              <span>Step-by-Step Clinical Flow</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-sans font-bold text-charcoal-950">
              What to Expect During Your Session
            </h2>

            <div className="space-y-4 pt-2">
              {treatment.procedureSteps.map((step) => (
                <div
                  key={step.step}
                  className="p-6 rounded-2xl bg-white border border-brand-violet/20 flex items-start gap-4 shadow-sm"
                >
                  <div className="w-11 h-11 rounded-xl bg-brand-plum text-white flex items-center justify-center font-sans text-lg shrink-0 font-black shadow-sm">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-charcoal-950">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-charcoal-800 mt-1 leading-relaxed font-normal">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Clinical Highlights & Suitable Candidates */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 rounded-3xl bg-white border-2 border-brand-violet/30 shadow-md space-y-5">
              <h3 className="text-xl font-bold text-charcoal-950 border-b border-cream-200 pb-3 font-sans">
                Key Biological Benefits
              </h3>
              <ul className="space-y-3">
                {treatment.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-charcoal-800">
                    <CheckCircle2 className="w-4 h-4 text-brand-coral shrink-0 mt-0.5" />
                    <span className="font-medium">{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-cream-200">
                <button
                  onClick={() => openBooking(treatment.slug)}
                  className="w-full py-4 rounded-xl bg-brand-plum text-white text-xs font-bold tracking-wider uppercase hover:bg-brand-plum-hover transition-colors text-center block shadow-md"
                >
                  Book Consultation for {treatment.name}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Treatments Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 border-t border-brand-violet/20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold text-charcoal-950 font-sans">
              Related Protocols
            </h3>
            <p className="text-xs text-charcoal-800 mt-1 font-normal">
              Explore complementary treatments for comprehensive aesthetic results.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedTreatments.map((item) => (
            <Link
              key={item.slug}
              href={`/treatments/${item.slug}`}
              className="group p-5 rounded-2xl bg-white border border-brand-violet/20 hover:border-brand-violet transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[10px] text-brand-coral font-bold tracking-wider uppercase">
                  {item.category}
                </span>
                <h4 className="text-lg font-bold text-charcoal-950 group-hover:text-brand-violet transition-colors">
                  {item.name}
                </h4>
                <p className="text-xs text-charcoal-800 line-clamp-2 font-normal">
                  {item.tagline}
                </p>
              </div>

              <div className="pt-4 flex items-center justify-between text-xs text-brand-violet font-bold mt-4 border-t border-cream-200">
                <span>View Treatment</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
