"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    city: "",
    state: "",
    inquiryType: "general", // 'general' | 'dealer'
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source: "contact_page",
        }),
      });

      const data = await res.json();
      if (data.success) {
        setFormSubmitted(true);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          companyName: "",
          city: "",
          state: "",
          inquiryType: "general",
          message: "",
        });
      } else {
        alert(data.error || "Inquiry submission failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Error sending inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen text-brand-charcoal">
      {/* Page Header */}
      <section className="bg-brand-deep py-20 px-6 text-center text-white relative">
        <div className="max-w-4xl mx-auto z-10 relative">
          <h1 className="text-3xl font-normal sm:text-4xl uppercase tracking-wide font-zen">Contact Us</h1>
          <p className="text-stone-300 text-sm mt-4 max-w-md mx-auto">
            Get in touch with Arka Crete Supplements LLP. We look forward to partnering with you.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid gap-12 lg:grid-cols-3">
        {/* Left Col - Address details */}
        <div className="space-y-8 lg:col-span-1">
          {/* Main Info */}
          <div className="bg-white rounded-2xl border border-stone-200/60 p-8 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-brand-deep border-b border-stone-100 pb-3">
              Corporate Contacts
            </h3>
            <div className="space-y-4">
              <a href="tel:+919030024111" className="flex items-center gap-3 text-xs hover:text-brand-orange">
                <span className="p-2 bg-brand-orange/10 text-brand-orange rounded-lg">
                  <Phone className="w-4 h-4" />
                </span>
                <div>
                  <span className="text-stone-400 block font-mono text-[9px] uppercase">Direct Call</span>
                  <span className="font-bold">+91 9030024111</span>
                </div>
              </a>
              <a href="mailto:info@arkacrete.com" className="flex items-center gap-3 text-xs hover:text-brand-orange">
                <span className="p-2 bg-brand-orange/10 text-brand-orange rounded-lg">
                  <Mail className="w-4 h-4" />
                </span>
                <div>
                  <span className="text-stone-400 block font-mono text-[9px] uppercase">Email Inquiries</span>
                  <span className="font-bold">info@arkacrete.com</span>
                </div>
              </a>
              <a href="https://wa.me/919030024111" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-xs text-emerald-600 hover:text-emerald-700">
                <span className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg">
                  <MessageCircle className="w-4 h-4" />
                </span>
                <div>
                  <span className="text-emerald-500/80 block font-mono text-[9px] uppercase">WhatsApp</span>
                  <span className="font-bold">Chat with Sales</span>
                </div>
              </a>
            </div>
          </div>

          {/* Registered Office */}
          <div className="bg-white rounded-2xl border border-stone-200/60 p-8 shadow-sm space-y-3">
            <span className="inline-block bg-brand-orange/10 text-brand-orange text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded">
              Corporate Office
            </span>
            <h4 className="text-sm font-bold text-brand-deep pt-1">Registered Address</h4>
            <p className="text-stone-500 text-xs leading-relaxed flex gap-2">
              <MapPin className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
              <span>
                H NO 5-4-159, PLOT NO 26,<br />
                KAMALA NAGAR, VANASTHALI PURAM,<br />
                Hyderabad, Telangana - 500070
              </span>
            </p>
          </div>

          {/* Manufacturing Unit */}
          <div className="bg-white rounded-2xl border border-stone-200/60 p-8 shadow-sm space-y-3">
            <span className="inline-block bg-brand-orange/10 text-brand-orange text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded">
              Factory Unit
            </span>
            <h4 className="text-sm font-bold text-brand-deep pt-1">Manufacturing Address</h4>
            <p className="text-stone-500 text-xs leading-relaxed flex gap-2">
              <MapPin className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
              <span>
                Plot No - 96, TIF MSME Green Industrial Park,<br />
                Dandu Malkapur, Choutuppal,<br />
                Yadadri Bhuvanagiri - 58252
              </span>
            </p>
          </div>
        </div>

        {/* Right Col - Inquiry Form & Map embeds */}
        <div className="lg:col-span-2 space-y-8">
          {/* Contact form Card */}
          <div id="inquiry-form" className="bg-white rounded-2xl border border-stone-200/60 p-8 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-brand-deep flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-brand-orange" />
              Corporate Inquiry Form
            </h3>

            {formSubmitted ? (
              <div className="p-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 text-xs text-center space-y-2">
                <p className="font-bold">Inquiry Sent Successfully!</p>
                <p className="opacity-95">Our construction chemicals sales executive will follow up with you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="inquiryType" className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">Inquiry Type</label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    className="w-full text-xs px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:border-brand-orange/50 focus:outline-none"
                  >
                    <option value="general">General Corporate Inquiry</option>
                    <option value="dealer">Become a Dealer / Distributor</option>
                    <option value="custom">Custom Chemical Formulation</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="fullName" className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full text-xs px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:border-brand-orange/50 focus:outline-none"
                    placeholder="E.g. Rajesh Kumar"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">Email ID</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full text-xs px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:border-brand-orange/50 focus:outline-none"
                    placeholder="rajesh@domain.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full text-xs px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:border-brand-orange/50 focus:outline-none"
                    placeholder="+91 9876543210"
                  />
                </div>
                <div>
                  <label htmlFor="companyName" className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">Company Name</label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="w-full text-xs px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:border-brand-orange/50 focus:outline-none"
                    placeholder="Construction Ltd."
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full text-xs px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:border-brand-orange/50 focus:outline-none"
                    placeholder="Hyderabad"
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">State</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full text-xs px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:border-brand-orange/50 focus:outline-none"
                    placeholder="Telangana"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">Message vision</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full text-xs px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:border-brand-orange/50 focus:outline-none"
                    placeholder="Tell us about your structural requirements..."
                  />
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex h-12 items-center justify-center rounded-lg bg-brand-orange text-xs font-bold uppercase tracking-wider text-white hover:bg-brand-orange/90 transition-colors shadow-md shadow-brand-orange/10 disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Submit Inquiry"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
