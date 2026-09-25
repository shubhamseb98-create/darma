"use client";

import { useState, useEffect } from "react";
import { ArrowUp, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clinicInfo } from "../../data/clinicInfo";
import { useBooking } from "../providers/BookingContext";

export default function StickyCTA() {
  const { openBooking } = useBooking();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      setShowBackToTop(totalScroll > 250);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-40 flex flex-col items-center gap-2 sm:gap-2.5">
      {/* 1. Back to Top Button (Appears on scroll) */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative group"
          >
            <button
              onClick={scrollToTop}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand-plum text-white flex items-center justify-center shadow-lg border border-brand-violet/40 hover:bg-brand-plum-hover hover:scale-105 active:scale-95 transition-all cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-rose group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* Left Tooltip */}
            <span className="hidden md:block absolute right-full mr-2.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-charcoal-950/95 backdrop-blur-md text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none shadow-xl border border-white/15">
              Back to top
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Book Consultation Button */}
      <div className="relative group">
        <button
          onClick={() => openBooking()}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand-plum text-white flex items-center justify-center shadow-lg border border-brand-violet/40 hover:bg-brand-plum-hover hover:scale-105 active:scale-95 transition-all cursor-pointer"
          aria-label="Book Consultation"
        >
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-brand-rose" />
        </button>

        {/* Left Tooltip */}
        <span className="hidden md:block absolute right-full mr-2.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-charcoal-950/95 backdrop-blur-md text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none shadow-xl border border-white/15">
          Book Consultation
        </span>
      </div>

      {/* 3. Normal WhatsApp Button (No blink/pulse) */}
      <div className="relative group">
        <a
          href={`https://wa.me/${clinicInfo.contact.whatsapp}?text=${encodeURIComponent(
            "Hello Dr. Megha, I would like to inquire about Truly Derma clinical treatments."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
          aria-label="WhatsApp Clinic"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 sm:w-5 sm:h-5 fill-white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.04 20.15C10.56 20.15 9.11 19.75 7.85 19L7.55 18.82L4.43 19.64L5.26 16.59L5.06 16.27C4.24 14.97 3.8 13.46 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15ZM16.56 14.41C16.31 14.29 15.1 13.69 14.88 13.61C14.65 13.53 14.48 13.49 14.32 13.73C14.15 13.98 13.68 14.53 13.53 14.69C13.39 14.86 13.24 14.88 12.99 14.76C12.75 14.63 11.96 14.38 11.02 13.54C10.29 12.89 9.8 12.08 9.65 11.83C9.51 11.59 9.64 11.45 9.76 11.33C9.87 11.22 10.01 11.04 10.13 10.9C10.25 10.75 10.29 10.65 10.38 10.49C10.46 10.32 10.42 10.18 10.36 10.05C10.29 9.93 9.8 8.73 9.6 8.24C9.4 7.76 9.2 7.82 9.05 7.81C8.91 7.81 8.75 7.81 8.58 7.81C8.42 7.81 8.15 7.87 7.93 8.12C7.7 8.36 7.07 8.96 7.07 10.17C7.07 11.39 7.96 12.56 8.08 12.72C8.21 12.89 9.82 15.37 12.3 16.43C12.89 16.69 13.35 16.84 13.71 16.96C14.3 17.15 14.84 17.12 15.27 17.06C15.75 16.99 16.74 16.46 16.95 15.87C17.15 15.28 17.15 14.78 17.09 14.69C17.03 14.59 16.81 14.53 16.56 14.41Z" />
          </svg>
        </a>

        {/* Left Tooltip */}
        <span className="hidden md:block absolute right-full mr-2.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-charcoal-950/95 backdrop-blur-md text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none shadow-xl border border-white/15">
          WhatsApp Clinic
        </span>
      </div>
    </div>
  );
}
