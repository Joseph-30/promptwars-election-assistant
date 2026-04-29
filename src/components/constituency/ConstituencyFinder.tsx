"use client";

import React, { useState } from "react";
import { constituencyByDistrict, type ConstituencyInfo } from "@/data/mockData";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

type PincodeApiResponse = {
  Status: string;
  PostOffice: { District: string; State: string; Name: string }[] | null;
}[];

function Bar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}

export function ConstituencyFinder() {
  const { t } = useLanguage();
  const [pincode, setPincode]   = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [location, setLocation] = useState<{ district: string; state: string; postOffice: string } | null>(null);
  const [info, setInfo]         = useState<ConstituencyInfo | null>(null);

  const handleSearch = async () => {
    if (!/^\d{6}$/.test(pincode)) { setError("Please enter a valid 6-digit pincode."); return; }
    setLoading(true); setError(""); setLocation(null); setInfo(null);

    try {
      const res  = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data: PincodeApiResponse = await res.json();

      if (data[0].Status !== "Success" || !data[0].PostOffice?.length) {
        setError("Pincode not found. Please try a different one.");
        setLoading(false);
        return;
      }

      const po       = data[0].PostOffice[0];
      const district = po.District;
      const state    = po.State;

      setLocation({ district, state, postOffice: po.Name });

      // Try exact district match first, then partial match
      const exact   = constituencyByDistrict[district];
      const partial = !exact
        ? Object.entries(constituencyByDistrict).find(([k]) =>
            district.toLowerCase().includes(k.toLowerCase()) ||
            k.toLowerCase().includes(district.toLowerCase())
          )?.[1]
        : null;

      setInfo(exact ?? partial ?? null);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const totalVotes = info ? info.votes2024 + info.runnerVotes : 0;
  const winnerPct  = totalVotes > 0 ? Math.round((info!.votes2024 / totalVotes) * 100) : 0;
  const runnerPct  = 100 - winnerPct;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2 font-bold tracking-widest uppercase">
          <span className="material-symbols-outlined text-sm">place</span>
          Constituency Finder
        </div>
        <h1 className="font-h1 text-h1 text-primary mb-2">{t.findYourConstituency}</h1>
        <p className="text-on-surface-variant text-sm max-w-2xl leading-relaxed">
          Enter your pincode to discover your Lok Sabha constituency, your elected Member of Parliament, and the 2024 General Election results for your area.
        </p>
      </div>

      {/* Search Box */}
      <div className="bg-white rounded-2xl shadow-quiz-card border border-slate-100 p-6 mb-6">
        <label className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-3 block">
          {t.enterPincode}
        </label>
        <div className="flex gap-3">
          <input
            id="pincode-input"
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="e.g. 110001"
            value={pincode}
            onChange={(e) => { setPincode(e.target.value.replace(/\D/g, "")); setError(""); }}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1 h-12 px-4 border-2 border-slate-200 rounded-xl text-lg font-mono focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
          <button
            id="pincode-search-btn"
            onClick={handleSearch}
            disabled={loading || pincode.length !== 6}
            className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-lg shadow-primary/20 whitespace-nowrap"
          >
            {loading ? (
              <span className="material-symbols-outlined animate-spin text-base">progress_activity</span>
            ) : (
              <span className="material-symbols-outlined text-base">search</span>
            )}
            {t.search}
          </button>
        </div>
        {error && (
          <p className="mt-3 text-sm text-red-500 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm">error</span>
            {error}
          </p>
        )}

        {/* Quick pincode examples */}
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="text-xs text-slate-400 font-medium mr-1">Try:</span>
          {[
            { label: "New Delhi", code: "110001" },
            { label: "Mumbai",    code: "400001" },
            { label: "Bangalore", code: "560001" },
            { label: "Chennai",   code: "600001" },
            { label: "Kolkata",   code: "700001" },
            { label: "Hyderabad", code: "500001" },
          ].map(({ label, code }) => (
            <button
              key={code}
              onClick={() => { setPincode(code); setError(""); }}
              className="text-xs px-3 py-1 rounded-full border border-slate-200 text-slate-600 hover:border-primary hover:text-primary transition-colors font-medium"
            >
              {label} ({code})
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <AnimatePresence>
        {location && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-5"
          >
            {/* Location Resolved */}
            <div className="bg-white rounded-2xl shadow-quiz-card border border-slate-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary">pin_drop</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Pincode {pincode}</p>
                  <p className="font-semibold text-primary">{location.postOffice}, {location.district}, {location.state}</p>
                </div>
              </div>

              {info ? (
                <>
                  {/* Constituency + MP */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{t.yourConstituency}</p>
                      <p className="text-xl font-bold text-primary">{info.constituency}</p>
                      <span className="inline-block mt-1 text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: "#334155" }}>
                        {info.type}
                      </span>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{t.yourRepresentative}</p>
                      <p className="text-xl font-bold text-primary">{info.mp}</p>
                      <span
                        className="inline-block mt-1 text-xs font-bold px-2 py-0.5 rounded-full text-white"
                        style={{ backgroundColor: info.partyColor }}
                      >
                        {info.party}
                      </span>
                    </div>
                  </div>

                  {/* 2024 Results */}
                  {info.votes2024 > 0 && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">{t.electionResults}</p>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-semibold text-primary">{info.mp} <span className="text-xs text-slate-400">({info.party})</span></span>
                            <span className="font-bold text-secondary">{winnerPct}% · {(info.votes2024 / 1000).toFixed(0)}k votes</span>
                          </div>
                          <Bar pct={winnerPct} color={info.partyColor} />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium text-slate-600">{info.runnerUp} <span className="text-xs text-slate-400">({info.runnerParty})</span></span>
                            <span className="font-medium text-slate-500">{runnerPct}% · {(info.runnerVotes / 1000).toFixed(0)}k votes</span>
                          </div>
                          <Bar pct={runnerPct} color="#94a3b8" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Wikipedia Link */}
                  <a
                    href={`https://en.wikipedia.org/wiki/${info.wikiSlug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 flex items-center gap-2 text-sm text-primary hover:underline font-semibold"
                  >
                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                    Full constituency details on Wikipedia
                  </a>
                </>
              ) : (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 flex items-start gap-2">
                  <span className="material-symbols-outlined text-amber-500 shrink-0">info</span>
                  <span>
                    We found your location — <strong>{location.district}, {location.state}</strong> — but don&apos;t yet have detailed constituency data for this district. You can look up your constituency on the{" "}
                    <a href="https://electoralsearch.eci.gov.in/" target="_blank" rel="noopener noreferrer" className="underline font-bold">ECI Voter Portal</a>.
                  </span>
                </div>
              )}
            </div>

            {/* Important Links */}
            <div className="bg-white rounded-2xl shadow-quiz-card border border-slate-100 p-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Official Resources</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: "how_to_reg", label: "Check Voter Registration",   url: "https://electoralsearch.eci.gov.in/" },
                  { icon: "place",      label: "Find Your Polling Booth",     url: "https://boothapp.eci.gov.in/" },
                  { icon: "account_balance", label: "ECI Official Website",  url: "https://www.eci.gov.in/" },
                  { icon: "smartphone", label: "Voter Helpline (1950)",       url: "tel:1950" },
                ].map(({ icon, label, url }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 hover:border-primary/30 transition-all group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/5 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                      <span className="material-symbols-outlined text-primary text-base">{icon}</span>
                    </div>
                    <span className="text-sm font-medium text-slate-700 group-hover:text-primary transition-colors">{label}</span>
                    <span className="material-symbols-outlined text-slate-300 text-sm ml-auto">arrow_forward</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state */}
      {!location && !loading && (
        <div className="text-center py-16 text-slate-400">
          <span className="material-symbols-outlined text-5xl mb-3 block" style={{ fontVariationSettings: "'FILL' 0" }}>map</span>
          <p className="font-medium text-sm">Enter your pincode above to discover your constituency</p>
        </div>
      )}
    </div>
  );
}
