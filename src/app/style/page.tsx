import React from "react";
import type { Metadata } from "next";
import { StylePreview } from "./style-preview";

export const metadata: Metadata = {
  title: "Design System & Style Review — Hoskey Production",
  description: "Living design system and token validation for Hoskey Production.",
};

export default function StyleGuidePage() {
  return <StylePreview />;
}
