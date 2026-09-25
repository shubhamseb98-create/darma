"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, CheckCircle2, MessageSquare, Sparkles, Phone, User, Mail } from "lucide-react";
import AnimatedCheckmark from "./AnimatedCheckmark";
import { treatments } from "../../data/treatments";
import { clinicInfo } from "../../data/clinicInfo";

export default function BookingModal({ isOpen, onClose, initialTreatment = "" }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    branch: "Pitampura Clinic (New Delhi)",
    treatment: initialTreatment || treatments[0].slug,
    date: "",
    timeSlot: "Morning (10:30 AM - 1:00 PM)",
    concerns: "",
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialTreatment) {
      setFormData((prev) => ({ ...prev, treatment: initialTreatment }));
    }
  }, [initialTreatment]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppBooking = (e) => {
    e.preventDefault();
    const selectedTreat = treatments.find((t) => t.slug === formData.treatment);
    const treatmentName = selectedTreat ? selectedTreat.name : formData.treatment;
    
    const message = `*Consultation Request — Truly Derma Clinic*\n\n` +
      `👤 *Name:* ${formData.name || "Patient"}\n` +
      `📞 *Phone:* ${formData.phone}\n` +
      `🏥 *Clinic Location:* ${formData.branch}\n` +
      `✨ *Treatment:* ${treatmentName}\n` +
      `📅 *Preferred Date:* ${formData.date || "Next Available"}\n` +
      `⏰ *Time Slot:* ${formData.timeSlot}\n` +
      `📝 *Specific Concern:* ${formData.concerns || "General Clinical Assessment"}\n\n` +
      `_Sent via Truly Derma Online Portal_`;

    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${clinicInfo.contact.whatsapp}?text=${encoded}`;
    window.open(url, "_blank");
    setSubmitted(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetAndClose}
            className="fixed inset-0 bg-brand-plum-deep/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-brand-violet/30 overflow-hidden z-10 max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="bg-brand-plum text-white p-6 sm:p-8 relative">
              <button
                onClick={resetAndClose}
                className="absolute top-6 right-6 p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-violet/30 border border-brand-violet/50 text-brand-rose text-xs tracking-wider uppercase mb-3 font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Dr. Megha Aggarwal's Clinic</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-sans font-bold text-white">
                Book a Clinical Consultation
              </h3>
              <p className="text-cream-200/90 text-sm mt-1 max-w-lg font-normal">
                Experience personalized dermatology, advanced laser toning, and proprietary vortex therapies.
              </p>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 overflow-y-auto">
              {submitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="mx-auto flex items-center justify-center">
                    <AnimatedCheckmark size={72} color="#C74B4A" />
                  </div>
                  <h4 className="text-2xl font-bold text-charcoal-950 font-sans pt-2">
                    Consultation Request Initiated
                  </h4>
                  <p className="text-sm max-w-md mx-auto text-charcoal-800">
                    Thank you, <span className="font-bold text-charcoal-950">{formData.name || "Patient"}</span>. Our clinical desk is reviewing your request and will confirm your appointment via WhatsApp / phone shortly.
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={resetAndClose}
                      className="px-7 py-3.5 rounded-full bg-brand-plum text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-plum-hover transition-colors shadow-md"
                    >
                      Return to Site
                    </button>
                    <a
                      href={`https://wa.me/${clinicInfo.contact.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-7 py-3.5 rounded-full bg-brand-coral-light text-brand-coral text-xs font-bold uppercase tracking-wider hover:bg-brand-coral/20 transition-colors flex items-center justify-center gap-2 border border-brand-coral/30"
                    >
                      <MessageSquare className="w-4 h-4 text-brand-coral" />
                      Chat with Desk on WhatsApp
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-charcoal-900 uppercase tracking-wider mb-1.5">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-charcoal-800/50 absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Radhika Sharma"
                          className="w-full pl-10 pr-4 py-2.5 bg-cream-100/80 border border-brand-violet/20 rounded-xl text-sm focus:outline-none focus:border-brand-violet focus:ring-1 focus:ring-brand-violet text-charcoal-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-charcoal-900 uppercase tracking-wider mb-1.5">
                        Phone / WhatsApp *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-charcoal-800/50 absolute left-3.5 top-3.5" />
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full pl-10 pr-4 py-2.5 bg-cream-100/80 border border-brand-violet/20 rounded-xl text-sm focus:outline-none focus:border-brand-violet focus:ring-1 focus:ring-brand-violet text-charcoal-900"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-charcoal-900 uppercase tracking-wider mb-1.5">
                        Clinic Location *
                      </label>
                      <select
                        name="branch"
                        value={formData.branch}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-cream-100/80 border border-brand-violet/20 rounded-xl text-sm focus:outline-none focus:border-brand-violet focus:ring-1 focus:ring-brand-violet text-charcoal-900"
                      >
                        <option value="Pitampura Clinic (New Delhi)">Pitampura Clinic (Harsh Vihar)</option>
                        <option value="Rajouri Garden Clinic (New Delhi)">Rajouri Garden Clinic (J2/16)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-charcoal-900 uppercase tracking-wider mb-1.5">
                        Select Treatment *
                      </label>
                      <select
                        name="treatment"
                        value={formData.treatment}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-cream-100/80 border border-brand-violet/20 rounded-xl text-sm focus:outline-none focus:border-brand-violet focus:ring-1 focus:ring-brand-violet text-charcoal-900"
                      >
                        {treatments.map((t) => (
                          <option key={t.slug} value={t.slug}>
                            {t.name} ({t.category})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-charcoal-900 uppercase tracking-wider mb-1.5">
                        Preferred Date
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-charcoal-800/50 absolute left-3.5 top-3.5" />
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2.5 bg-cream-100/80 border border-brand-violet/20 rounded-xl text-sm focus:outline-none focus:border-brand-violet focus:ring-1 focus:ring-brand-violet text-charcoal-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-charcoal-900 uppercase tracking-wider mb-1.5">
                        Preferred Time Slot
                      </label>
                      <div className="relative">
                        <Clock className="w-4 h-4 text-charcoal-800/50 absolute left-3.5 top-3.5" />
                        <select
                          name="timeSlot"
                          value={formData.timeSlot}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2.5 bg-cream-100/80 border border-brand-violet/20 rounded-xl text-sm focus:outline-none focus:border-brand-violet focus:ring-1 focus:ring-brand-violet text-charcoal-900"
                        >
                          <option>Morning (10:30 AM - 1:00 PM)</option>
                          <option>Afternoon (1:30 PM - 4:30 PM)</option>
                          <option>Evening (4:30 PM - 7:30 PM)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal-900 uppercase tracking-wider mb-1.5">
                      Specific Skin/Hair Concerns (Optional)
                    </label>
                    <textarea
                      name="concerns"
                      rows={2}
                      value={formData.concerns}
                      onChange={handleChange}
                      placeholder="e.g. Mild pigmentation, want review before upcoming wedding"
                      className="w-full px-4 py-2.5 bg-cream-100/80 border border-brand-violet/20 rounded-xl text-sm focus:outline-none focus:border-brand-violet focus:ring-1 focus:ring-brand-violet text-charcoal-900 resize-none"
                    ></textarea>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={handleWhatsAppBooking}
                      className="flex-1 px-6 py-3.5 rounded-xl bg-brand-plum text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2.5 hover:bg-brand-plum-hover active:scale-[0.99] transition-all shadow-md shadow-brand-plum/20"
                    >
                      <MessageSquare className="w-4 h-4 text-brand-rose" />
                      <span>Instant WhatsApp Booking</span>
                    </button>

                    <button
                      type="submit"
                      className="px-6 py-3.5 rounded-xl bg-brand-coral-light text-brand-coral font-bold text-xs tracking-wider uppercase hover:bg-brand-coral/20 active:scale-[0.99] transition-all border border-brand-coral/30"
                    >
                      Request Callback
                    </button>
                  </div>

                  <p className="text-center text-[11px] text-charcoal-800/70 pt-1">
                    Direct clinical inquiries: Call <a href={`tel:${clinicInfo.contact.phone}`} className="underline font-bold text-brand-plum">{clinicInfo.contact.phone}</a>. We respect patient confidentiality.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
