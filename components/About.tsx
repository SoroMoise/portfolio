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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left Column - Profile Card */}
          <motion.div variants={itemVariants}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
              {/* Profile Image Placeholder */}
              <div className="relative w-48 h-48 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-primary rounded-full" />
                <div className="absolute inset-2 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center">
                  <Code2 className="w-20 h-20 text-blue-600" />
                </div>
              </div>

              {/* Info Cards */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900">
                  <MapPin className="w-5 h-5 text-blue-600 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{PERSONAL_INFO.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-100 dark:border-cyan-900">
                  <Building2 className="w-5 h-5 text-cyan-600 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Company</p>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{PERSONAL_INFO.company}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900">
                  <Heart className="w-5 h-5 text-green-600 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                    <p className="font-medium text-gray-900 dark:text-gray-100">Available for projects</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Bio */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                Nice to meet you! 👋
              </h3>

              <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
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
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Years</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gradient">10+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Projects
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gradient">8+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Technologies
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Quick Links */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 1 }}
            >
              <h4 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">Quick Facts</h4>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
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
