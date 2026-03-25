"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export type TumorClass = {
  icon: LucideIcon;
  title: string;
  description: string;
  severity: "high" | "medium" | "none";
  gradient: string;
  borderColor: string;
  iconColor: string;
  stats: { label: string; value: string }[];
};

const severityConfig = {
  high: { label: "High Severity", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20", dot: "bg-red-400" },
  medium: { label: "Moderate Severity", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20", dot: "bg-amber-400" },
  none: { label: "No Concern", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", dot: "bg-emerald-400" },
};

export default function TumorClassCard({ tumor, index }: { tumor: TumorClass; index: number }) {
  const sev = severityConfig[tumor.severity];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative glass-card card-hover-lift rounded-2xl overflow-hidden flex flex-col h-full"
    >
      {/* Top gradient accent bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${tumor.gradient} flex-shrink-0`} />

      <div className="p-5 sm:p-6 flex flex-col flex-1">
        {/* Header row */}
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl ${tumor.borderColor} border flex items-center justify-center bg-gradient-to-br ${tumor.gradient} group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
            <tumor.icon className={`w-5 h-5 sm:w-5.5 sm:h-5.5 ${tumor.iconColor}`} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors leading-tight truncate">
              {tumor.title}
            </h3>
          </div>
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider ${sev.bg} ${sev.border} border ${sev.color} flex-shrink-0 whitespace-nowrap`}>
            <span className={`w-1.5 h-1.5 rounded-full ${sev.dot} animate-pulse`} />
            {sev.label}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light mb-4 flex-1">
          {tumor.description}
        </p>

        {/* Stats grid — 4 items in a horizontal row */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
          {tumor.stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-black/25 rounded-lg px-2 py-2 sm:px-2.5 sm:py-2.5 border border-white/5 text-center"
            >
              <div className="text-[8px] sm:text-[9px] text-slate-500 uppercase tracking-wider mb-0.5 leading-tight">{stat.label}</div>
              <div className="text-[11px] sm:text-xs font-bold text-slate-200 leading-tight">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
