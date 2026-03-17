"use client";

import { motion, type Variants } from "framer-motion";
import {
  Github, Linkedin, ExternalLink, Mail,
  Code2, Brain, Database, Globe, Smartphone,
  ChevronRight
} from "lucide-react";

const skills = [
  { name: "Python", category: "AI/ML" },
  { name: "PyTorch", category: "AI/ML" },
  { name: "TensorFlow", category: "AI/ML" },
  { name: "Scikit-learn", category: "AI/ML" },
  { name: "Next.js", category: "Web" },
  { name: "React", category: "Web" },
  { name: "Node.js", category: "Web" },
  { name: "TypeScript", category: "Web" },
  { name: "MongoDB", category: "Backend" },
  { name: "ASP.NET", category: "Backend" },
  { name: "Flutter", category: "Mobile" },
  { name: "Docker", category: "DevOps" },
  { name: "Git", category: "DevOps" },
  { name: "Azure", category: "Cloud" },
  { name: "Tailwind CSS", category: "Web" },
  { name: "Framer Motion", category: "Web" },
];

const projects = [
  {
    title: "Brain Tumor Detection (This Project)",
    description: "Deep learning MRI classifier using fine-tuned ResNet18 with Next.js frontend and PyTorch backend.",
    tags: ["PyTorch", "ResNet18", "Next.js", "Deep Learning"],
    url: "https://github.com/jaypatel342005/DL-Project",
    accent: "cyan",
  },
  {
    title: "Cardiovascular Disease Predictor",
    description: "Advanced ML-powered application for early cardiac health assessment using XGBoost and modern UI.",
    tags: ["XGBoost", "Machine Learning", "Next.js", "Shadcn UI"],
    url: "https://github.com/jaypatel342005/Cardiovascular-Disease-Predictor",
    accent: "blue",
  },
  {
    title: "Hospital Management System",
    description: "Modern ASP.NET MVC application with secure patient-doctor workflows and Azure cloud deployment.",
    tags: ["ASP.NET", "MVC", "Azure", "SQL Server"],
    url: "https://github.com/jaypatel342005/Hospital-Management-System",
    accent: "violet",
  },
  {
    title: "ML & Deep Learning Collection",
    description: "Comprehensive collection of ML and Deep Learning models, notebooks, and experiments.",
    tags: ["Python", "TensorFlow", "PyTorch", "Jupyter"],
    url: "https://github.com/jaypatel342005/Machine-Learning-and-Deep-Learning",
    accent: "emerald",
  },
  {
    title: "Expense Manager",
    description: "Full-stack application to track and analyze personal finances with detailed charts and reports.",
    tags: ["MERN Stack", "Charts.js", "REST API"],
    url: "https://github.com/jaypatel342005/Expense-Manager",
    accent: "cyan",
  },
  {
    title: "Matrimony Flutter App",
    description: "Mobile application for matchmaking built with Flutter, featuring user profiles and realtime connections.",
    tags: ["Flutter", "Dart", "Firebase", "Mobile"],
    url: "https://github.com/jaypatel342005/Matrimony-Flutter-App",
    accent: "blue",
  },
];

const socials = [
  { href: "https://github.com/jaypatel342005", icon: Github, label: "GitHub", color: "hover:text-slate-100" },
  { href: "https://www.linkedin.com/in/jaypatel345/", icon: Linkedin, label: "LinkedIn", color: "hover:text-blue-400" },
  { href: "https://www.kaggle.com/jaypatel345", icon: Code2, label: "Kaggle", color: "hover:text-cyan-400" },
  { href: "https://cardioai.vercel.app/", icon: ExternalLink, label: "CardioAI", color: "hover:text-emerald-400" },
];

const categoryIcons: Record<string, typeof Code2> = {
  "AI/ML": Brain,
  "Web": Globe,
  "Backend": Database,
  "Mobile": Smartphone,
  "DevOps": Code2,
  "Cloud": Code2,
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function AboutPage() {
  return (
    <div className="bg-grid-pattern">
      {/* ─── Hero ─── */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="hero-glow top-0 left-1/4 opacity-30" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/20 flex items-center justify-center">
              <span className="text-4xl font-bold gradient-text">JP</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight gradient-text mb-4">
              Jay Patel
            </h1>
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
              Creating intelligent digital solutions. Specializing in Machine Learning & AI,
              building dynamic Full Stack web applications (MERN, Next.js), and architecting
              robust .NET systems. Bridging the gap between complex data and intuitive user experiences.
            </p>

            <div className="flex items-center justify-center gap-3 mt-8">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`w-11 h-11 rounded-xl bg-slate-900/60 flex items-center justify-center text-slate-400 ${social.color} transition-all duration-300 border border-white/5 hover:border-white/15 hover:bg-slate-800 hover:-translate-y-0.5`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Technical Arsenal ─── */}
      <section className="py-16 sm:py-24 border-y border-white/5 bg-slate-950/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3 block">Skills</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-3">Technical Arsenal</h2>
              <p className="text-slate-400 font-light">Technologies I use to build robust solutions</p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              className="flex flex-wrap justify-center gap-3"
            >
              {skills.map((skill) => {
                const Icon = categoryIcons[skill.category] || Code2;
                return (
                  <motion.div
                    key={skill.name}
                    variants={itemVariants}
                    className="group px-4 py-2.5 rounded-xl bg-slate-900/50 border border-white/5 hover:border-cyan-500/20 transition-all duration-300 flex items-center gap-2 hover:bg-slate-800/60 cursor-default"
                  >
                    <Icon className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                    <span className="text-sm text-slate-300 font-medium">{skill.name}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Featured Projects ─── */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3 block">Portfolio</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-3">Featured Projects</h2>
              <p className="text-slate-400 font-light">A selection of recent work in Web Dev, App Dev, and AI</p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
            >
              {projects.map((project) => (
                <motion.a
                  key={project.title}
                  variants={itemVariants}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card card-hover-lift rounded-2xl p-6 flex flex-col group cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-${project.accent}-500/10 border border-${project.accent}-500/20 flex items-center justify-center`}>
                      <Code2 className={`w-5 h-5 text-${project.accent}-400`} />
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-100 mb-2 group-hover:text-cyan-300 transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-light mb-4 flex-grow">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800/60 text-slate-400 border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Connect CTA ─── */}
      <section className="py-16 sm:py-24 border-t border-white/5 bg-slate-950/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Mail className="w-10 h-10 text-cyan-400 mx-auto mb-5" />
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-3">
              Let&apos;s Connect & Collaborate
            </h2>
            <p className="text-slate-400 text-base sm:text-lg mb-8 font-light max-w-md mx-auto">
              Whether you have a question, a project idea, or just want to say hi — I&apos;m always open to discussing new opportunities.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-700/60 text-slate-300 hover:text-white text-sm font-medium transition-all duration-300 border border-white/5 hover:border-white/15"
                >
                  <social.icon className="w-4 h-4" />
                  {social.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
