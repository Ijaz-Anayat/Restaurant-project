import { z } from "zod";

export const reservationSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a phone number")
    .max(20, "That number looks too long"),
  date: z
    .string()
    .min(1, "Choose a date")
    .refine((value) => {
      const picked = new Date(`${value}T00:00:00`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return picked >= today;
    }, "Choose today or a later date"),
  time: z.string().min(1, "Choose a time"),
  guests: z
    .number()
    .int()
    .min(1, "At least one guest")
    .max(12, "For parties above 12, please call"),
  notes: z.string().trim().max(280, "Keep notes under 280 characters"),
});

export type ReservationValues = z.infer<typeof reservationSchema>;

export const orderNameSchema = z.string().trim().min(2, "Please enter your full name");

export const orderPhoneSchema = z
  .string()
  .trim()
  .regex(/^(?:\+92\d{10}|03\d{2}-?\d{7})$/, "Use 03XX-XXXXXXX or +92XXXXXXXXXX");

export const checkoutSchema = z
  .object({
    name: orderNameSchema,
    phone: orderPhoneSchema,
    type: z.enum(["delivery", "pickup"]),
    address: z.string().trim(),
    area: z.string().trim(),
    time: z.string().min(1, "Choose a time"),
    notes: z.string().trim().max(280, "Keep notes under 280 characters"),
    payment: z.literal("cod"),
  })
  .superRefine((value, ctx) => {
    if (value.type !== "delivery") return;
    if (value.address.length < 6) {
      ctx.addIssue({ code: "custom", path: ["address"], message: "Enter a delivery address" });
    }
    if (!value.area) {
      ctx.addIssue({ code: "custom", path: ["area"], message: "Choose an area" });
    }
  });

export type CheckoutValues = z.infer<typeof checkoutSchema>;

export const quickOrderSchema = z.object({
  name: orderNameSchema,
  phone: orderPhoneSchema,
});

export type QuickOrderValues = z.infer<typeof quickOrderSchema>;

export const reservationTimes = [
  "13:00",
  "13:30",
  "14:00",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
] as const;
