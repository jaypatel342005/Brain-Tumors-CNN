"use client";

import Link from "next/link";
import { Brain, Heart, Github, Linkedin, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-auto border-t border-white/5 bg-slate-950/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <Brain className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-lg tracking-tight text-slate-100">
                NeuralScan<span className="text-cyan-400">.AI</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Advanced deep learning inference for brain tumor MRI classification using fine-tuned ResNet18.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Navigate</h4>
            <ul className="space-y-2.5">
              {[
                { href: "/", label: "Home" },
                { href: "/analyzer", label: "Analyzer" },
                { href: "/about", label: "About" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-500 hover:text-cyan-400 text-sm transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Technology */}
          <div>
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Built With</h4>
            <ul className="space-y-2.5 text-sm text-slate-500">
              <li>Next.js 16 & React 19</li>
              <li>PyTorch & ResNet18</li>
              <li>Framer Motion</li>
              <li>Tailwind CSS</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Connect</h4>
            <div className="flex gap-3">
              {[
                { href: "https://github.com/jaypatel342005", icon: Github, label: "GitHub" },
                { href: "https://www.linkedin.com/in/jaypatel345/", icon: Linkedin, label: "LinkedIn" },
                { href: "https://cardioai.vercel.app/", icon: ExternalLink, label: "CardioAI" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-slate-900/60 hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 transition-all duration-300 border border-white/5 hover:border-cyan-500/20 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-slate-500 text-xs flex items-center gap-1.5">
            Engineered with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> by{" "}
            <a href="https://github.com/jaypatel342005" target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-400 hover:text-cyan-400 transition-colors">
              Jay Patel
            </a>
          </div>
          <p className="text-slate-600 text-xs tracking-wide">
            &copy; {new Date().getFullYear()} NeuralScan AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
