"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_GENERAL } from "@/lib/constants";

export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_GENERAL}
      target="_blank"
      rel="noreferrer"
      className="fixed right-4 bottom-20 z-30 inline-flex items-center gap-2 rounded-full bg-[#1f6b45] px-4 py-3 text-sm text-white shadow-lg lg:bottom-5"
      aria-label="WhatsApp African Home Adventure Safaris"
    >
      <MessageCircle className="h-4 w-4" aria-hidden="true" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
