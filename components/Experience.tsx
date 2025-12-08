"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Briefcase, MapPin, Calendar, CheckCircle2 } from "lucide-react";
import { EXPERIENCE } from "@/lib/constants";

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  } as const;

  return (
    <section
      id="experience"
      ref={ref}
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Professional <span className="text-gradient">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full mb-6" />
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            My journey as a developer and the experiences that shaped my career
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-500 to-transparent hidden md:block" />

          {/* Experience Items */}
          <div className="space-y-8">
            {EXPERIENCE.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                className="relative"
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 top-8 w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 border-4 border-background hidden md:block transform -translate-x-[7px]" />

                {/* Content Card */}
                <div className="md:ml-20">
                  <motion.div
                    className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border-l-4 border-blue-500 border-t border-r border-b border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.01, x: 4 }}
                  >
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 gap-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-950/30 shrink-0">
                          <Briefcase className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold mb-1 text-gray-900 dark:text-gray-100">
                            {exp.position}
                          </h3>
                          <p className="text-lg text-gray-800 dark:text-gray-200 font-medium">
                            {exp.company}
                          </p>
                        </div>
                      </div>

                      {/* Date Badge */}
                      {exp.current ? (
                        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-100 dark:bg-green-950/30 border border-green-500 w-fit">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-sm font-medium text-green-700 dark:text-green-400">
                            Current
                          </span>
                        </div>
                      ) : (
                        <div className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-900 dark:text-gray-100 w-fit">
                          {exp.startDate} - {exp.endDate}
                        </div>
                      )}
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-700 dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{exp.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                      {exp.description}
                    </p>

                    {/* Responsibilities */}
                    {exp.responsibilities &&
                      exp.responsibilities.length > 0 && (
                        <div className="mb-6">
                          <h4 className="font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-gray-100">
                            <CheckCircle2 className="w-4 h-4 text-blue-600" />
                            Key Responsibilities:
                          </h4>
                          <ul className="space-y-2">
                            {exp.responsibilities.map((resp, idx) => (
                              <li
                                key={idx}
                                className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2 pl-6"
                              >
                                <span className="text-blue-600 mt-1">•</span>
                                <span>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                    {/* Achievements */}
                    {exp.achievements && exp.achievements.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">
                          Achievements:
                        </h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, idx) => (
                            <li
                              key={idx}
                              className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2 pl-6"
                            >
                              <span className="text-cyan-500 mt-1">★</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Technologies */}
                    {exp.technologies && exp.technologies.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3 text-sm text-gray-600 dark:text-gray-400">
                          Technologies Used:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 rounded-lg bg-blue-100 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-xs font-medium text-blue-700 dark:text-blue-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400">
            Want to work together?{" "}
            <Link
              href="/contact"
              className="text-gradient font-semibold hover:underline"
            >
              Let's connect!
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
