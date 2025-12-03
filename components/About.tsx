"use client";

import { motion } from "framer-motion";
import { MapPin, Building2, Code2, Heart } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/constants";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="about"
      ref={ref}
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20"
    >
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section Title */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left Column - Profile Card */}
          <motion.div variants={itemVariants}>
            <div className="glass dark:glass-dark rounded-3xl p-8 backdrop-blur-xl border-2 border-white/20 dark:border-white/10 hover:border-white/30 dark:hover:border-white/20 transition-all duration-300">
              {/* Profile Image Placeholder */}
              <div className="relative w-48 h-48 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full animate-pulse" />
                <div className="absolute inset-2 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center">
                  <Code2 className="w-20 h-20 text-purple-500" />
                </div>
              </div>

              {/* Info Cards */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 rounded-2xl glass dark:glass-dark">
                  <MapPin className="w-5 h-5 text-purple-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-foreground/60">Location</p>
                    <p className="font-medium">{PERSONAL_INFO.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-2xl glass dark:glass-dark">
                  <Building2 className="w-5 h-5 text-pink-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-foreground/60">Company</p>
                    <p className="font-medium">{PERSONAL_INFO.company}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-2xl glass dark:glass-dark">
                  <Heart className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-foreground/60">Status</p>
                    <p className="font-medium">Available for projects</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Bio */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="glass dark:glass-dark rounded-3xl p-8 backdrop-blur-xl border-2 border-white/20 dark:border-white/10">
              <h3 className="text-2xl font-bold mb-6 text-gradient">
                Nice to meet you! 👋
              </h3>

              <div className="space-y-4 text-foreground/80 leading-relaxed">
                {PERSONAL_INFO.about.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={
                      isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                    }
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              {/* Stats */}
              <motion.div
                className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ delay: 0.8 }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-gradient">3+</div>
                  <div className="text-sm text-foreground/60 mt-1">Years</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gradient">10+</div>
                  <div className="text-sm text-foreground/60 mt-1">
                    Projects
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gradient">8+</div>
                  <div className="text-sm text-foreground/60 mt-1">
                    Technologies
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Quick Links */}
            <motion.div
              className="glass dark:glass-dark rounded-3xl p-6 backdrop-blur-xl border-2 border-white/20 dark:border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 1 }}
            >
              <h4 className="font-semibold mb-4">Quick Facts</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>🎯 Focusing on full-stack development</li>
                <li>📱 Specialized in mobile app development</li>
                <li>🌐 Building scalable web applications</li>
                <li>🖥️ Creating cross-platform desktop apps</li>
                <li>🚀 Always learning new technologies</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
