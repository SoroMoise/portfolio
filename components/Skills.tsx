"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Smartphone,
  Code2,
  Globe,
  FileCode,
  Palette,
  Zap,
  Server,
  Box,
  Network,
  Code,
  Monitor,
  Layout,
  GitBranch,
  Database,
  Wrench,
} from "lucide-react";
import { SKILLS, SKILL_CATEGORIES } from "@/lib/constants";

const iconMap: { [key: string]: any } = {
  Smartphone,
  Code2,
  Globe,
  FileCode,
  Palette,
  Zap,
  Server,
  Box,
  Network,
  Code,
  Monitor,
  Layout,
  GitBranch,
  Database,
  Wrench,
};

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  } as const;

  const getLevelColor = (level: string) => {
    switch (level) {
      case "expert":
        return "from-purple-500 to-pink-500";
      case "advanced":
        return "from-blue-500 to-cyan-500";
      default:
        return "from-green-500 to-emerald-500";
    }
  };

  const getLevelWidth = (level: string) => {
    switch (level) {
      case "expert":
        return "w-11/12";
      case "advanced":
        return "w-4/5";
      default:
        return "w-3/5";
    }
  };

  return (
    <section
      id="skills"
      ref={ref}
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Skills & <span className="text-gradient">Technologies</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-6" />
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        {/* Skills by Category */}
        <div className="space-y-12">
          {SKILL_CATEGORIES.map((category, categoryIndex) => {
            const categorySkills = SKILLS.filter(
              (skill) => skill.category === category.id
            );

            if (categorySkills.length === 0) return null;

            const CategoryIcon = iconMap[category.icon] || Code2;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ delay: categoryIndex * 0.1, duration: 0.5 }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl glass dark:glass-dark">
                    <CategoryIcon className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold">
                      {category.name}
                    </h3>
                    <p className="text-sm text-foreground/60">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Skills Grid */}
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  {categorySkills.map((skill, skillIndex) => {
                    const SkillIcon = iconMap[skill.icon] || Code2;

                    return (
                      <motion.div
                        key={skill.name}
                        variants={itemVariants}
                        className="group relative"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="glass dark:glass-dark rounded-2xl p-6 backdrop-blur-xl border-2 border-white/20 dark:border-white/10 hover:border-purple-500/50 dark:hover:border-purple-500/50 transition-all duration-300 h-full">
                          {/* Skill Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                                <SkillIcon className="w-5 h-5 text-purple-500" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-lg">
                                  {skill.name}
                                </h4>
                                <p className="text-xs text-foreground/60 capitalize">
                                  {skill.level}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-sm text-foreground/70 mb-4">
                            {skill.description}
                          </p>

                          {/* Skill Level Bar */}
                          <div className="relative h-2 bg-white/10 dark:bg-black/20 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full bg-gradient-to-r ${getLevelColor(
                                skill.level
                              )} rounded-full`}
                              initial={{ width: 0 }}
                              animate={
                                isInView
                                  ? { width: getLevelWidth(skill.level) }
                                  : { width: 0 }
                              }
                              transition={{
                                delay: categoryIndex * 0.1 + skillIndex * 0.05,
                                duration: 1,
                                ease: "easeOut",
                              }}
                            />
                          </div>
                        </div>

                        {/* Hover Glow Effect */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-300 pointer-events-none" />
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-16 glass dark:glass-dark rounded-3xl p-8 backdrop-blur-xl border-2 border-white/20 dark:border-white/10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-gradient mb-2">
                {SKILLS.length}+
              </div>
              <div className="text-sm text-foreground/60">Technologies</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gradient mb-2">
                {SKILL_CATEGORIES.length}
              </div>
              <div className="text-sm text-foreground/60">Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gradient mb-2">
                {SKILLS.filter((s) => s.level === "expert").length}
              </div>
              <div className="text-sm text-foreground/60">Expert Level</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gradient mb-2">∞</div>
              <div className="text-sm text-foreground/60">Learning</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
