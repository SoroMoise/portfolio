"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Professional <span className="text-gradient">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-6" />
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
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
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-linear-to-b from-purple-500 via-pink-500 to-transparent hidden md:block" />

          {/* Experience Items */}
          <div className="space-y-8">
            {EXPERIENCE.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                className="relative"
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 top-8 w-4 h-4 rounded-full bg-linear-to-br from-purple-500 to-pink-500 border-4 border-background hidden md:block transform -translate-x-[7px]" />

                {/* Content Card */}
                <div className="md:ml-20">
                  <motion.div
                    className="glass dark:glass-dark rounded-3xl p-8 backdrop-blur-xl border-2 border-white/20 dark:border-white/10 hover:border-purple-500/50 dark:hover:border-purple-500/50 transition-all duration-300"
                    whileHover={{ scale: 1.01 }}
                  >
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 gap-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-linear-to-br from-purple-500/20 to-pink-500/20 shrink-0">
                          <Briefcase className="w-6 h-6 text-purple-500" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold mb-1">
                            {exp.position}
                          </h3>
                          <p className="text-lg text-foreground/80 font-medium">
                            {exp.company}
                          </p>
                        </div>
                      </div>

                      {/* Date Badge */}
                      {exp.current ? (
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 w-fit">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-sm font-medium text-green-500">
                            Current
                          </span>
                        </div>
                      ) : (
                        <div className="px-4 py-2 rounded-full glass dark:glass-dark text-sm font-medium w-fit">
                          {exp.startDate} - {exp.endDate}
                        </div>
                      )}
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 mb-6 text-sm text-foreground/70">
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
                    <p className="text-foreground/70 mb-6">{exp.description}</p>

                    {/* Responsibilities */}
                    {exp.responsibilities &&
                      exp.responsibilities.length > 0 && (
                        <div className="mb-6">
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-purple-500" />
                            Key Responsibilities:
                          </h4>
                          <ul className="space-y-2">
                            {exp.responsibilities.map((resp, idx) => (
                              <li
                                key={idx}
                                className="text-sm text-foreground/70 flex items-start gap-2 pl-6"
                              >
                                <span className="text-purple-500 mt-1">•</span>
                                <span>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                    {/* Achievements */}
                    {exp.achievements && exp.achievements.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-semibold mb-3 text-gradient">
                          Achievements:
                        </h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, idx) => (
                            <li
                              key={idx}
                              className="text-sm text-foreground/70 flex items-start gap-2 pl-6"
                            >
                              <span className="text-pink-500 mt-1">★</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Technologies */}
                    {exp.technologies && exp.technologies.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3 text-sm text-foreground/60">
                          Technologies Used:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 rounded-full glass dark:glass-dark text-xs font-medium"
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
          <p className="text-foreground/60">
            Want to work together?{" "}
            <a
              href="#contact"
              className="text-gradient font-semibold hover:underline"
            >
              Let's connect!
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
