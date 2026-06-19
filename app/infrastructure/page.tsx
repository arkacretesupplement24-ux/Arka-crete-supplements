import React from "react";
import Infrastructure from "@/components/Infrastructure";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Infrastructure & Plant | ARKA CRETE SUPPLEMENTS LLP",
  description: "Explore ARKA CRETE's manufacturing unit in TIF MSME Green Industrial Park, Dandu Malkapur, and our testing QA laboratory in Hyderabad.",
};

export default function InfrastructurePage() {
  return (
    <main>
      <Infrastructure />
    </main>
  );
}
