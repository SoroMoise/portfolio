"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, MessageCircle, Facebook } from "lucide-react";
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
      <motion.div
        className="max-w-5xl mx-auto text-center relative z-10"
        variants={container}
        initial="hidden"
        animate="show"
      >
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
          className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 text-gray-900 dark:text-gray-100"
        >
          {PERSONAL_INFO.title}
        </motion.h2>

        {/* Tagline */}
        <motion.p
          variants={item}
          className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
        >
          {PERSONAL_INFO.tagline}
        </motion.p>

        {/* Location & Company */}
        <motion.p
          variants={item}
          className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-10"
        >
          📍 {PERSONAL_INFO.location} • 🏢 {PERSONAL_INFO.company}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <Link href="/projects">
            <motion.button
              className="px-8 py-4 rounded-lg bg-white dark:bg-gray-800 border-2 border-blue-500 text-blue-600 dark:text-blue-400 font-semibold text-lg transition-all duration-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:shadow-lg hover:-translate-y-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Projects
            </motion.button>
          </Link>

          <Link href="/contact">
            <motion.button
              className="px-8 py-4 rounded-lg bg-gradient-primary text-white font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.button>
          </Link>
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
                className="w-12 h-12 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center transition-all duration-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:border-blue-500 hover:shadow-md"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.name}
              >
                <Icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </motion.a>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
