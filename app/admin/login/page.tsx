"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, AlertCircle, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        // Redirect to admin dashboard
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Invalid login credentials.");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected network error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-brand-charcoal flex flex-col justify-center py-12 sm:px-6 lg:px-8 select-none">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="text-3xl font-black tracking-widest text-brand-deep leading-none">
          ARKA<span className="text-brand-orange">CRETE</span>
        </h2>
        <p className="mt-2 text-xs font-bold text-brand-brown tracking-[0.2em] uppercase">
          Administrative Portal
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 border border-stone-200/60 shadow-xl rounded-2xl sm:px-10">
          <form className="space-y-6" onSubmit={handleLoginSubmit}>
            {error && (
              <div className="flex gap-2 p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-xs">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p className="leading-relaxed">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                Administrator Email
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-stone-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:border-brand-orange/50 focus:outline-none"
                  placeholder="admin@arkacrete.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                Secure Password
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-stone-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:border-brand-orange/50 focus:outline-none"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex h-11 items-center justify-center rounded-lg bg-brand-orange text-xs font-bold uppercase tracking-wider text-white hover:bg-brand-orange/90 transition-colors shadow-md shadow-brand-orange/10 disabled:opacity-50"
              >
                {loading ? "Authenticating..." : "Sign In"}
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
