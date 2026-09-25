"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Sparkles, Phone, MessageSquare, Menu, X, ChevronDown } from "lucide-react";
import { treatments } from "../../data/treatments";
import { clinicInfo } from "../../data/clinicInfo";
import { useBooking } from "../providers/BookingContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileAccordion, setMobileAccordion] = useState(null);
  const { openBooking } = useBooking();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter treatments for dropdowns
  const skinTreatments = [
    { name: "Mesotherapy", slug: "mesotherapy", tag: "Cellular Nutrition" },
    { name: "Hydra Facial", slug: "hydra-facial", tag: "Most Popular" },
    { name: "Medi Facial", slug: "medi-facial", tag: "Doctor Formulated" },
    { name: "Party Pop Facial", slug: "party-pop-facial", tag: "Instant Glow" },
    { name: "Photo Facial", slug: "photo-facial", tag: "Skin Clarity" },
    { name: "Laser Toning", slug: "laser-toning", tag: "Clinical Standard" },
    { name: "Under-Eye Dark Circle", slug: "under-eye-dark-circle", tag: "Eye Care" },
    { name: "TD Glowtech 360°", slug: "td-glowtech-360", tag: "Exclusive in India" },
    { name: "Dermapen 4™", slug: "dermapen-4", tag: "World Leader" }
  ];

  const hairTreatments = [
    { name: "Laser Hair Reduction", slug: "laser-hair-reduction", tag: "Gold Standard" },
    { name: "Hair Rejuvenation (GFC)", slug: "hair-rejuvenation", tag: "Trichology Specialist" },
    { name: "Hair Transplant", slug: "hair-transplant", tag: "FUE Precision" },
    { name: "Hair Detox Therapy", slug: "hair-detox-therapy", tag: "Scalp Health" }
  ];

  const laserTreatments = [
    { name: "Laser Toning (Q-Switch)", slug: "laser-toning", tag: "Hollywood Carbon" },
    { name: "Laser Hair Reduction", slug: "laser-hair-reduction", tag: "Triple-Wavelength" }
  ];

  const toggleMobileAccordion = (menu) => {
    setMobileAccordion(mobileAccordion === menu ? null : menu);
  };

  const handleScrollTo = (e, sectionId) => {
    if (typeof window !== "undefined") {
      const el = document.getElementById(sectionId);
      if (el) {
        e.preventDefault();
        const navOffset = 88;
        const rect = el.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        window.scrollTo({
          top: rect.top + scrollTop - navOffset,
          behavior: "smooth"
        });
      }       
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "glass-header py-2 shadow-lg border-b border-brand-violet/20"
          : "bg-white/95 backdrop-blur-md py-3 border-b border-brand-violet/15"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Official Logo */}
        <Link href="/" className="group flex items-center gap-2.5 shrink-0">
          <div className={`relative transition-all duration-300 flex items-center ${isScrolled ? "h-11 sm:h-12" : "h-12 sm:h-14"}`}>
            <img
              src="/logo.png"
              alt="Aeterna Dermatology"
              className="h-full w-auto object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden xl:flex items-center gap-6 text-[13px] font-bold text-charcoal-800">
          {/* Home */}
          <Link
            href="/"
            className="py-1 text-charcoal-950 hover:text-brand-coral transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:scale-x-0 hover:after:scale-x-100 after:h-0.5 after:bg-brand-coral after:transition-transform after:duration-300 after:origin-left"
          >
            Home
          </Link>

          {/* About Us */}
          <a
            href="#doctor"
            onClick={(e) => handleScrollTo(e, "doctor")}
            className="py-1 hover:text-brand-coral transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:scale-x-0 hover:after:scale-x-100 after:h-0.5 after:bg-brand-coral after:transition-transform after:duration-300 after:origin-left"
          >
            About us
          </a>

          {/* Skin Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("skin")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 py-1 hover:text-brand-coral transition-colors">
              <span>Skin</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === "skin" ? "rotate-180 text-brand-coral" : "text-charcoal-500"}`} />
            </button>

            {activeDropdown === "skin" && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-72 bg-white rounded-2xl shadow-2xl border border-brand-violet/20 p-2.5 grid grid-cols-1 gap-1 animate-fade-in z-50">
                <div className="px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase text-brand-coral border-b border-brand-violet/10">
                  Skin Rejuvenating Procedures
                </div>
                {skinTreatments.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/treatments/${item.slug}`}
                    className="p-2 rounded-xl hover:bg-brand-violet-light transition-colors group flex items-center justify-between"
                  >
                    <span className="text-xs font-bold text-charcoal-900 group-hover:text-brand-plum">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-brand-coral bg-brand-coral/10 px-2 py-0.5 rounded-full font-medium">
                      {item.tag}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Hair Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("hair")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 py-1 hover:text-brand-coral transition-colors">
              <span>Hair</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === "hair" ? "rotate-180 text-brand-coral" : "text-charcoal-500"}`} />
            </button>

            {activeDropdown === "hair" && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-72 bg-white rounded-2xl shadow-2xl border border-brand-violet/20 p-2.5 grid grid-cols-1 gap-1 animate-fade-in z-50">
                <div className="px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase text-brand-coral border-b border-brand-violet/10">
                  Hair & Scalp Solutions
                </div>
                {hairTreatments.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/treatments/${item.slug}`}
                    className="p-2 rounded-xl hover:bg-brand-violet-light transition-colors group flex items-center justify-between"
                  >
                    <span className="text-xs font-bold text-charcoal-900 group-hover:text-brand-plum">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-brand-violet bg-brand-violet-light px-2 py-0.5 rounded-full font-medium">
                      {item.tag}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Fat Loss */}
          <Link
            href="/treatments/fat-loss"
            className="py-1 hover:text-brand-coral transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:scale-x-0 hover:after:scale-x-100 after:h-0.5 after:bg-brand-coral after:transition-transform after:duration-300 after:origin-left"
          >
            Fat Loss
          </Link>

          {/* Laser Treatment Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("laser")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 py-1 hover:text-brand-coral transition-colors">
              <span>Laser Treatment</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === "laser" ? "rotate-180 text-brand-coral" : "text-charcoal-500"}`} />
            </button>

            {activeDropdown === "laser" && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-white rounded-2xl shadow-2xl border border-brand-violet/20 p-2.5 grid grid-cols-1 gap-1 animate-fade-in z-50">
                <div className="px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase text-brand-coral border-b border-brand-violet/10">
                  Certified Laser Protocols
                </div>
                {laserTreatments.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/treatments/${item.slug}`}
                    className="p-2 rounded-xl hover:bg-brand-violet-light transition-colors group flex items-center justify-between"
                  >
                    <span className="text-xs font-bold text-charcoal-900 group-hover:text-brand-plum">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-brand-coral bg-brand-coral/10 px-2 py-0.5 rounded-full font-medium">
                      {item.tag}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Reviews */}
          <a
            href="#testimonials"
            onClick={(e) => handleScrollTo(e, "testimonials")}
            className="py-1 hover:text-brand-coral transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:scale-x-0 hover:after:scale-x-100 after:h-0.5 after:bg-brand-coral after:transition-transform after:duration-300 after:origin-left"
          >
            Reviews
          </a>
        </nav>

        {/* Right Action Section */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Official Phone Direct Dial */}
          <a
            href={`tel:${clinicInfo.contact.phone}`}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-charcoal-800 hover:text-brand-coral transition-colors rounded-full bg-cream-100/60 border border-brand-violet/15"
          >
            <Phone className="w-3.5 h-3.5 text-brand-coral" />
            <span>{clinicInfo.contact.phone}</span>
          </a>

          {/* WhatsApp Direct Chat */}
          <a
            href={`https://wa.me/${clinicInfo.contact.whatsapp}?text=${encodeURIComponent("Hello Truly Derma, I would like to book an appointment.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-brand-coral/10 hover:bg-brand-coral/20 text-brand-coral transition-colors border border-brand-coral/30 shadow-sm"
            title="Chat on WhatsApp"
            aria-label="WhatsApp Contact"
          >
            <MessageSquare className="w-4 h-4" />
          </a>

          {/* Book Appointment CTA Button */}
          <button
            onClick={() => openBooking()}
            className="px-5 py-2.5 rounded-full bg-brand-plum text-white text-xs font-black tracking-wider uppercase hover:bg-brand-plum-hover active:scale-95 transition-all shadow-md shadow-brand-plum/20 flex items-center gap-2 border border-brand-violet/40 hover:border-brand-coral"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-rose" />
            <span>BOOK APPOINTMENT</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex xl:hidden items-center gap-2">
          <button
            onClick={() => openBooking()}
            className="px-3 py-1.5 rounded-full bg-brand-plum text-white text-[11px] font-bold tracking-wider uppercase sm:hidden"
          >
            Book
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-charcoal-900 hover:bg-brand-violet-light transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu with Full Accordion Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-brand-violet/20 px-6 py-6 shadow-2xl animate-fade-in space-y-4 max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col space-y-1 text-sm font-bold text-charcoal-950">
            {/* Home */}
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 border-b border-cream-200 flex items-center justify-between"
            >
              <span>Home</span>
            </Link>

            {/* About us */}
            <a
              href="#doctor"
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleScrollTo(e, "doctor");
              }}
              className="py-2.5 border-b border-cream-200 flex items-center justify-between"
            >
              <span>About us</span>
            </a>

            {/* Skin Accordion */}
            <div className="border-b border-cream-200 py-1">
              <button
                onClick={() => toggleMobileAccordion("skin")}
                className="w-full py-2 flex items-center justify-between text-left"
              >
                <span>Skin Treatments</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion === "skin" ? "rotate-180 text-brand-coral" : ""}`} />
              </button>
              {mobileAccordion === "skin" && (
                <div className="pl-3 pb-2 space-y-1.5 pt-1">
                  {skinTreatments.map((t) => (
                    <Link
                      key={t.slug}
                      href={`/treatments/${t.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-1.5 text-xs text-charcoal-700 hover:text-brand-plum font-medium"
                    >
                      • {t.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Hair Accordion */}
            <div className="border-b border-cream-200 py-1">
              <button
                onClick={() => toggleMobileAccordion("hair")}
                className="w-full py-2 flex items-center justify-between text-left"
              >
                <span>Hair Treatments</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion === "hair" ? "rotate-180 text-brand-coral" : ""}`} />
              </button>
              {mobileAccordion === "hair" && (
                <div className="pl-3 pb-2 space-y-1.5 pt-1">
                  {hairTreatments.map((t) => (
                    <Link
                      key={t.slug}
                      href={`/treatments/${t.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-1.5 text-xs text-charcoal-700 hover:text-brand-plum font-medium"
                    >
                      • {t.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Fat Loss */}
            <Link
              href="/treatments/fat-loss"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 border-b border-cream-200 flex items-center justify-between"
            >
              <span>Fat Loss</span>
            </Link>

            {/* Laser Treatment Accordion */}
            <div className="border-b border-cream-200 py-1">
              <button
                onClick={() => toggleMobileAccordion("laser")}
                className="w-full py-2 flex items-center justify-between text-left"
              >
                <span>Laser Treatment</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion === "laser" ? "rotate-180 text-brand-coral" : ""}`} />
              </button>
              {mobileAccordion === "laser" && (
                <div className="pl-3 pb-2 space-y-1.5 pt-1">
                  {laserTreatments.map((t) => (
                    <Link
                      key={t.slug}
                      href={`/treatments/${t.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-1.5 text-xs text-charcoal-700 hover:text-brand-plum font-medium"
                    >
                      • {t.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Reviews */}
            <a
              href="#testimonials"
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleScrollTo(e, "testimonials");
              }}
              className="py-2.5 border-b border-cream-200 flex items-center justify-between"
            >
              <span>Reviews & Outcomes</span>
            </a>
          </div>

          {/* Quick Contact & Action Buttons */}
          <div className="pt-3 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openBooking();
              }}
              className="w-full py-3.5 rounded-full bg-brand-plum text-white text-xs font-bold tracking-wider uppercase text-center shadow-md flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-brand-rose" />
              <span>BOOK APPOINTMENT</span>
            </button>
            <a
              href={`https://wa.me/${clinicInfo.contact.whatsapp}?text=${encodeURIComponent("Hello Truly Derma, I would like to book an appointment.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-full bg-brand-coral/10 text-brand-coral text-xs font-bold tracking-wider uppercase text-center flex items-center justify-center gap-2 border border-brand-coral/30"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp Clinic Desk
            </a>
            <a
              href={`tel:${clinicInfo.contact.phone}`}
              className="text-center text-xs font-bold text-charcoal-800 py-1"
            >
              Direct Call: {clinicInfo.contact.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
