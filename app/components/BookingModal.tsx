"use client";

import { useEffect, useState } from "react";

export const BOOKING_URL = "https://cal.com/kanasani/30-min-with-mani";

export function BookingDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label="Book a 30 minute call"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close"
          aria-label="Close booking calendar"
          onClick={onClose}
        >
          ×
        </button>
        <iframe
          title="Book a 30 minute call with Mani"
          src={`${BOOKING_URL}?embed=true&theme=dark`}
          className="modal-frame"
        />
      </div>
    </div>
  );
}

export default function BookCallButton({
  label = "Book a 30-min call",
  variant = "primary",
}: {
  label?: string;
  variant?: "primary" | "ghost";
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className={`btn btn-${variant}`}
        onClick={() => setOpen(true)}
      >
        {label}
      </button>
      <BookingDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
