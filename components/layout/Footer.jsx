"use client";

import Link from "next/link";
import { MapPin, Mail, Phone, MessageSquare, ExternalLink } from "lucide-react";
import { clinicInfo } from "../../data/clinicInfo";
import { SlideUp } from "../ui/MotionWrappers";

export default function Footer() {
  return (
    <footer id="contact" className="bg-brand-plum-deep text-cream-100 pt-[60px] pb-[25px] border-t border-brand-violet/20 relative">
      <SlideUp yOffset={25} duration={0.8} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 5-Column Grid matching trulyderma.com */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16 border-b border-white/10">
          
          {/* Column 1: Logo & About & Social Media (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white p-2.5 rounded-2xl inline-block shadow-md">
              <img
                src="/logo.png"
                alt="Aeterna Dermatology"
                className="h-12 w-auto object-contain"
              />
            </div>

            <p className="text-xs text-cream-200/80 leading-relaxed font-normal">
              At Truly Derma, we understand the importance of glowing skin and healthy hair in boosting confidence. Led by renowned Aesthetician Dr. Megha Aggarwal, we deliver certified dermatology and laser treatments tailored just for you.
            </p>

            {/* Social Links */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={clinicInfo.contact.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-coral transition-colors flex items-center justify-center text-white border border-white/15 shadow-sm"
                aria-label="Truly Derma Facebook"
              >
                <span className="font-bold text-sm">f</span>
              </a>
              <a
                href={clinicInfo.contact.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-coral transition-colors flex items-center justify-center text-white border border-white/15 shadow-sm"
                aria-label="Truly Derma Instagram"
              >
                <span className="font-bold text-sm">ig</span>
              </a>
              <a
                href={`https://wa.me/${clinicInfo.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#25D366]/20 hover:bg-[#25D366] transition-colors flex items-center justify-center text-[#25D366] hover:text-white border border-[#25D366]/40 shadow-sm"
                aria-label="Truly Derma WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Popular Procedures (Span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="text-xs font-bold tracking-widest text-brand-rose uppercase font-sans">
              Popular Procedures
            </h5>
            <ul className="space-y-2 text-xs text-cream-200/80 font-normal">
              <li>
                <Link href="/treatments/fat-loss" className="hover:text-brand-rose transition-colors">
                  Fat Loss
                </Link>
              </li>
              <li>
                <Link href="/treatments/laser-hair-reduction" className="hover:text-brand-rose transition-colors">
                  Laser Hair Reduction
                </Link>
              </li>
              <li>
                <Link href="/treatments/laser-toning" className="hover:text-brand-rose transition-colors">
                  Laser Tonning
                </Link>
              </li>
              <li>
                <Link href="/treatments/td-glowtech-360" className="hover:text-brand-rose transition-colors">
                  Anti Aging Solution
                </Link>
              </li>
              <li>
                <Link href="/treatments/hydra-facial" className="hover:text-brand-rose transition-colors">
                  Hydra Facial
                </Link>
              </li>
              <li>
                <Link href="/treatments/photo-facial" className="hover:text-brand-rose transition-colors">
                  Photo Facial
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links (Span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="text-xs font-bold tracking-widest text-brand-rose uppercase font-sans">
              Quick links
            </h5>
            <ul className="space-y-2 text-xs text-cream-200/80 font-normal">
              <li>
                <Link href="/" className="hover:text-brand-rose transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a href="#doctor" className="hover:text-brand-rose transition-colors">
                  About us
                </a>
              </li>
              <li>
                <a href="#results" className="hover:text-brand-rose transition-colors">
                  Case Studies & Results
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-brand-rose transition-colors">
                  Patient Reviews
                </a>
              </li>
              <li>
                <a href="#doctor" className="hover:text-brand-rose transition-colors">
                  Truly Derma Academy
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-brand-rose transition-colors">
                  Contact us
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Lines (Span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="text-xs font-bold tracking-widest text-brand-rose uppercase font-sans">
              Contact
            </h5>
            <ul className="space-y-2.5 text-xs text-cream-200/85 font-normal">
              <li>
                <a
                  href={`mailto:${clinicInfo.contact.email}`}
                  className="hover:text-brand-rose transition-colors flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5 text-brand-coral shrink-0" />
                  <span className="truncate">{clinicInfo.contact.email}</span>
                </a>
              </li>
              {clinicInfo.contact.phoneNumbers.map((phone, idx) => (
                <li key={idx}>
                  <a
                    href={`tel:${phone}`}
                    className="hover:text-brand-rose transition-colors flex items-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5 text-brand-coral shrink-0" />
                    <span>{phone}</span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`https://wa.me/${clinicInfo.contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-rose transition-colors flex items-center gap-2 text-[#25D366]"
                >
                  <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                  <span>{clinicInfo.contact.whatsappDisplay}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Dual Clinic Addresses (Span 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="text-xs font-bold tracking-widest text-brand-rose uppercase font-sans">
              Clinic Addresses
            </h5>
            <div className="space-y-4 text-xs text-cream-200/80 font-normal">
              {clinicInfo.contact.branches.map((branch, idx) => (
                <div key={idx} className="flex items-start gap-2.5 bg-white/[0.04] p-3 rounded-xl border border-white/10">
                  <MapPin className="w-4 h-4 text-brand-coral shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white font-bold block mb-0.5">{branch.city}</strong>
                    <p className="leading-relaxed text-cream-200/75 text-[11px]">{branch.address}</p>
                    <a
                      href={`https://maps.google.com/?q=${branch.mapQuery}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-rose hover:underline inline-flex items-center gap-1 mt-1 text-[10px] font-semibold"
                    >
                      <span>Get Directions</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-200/60">
          <p>© {new Date().getFullYear()} Truly Derma Clinic & Academy. All Rights Reserved.</p>
          <p className="text-cream-200/50 text-[11px]">
            Pitampura & Rajouri Garden, New Delhi • Led by Dr. Megha Aggarwal
          </p>
        </div>
      </SlideUp>
    </footer>
  );
}
