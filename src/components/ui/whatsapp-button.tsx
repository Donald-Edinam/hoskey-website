import React from "react";
import { Button, ButtonVariant, ButtonSize } from "./button";
import { getWhatsAppLink, WhatsAppContext } from "@/lib/whatsapp";

export interface WhatsAppButtonProps {
  context?: WhatsAppContext;
  customText?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children?: React.ReactNode;
}

export function WhatsAppButton({
  context = "general",
  customText,
  variant = "primary",
  size = "md",
  className,
  children = "Chat on WhatsApp",
}: WhatsAppButtonProps) {
  const href = getWhatsAppLink(context, customText);

  return (
    <Button
      href={href}
      variant={variant}
      size={size}
      className={className}
      aria-label={`${typeof children === "string" ? children : "WhatsApp"} (opens in new tab)`}
    >
      {children}
    </Button>
  );
}
