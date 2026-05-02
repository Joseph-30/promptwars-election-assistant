"use client";

import React, { useState, useMemo } from "react";
import { constituencyByDistrict, type ConstituencyInfo } from "@/data/mockData";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { BoothWayfinder } from "@/components/booth/BoothWayfinder";

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

const CANDIDATE_DATA: Record<string, Array<{
  name: string; party: string; partyColor: string; rank: number;
  education: string; assets: string; liabilities: string;
  criminalCases: number; age: number; myneta: string;
}>> = {
  "New Delhi": [
    { name: "Bansuri Swaraj", party: "BJP", partyColor: "#FF6914", rank: 1, education: "Law Graduate", assets: "3.2 Cr", liabilities: "0", criminalCases: 0, age: 44, myneta: "https://myneta.info/ls2024/" },
    { name: "Somnath Bharti", party: "AAP", partyColor: "#00BFFF", rank: 2, education: "MBA + Law", assets: "18.4 Cr", liabilities: "2.1 Cr", criminalCases: 3, age: 51, myneta: "https://myneta.info/ls2024/" },
    { name: "Ajay Dutt", party: "INC", partyColor: "#19AAED", rank: 3, education: "Graduate", assets: "1.1 Cr", liabilities: "0", criminalCases: 0, age: 55, myneta: "https://myneta.info/ls2024/" },
  ],
  "Mumbai North Central": [
    { name: "Ujjwal Nikam", party: "BJP", partyColor: "#FF6914", rank: 1, education: "Law Graduate", assets: "2.8 Cr", liabilities: "0", criminalCases: 0, age: 72, myneta: "https://myneta.info/ls2024/" },
    { name: "Varsha Gaikwad", party: "INC", partyColor: "#19AAED", rank: 2, education: "Post Graduate", assets: "5.2 Cr", liabilities: "0", criminalCases: 0, age: 48, myneta: "https://myneta.info/ls2024/" },
  ],
  "Bangalore South": [
    { name: "Tejasvi Surya", party: "BJP", partyColor: "#FF6914", rank: 1, education: "Law Graduate", assets: "4.3 Cr", liabilities: "0", criminalCases: 0, age: 33, myneta: "https://myneta.info/ls2024/" },
    { name: "Sowmya Reddy", party: "INC", partyColor: "#19AAED", rank: 2, education: "Post Graduate", assets: "3.1 Cr", liabilities: "0.2 Cr", criminalCases: 0, age: 42, myneta: "https://myneta.info/ls2024/" },
  ],
};

function getCandidatesForConstituency(constituency: string) {
  const direct = CANDIDATE_DATA[constituency];
  if (direct) return direct;
  const key = Object.keys(CANDIDATE_DATA).find(k =>
    constituency.toLowerCase().includes(k.toLowerCase()) ||
    k.toLowerCase().includes(constituency.toLowerCase())
  );
  return key ? CANDIDATE_DATA[key] : null;
}

export function ConstituencyFinder() {
  const { t } = useLanguage();
  const [pincode, setPincode]   = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [location, setLocation] = useState<{ district: string; state: string; postOffice: string } | null>(null);
  const [info, setInfo]         = useState<ConstituencyInfo | null>(null);
  const [activeTab, setActiveTab] = useState<"results" | "candidates" | "booth">("results");

  const handleSearch = async () => {
    if (!/^\d{6}$/.test(pincode)) { setError("Please enter a valid 6-digit pincode."); return; }
    setLoading(true); setError(""); setLocation(null); setInfo(null); setActiveTab("results");

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

  const { totalVotes, winnerPct, runnerPct, candidates } = useMemo(() => {
    const tVotes = info ? info.votes2024 + info.runnerVotes : 0;
    const wPct = tVotes > 0 ? Math.round((info!.votes2024 / tVotes) * 100) : 0;
    const rPct = 100 - wPct;
    const cands = info ? getCandidatesForConstituency(info.constituency) : null;
    return { totalVotes: tVotes, winnerPct: wPct, runnerPct: rPct, candidates: cands };
  }, [info]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2 font-bold tracking-widest uppercase">
          <span className="material-symbols-outlined text-sm">place</span>
          Constituency Finder
        </div>
        <h1 className="font-h1 text-h1 text-primary mb-2">{t.findYourConstituency}</h1>
        <p className="text-on-surface-variant text-sm max-w-2xl leading-relaxed">
          Enter your pincode to discover your Lok Sabha constituency, elected MP, 2024 results, candidate affidavit insights, and your polling booth guide.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-quiz-card border border-slate-100 p-6 mb-6">
        <label className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-3 block">{t.enterPincode}</label>
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
            {loading ? <span className="material-symbols-outlined animate-spin text-base">progress_activity</span> : <span className="material-symbols-outlined text-base">search</span>}
            {t.search}
          </button>
        </div>
        {error && <p className="mt-3 text-sm text-red-500 flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">error</span>{error}</p>}
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="text-xs text-slate-400 font-medium mr-1">Try:</span>
          {[{ label: "New Delhi", code: "110001" }, { label: "Mumbai", code: "400001" }, { label: "Bangalore", code: "560001" }, { label: "Chennai", code: "600001" }, { label: "Kolkata", code: "700001" }, { label: "Hyderabad", code: "500001" }].map(({ label, code }) => (
            <button key={code} onClick={() => { setPincode(code); setError(""); }} className="text-xs px-3 py-1 rounded-full border border-slate-200 text-slate-600 hover:border-primary hover:text-primary transition-colors font-medium">
              {label} ({code})
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {location && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-5">
            <div className="bg-white rounded-2xl shadow-quiz-card border border-slate-100 p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary">pin_drop</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Pincode {pincode}</p>
                  <p className="font-semibold text-primary">{location.postOffice}, {location.district}, {location.state}</p>
                </div>
              </div>

              {info && (
                <div className="flex gap-1 p-1 bg-slate-100 rounded-xl mb-5 flex-wrap">
                  {[{ id: "results", label: "Election Results", icon: "bar_chart" }, { id: "candidates", label: "Know Your Candidate", icon: "person_search" }, { id: "booth", label: "Booth Guide", icon: "location_on" }].map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id as typeof activeTab)}
                      className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1 min-w-[100px] ${activeTab === tab.id ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-primary"}`}>
                      <span className="material-symbols-outlined text-sm">{tab.icon}</span>{tab.label}
                    </button>
                  ))}
                </div>
              )}

              {info ? (
                <AnimatePresence mode="wait">
                  {activeTab === "results" && (
                    <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{t.yourConstituency}</p>
                          <p className="text-xl font-bold text-primary">{info.constituency}</p>
                          <span className="inline-block mt-1 text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: "#334155" }}>{info.type}</span>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{t.yourRepresentative}</p>
                          <p className="text-xl font-bold text-primary">{info.mp}</p>
                          <span className="inline-block mt-1 text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: info.partyColor }}>{info.party}</span>
                        </div>
                      </div>
                      {info.votes2024 > 0 && (
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">{t.electionResults}</p>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="font-semibold text-primary">{info.mp} <span className="text-xs text-slate-400">({info.party})</span></span>
                                <span className="font-bold text-secondary">{winnerPct}% · {(info.votes2024/1000).toFixed(0)}k votes</span>
                              </div>
                              <Bar pct={winnerPct} color={info.partyColor} />
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium text-slate-600">{info.runnerUp} <span className="text-xs text-slate-400">({info.runnerParty})</span></span>
                                <span className="font-medium text-slate-500">{runnerPct}% · {(info.runnerVotes/1000).toFixed(0)}k votes</span>
                              </div>
                              <Bar pct={runnerPct} color="#94a3b8" />
                            </div>
                          </div>
                        </div>
                      )}
                      <a href={`https://en.wikipedia.org/wiki/${info.wikiSlug}`} target="_blank" rel="noopener noreferrer" className="mt-5 flex items-center gap-2 text-sm text-primary hover:underline font-semibold">
                        <span className="material-symbols-outlined text-sm">open_in_new</span>Full constituency details on Wikipedia
                      </a>
                    </motion.div>
                  )}

                  {activeTab === "candidates" && (
                    <motion.div key="candidates" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="material-symbols-outlined text-primary">person_search</span>
                        <h3 className="font-bold text-primary">Candidate Affidavit Insights</h3>
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold">ECI Data 2024</span>
                      </div>
                      {candidates ? (
                        <div className="space-y-4">
                          {candidates.map((c) => (
                            <div key={c.name} className={`rounded-xl border p-4 ${c.rank===1?"border-secondary/30 bg-secondary/5":"border-slate-100 bg-white"}`}>
                              <div className="flex items-start justify-between gap-3 mb-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0" style={{ backgroundColor: c.partyColor }}>
                                    {c.name.split(" ").map(n=>n[0]).join("").slice(0,2)}
                                  </div>
                                  <div>
                                    <p className="font-bold text-primary text-sm">{c.name}</p>
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: c.partyColor }}>{c.party}</span>
                                      {c.rank===1 && <span className="text-xs font-bold text-secondary">Elected MP</span>}
                                    </div>
                                  </div>
                                </div>
                                {c.criminalCases>0 && <span className="text-xs font-bold bg-red-50 text-red-600 px-2 py-1 rounded-lg border border-red-100 shrink-0">{c.criminalCases} case{c.criminalCases>1?"s":""}</span>}
                              </div>
                              <div className="grid grid-cols-3 gap-2 text-center text-xs mb-3">
                                <div className="bg-slate-50 rounded-lg p-2"><p className="text-slate-400 mb-0.5">Age</p><p className="font-bold text-primary">{c.age} yrs</p></div>
                                <div className="bg-slate-50 rounded-lg p-2"><p className="text-slate-400 mb-0.5">Assets</p><p className="font-bold text-primary">Rs {c.assets}</p></div>
                                <div className="bg-slate-50 rounded-lg p-2"><p className="text-slate-400 mb-0.5">Education</p><p className="font-bold text-primary text-[10px] leading-tight">{c.education}</p></div>
                              </div>
                              <a href={c.myneta} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline">
                                <span className="material-symbols-outlined text-sm">open_in_new</span>View full affidavit on Myneta.info
                              </a>
                            </div>
                          ))}
                          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800 flex items-start gap-2">
                            <span className="material-symbols-outlined text-amber-600 text-sm shrink-0">info</span>
                            <span>Affidavit data sourced from ECI declarations. Criminal cases are self-declared and do not imply conviction. Assets are self-declared at nomination time.</span>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 flex items-start gap-2">
                            <span className="material-symbols-outlined text-amber-500 shrink-0">info</span>
                            <span>Detailed candidate data for <strong>{info.constituency}</strong> is not yet available locally. View all candidate affidavits on the official Myneta database.</span>
                          </div>
                          <a href="https://myneta.info/ls2024/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-4 bg-white border-2 border-primary/20 rounded-xl hover:border-primary transition-colors">
                            <span className="material-symbols-outlined text-primary">open_in_new</span>
                            <div>
                              <p className="font-semibold text-primary text-sm">Search on Myneta.info</p>
                              <p className="text-xs text-slate-500">Complete candidate affidavit database for all Indian elections</p>
                            </div>
                          </a>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {activeTab === "booth" && (
                    <motion.div key="booth" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <BoothWayfinder district={location.district} state={location.state} />
                    </motion.div>
                  )}
                </AnimatePresence>
              ) : (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 flex items-start gap-2">
                  <span className="material-symbols-outlined text-amber-500 shrink-0">info</span>
                  <span>We found <strong>{location.district}, {location.state}</strong> but do not yet have constituency data. Check the <a href="https://electoralsearch.eci.gov.in/" target="_blank" rel="noopener noreferrer" className="underline font-bold">ECI Voter Portal</a>.</span>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-quiz-card border border-slate-100 p-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Official Resources</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[{ icon: "how_to_reg", label: "Check Voter Registration", url: "https://electoralsearch.eci.gov.in/" }, { icon: "place", label: "Find Your Polling Booth", url: "https://boothapp.eci.gov.in/" }, { icon: "account_balance", label: "ECI Official Website", url: "https://www.eci.gov.in/" }, { icon: "smartphone", label: "Voter Helpline (1950)", url: "tel:1950" }].map(({ icon, label, url }) => (
                  <a key={label} href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 hover:border-primary/30 transition-all group">
                    <div className="w-9 h-9 rounded-lg bg-primary/5 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors"><span className="material-symbols-outlined text-primary text-base">{icon}</span></div>
                    <span className="text-sm font-medium text-slate-700 group-hover:text-primary transition-colors">{label}</span>
                    <span className="material-symbols-outlined text-slate-300 text-sm ml-auto">arrow_forward</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!location && !loading && (
        <div className="text-center py-16 text-slate-400">
          <span className="material-symbols-outlined text-5xl mb-3 block" style={{ fontVariationSettings: "'FILL' 0" }}>map</span>
          <p className="font-medium text-sm">Enter your pincode above to discover your constituency</p>
        </div>
      )}
    </div>
  );
}
