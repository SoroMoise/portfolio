"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, MessageCircle, Facebook } from "lucide-react";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/lib/constants";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const getSocialIcon = (iconName: string) => {
    const icons: { [key: string]: any } = {
      Github,
      MessageCircle,
      Facebook,
    };
    return icons[iconName] || Github;
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div
        className="max-w-5xl mx-auto text-center relative z-10"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Greeting */}
        <motion.div variants={item} className="mb-6">
          <span className="inline-block px-4 py-2 rounded-full glass dark:glass-dark text-sm font-medium">
            👋 Welcome to my portfolio
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={item}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-gradient"
        >
          {PERSONAL_INFO.name}
        </motion.h1>

        {/* Title */}
        <motion.h2
          variants={item}
          className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 text-foreground/90"
        >
          {PERSONAL_INFO.title}
        </motion.h2>

        {/* Tagline */}
        <motion.p
          variants={item}
          className="text-lg sm:text-xl md:text-2xl text-foreground/70 mb-8 max-w-3xl mx-auto"
        >
          {PERSONAL_INFO.tagline}
        </motion.p>

        {/* Location & Company */}
        <motion.p
          variants={item}
          className="text-base sm:text-lg text-foreground/60 mb-10"
        >
          📍 {PERSONAL_INFO.location} • 🏢 {PERSONAL_INFO.company}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <button
            onClick={() => scrollToSection("projects")}
            className="group relative px-8 py-4 rounded-full glass dark:glass-dark glass-hover dark:glass-hover-dark font-medium text-lg overflow-hidden transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10">View My Projects</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity"
              whileHover={{ scale: 1.05 }}
            />
          </button>

          <button
            onClick={() => scrollToSection("contact")}
            className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
          >
            <span className="relative z-10">Get In Touch</span>
          </button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={item}
          className="flex gap-4 justify-center items-center"
        >
          {SOCIAL_LINKS.map((social) => {
            const Icon = getSocialIcon(social.icon);
            return (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full glass dark:glass-dark glass-hover dark:glass-hover-dark flex items-center justify-center transition-all duration-300"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.name}
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            );
          })}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <button
            onClick={() => scrollToSection("about")}
            className="flex flex-col items-center gap-2 text-foreground/50 hover:text-foreground/80 transition-colors"
            aria-label="Scroll to about section"
          >
            <span className="text-sm">Scroll Down</span>
            <ArrowDown className="w-5 h-5" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
