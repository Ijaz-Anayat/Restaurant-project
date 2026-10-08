"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { reservationSchema, reservationTimes, type ReservationValues } from "@/lib/validations";
import { easeOut, todayISO } from "@/lib/utils";

const fieldClass =
  "h-12 w-full rounded-2xl border border-hero-deep/20 bg-hero-white px-4 text-hero-tagline outline-none";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.22em] text-muted">{label}</span>
      {children}
      {error ? (
        <span role="alert" className="mt-2 block text-sm text-hero-accent">
          {error}
        </span>
      ) : null}
    </label>
  );
}

export function ReservationForm() {
  const [success, setSuccess] = useState<ReservationValues | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReservationValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      name: "",
      phone: "",
      date: "",
      time: "",
      guests: 2,
      notes: "",
    },
  });

  async function onSubmit(values: ReservationValues) {
    await new Promise((resolve) => window.setTimeout(resolve, 900));
    setSuccess(values);
    reset({ ...values, notes: "" });
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: easeOut }}
        className="rounded-[24px] border border-hero-deep/15 px-6 py-10 md:px-10"
        role="status"
      >
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-cream text-cream">
          <Check size={18} />
        </span>
        <h3 className="mt-6 font-display text-4xl text-cream">The table is held.</h3>
        <p className="mt-4 max-w-md text-muted">
          {success.name}, party of {success.guests}, {success.date} at {success.time}. This demo stores nothing and sends no message.
        </p>
        <button
          type="button"
          className="mt-8 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-hero-accent"
          onClick={() => setSuccess(null)}
        >
          Make another request
        </button>
      </motion.div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="grid gap-8">
      <div className="grid gap-8 md:grid-cols-2">
        <Field label="Name" error={errors.name?.message}>
          <input className={fieldClass} autoComplete="name" {...register("name")} />
        </Field>
        <Field label="Phone" error={errors.phone?.message}>
          <input className={fieldClass} autoComplete="tel" inputMode="tel" {...register("phone")} />
        </Field>
        <Field label="Date" error={errors.date?.message}>
          <input className={fieldClass} type="date" min={todayISO()} {...register("date")} />
        </Field>
        <Field label="Time" error={errors.time?.message}>
          <select className={fieldClass} {...register("time")}>
            <option value="" disabled>
              Select
            </option>
            {reservationTimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Guests" error={errors.guests?.message}>
          <select className={fieldClass} {...register("guests", { valueAsNumber: true })}>
            {Array.from({ length: 12 }, (_, index) => index + 1).map((count) => (
              <option key={count} value={count}>
                {count}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="Notes" error={errors.notes?.message}>
        <textarea className={`${fieldClass} min-h-24 resize-y`} {...register("notes")} />
      </Field>
      <div className="flex flex-col items-start gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          data-cursor="hover"
          className="h-12 rounded-full bg-hero-deep px-8 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-hero-white disabled:opacity-60"
        >
          {isSubmitting ? "Holding the table" : "Request a table"}
        </button>
        <p className="text-sm text-muted">A confirmation plays on screen. Nothing is sent.</p>
      </div>
    </form>
  );
}
