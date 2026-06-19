import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | ARKA CRETE SUPPLEMENTS LLP",
  description: "Read the privacy policy of ARKA CRETE construction chemical manufacturer.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-stone-50 min-h-screen text-brand-charcoal py-16 px-6">
      <div className="max-w-3xl mx-auto bg-white border border-stone-200 rounded-2xl p-8 md:p-12 shadow-sm space-y-6">
        <h1 className="text-3xl font-extrabold text-brand-deep border-b border-stone-100 pb-4">Privacy Policy</h1>
        <p className="text-xs text-stone-400">Effective Date: June 18, 2026</p>
        
        <p className="text-stone-600 text-sm leading-relaxed">
          Welcome to ARKA CRETE Supplements LLP. We are committed to protecting your personal information and your right to privacy. This privacy policy describes how we collect, use, and share information when you visit our website or submit corporate inquiries.
        </p>

        <h3 className="text-lg font-bold text-brand-deep">1. Information We Collect</h3>
        <p className="text-stone-600 text-sm leading-relaxed">
          We collect personal information that you voluntarily provide to us when you submit forms on our website. This includes name, email address, mobile number, company name, city, and state.
        </p>

        <h3 className="text-lg font-bold text-brand-deep">2. How We Use Your Information</h3>
        <p className="text-stone-600 text-sm leading-relaxed">
          We use the collected information to process and respond to your product inquiries, manage callback requests, configure custom chemical formulations, and communicate with you about your projects.
        </p>

        <h3 className="text-lg font-bold text-brand-deep">3. Sharing of Information</h3>
        <p className="text-stone-600 text-sm leading-relaxed">
          We do not sell or trade your personal information to third parties. We may share information with trusted logistics partners to deliver sample packs or product consignments.
        </p>

        <h3 className="text-lg font-bold text-brand-deep">4. Security</h3>
        <p className="text-stone-600 text-sm leading-relaxed">
          We implement a variety of security measures to maintain the safety of your personal information. Database access is secured behind production-ready firewalls and encrypted connections.
        </p>
      </div>
    </div>
  );
}
