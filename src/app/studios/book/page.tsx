import React, { Suspense } from "react";
import type { Metadata } from "next";
import { BookingWizard } from "@/components/booking";
import StudiosBookLoading from "./loading";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: "Book a Studio Session — Demes shr Studios | Hoskey Production",
  description:
    "Reserve podcast suites, audio recording booths, and creative co-working spaces in Ghana. Transparent hourly and day rates with instant WhatsApp confirmation.",
  alternates: {
    canonical: "/studios/book",
  },
  openGraph: {
    title: "Book a Studio Session — Demes shr Studios",
    description:
      "Select your space, date, and duration. Reserve podcast rooms, vocal isolation booths, and workstations.",
    url: `${SITE.url}/studios/book`,
    type: "website",
  },
};

export default function StudiosBookPage() {
  return (
    <Suspense fallback={<StudiosBookLoading />}>
      <BookingWizard />
    </Suspense>
  );
}
