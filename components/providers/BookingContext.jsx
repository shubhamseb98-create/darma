"use client";

import { createContext, useContext, useState } from "react";
import BookingModal from "../ui/BookingModal";

const BookingContext = createContext({
  isOpen: false,
  openBooking: () => {},
  closeBooking: () => {},
  selectedTreatment: "",
});

export function BookingProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState("");

  const openBooking = (treatmentSlug = "") => {
    setSelectedTreatment(treatmentSlug);
    setIsOpen(true);
  };

  const closeBooking = () => {
    setIsOpen(false);
  };

  return (
    <BookingContext.Provider
      value={{ isOpen, openBooking, closeBooking, selectedTreatment }}
    >
      {children}
      <BookingModal
        isOpen={isOpen}
        onClose={closeBooking}
        initialTreatment={selectedTreatment}
      />
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}
