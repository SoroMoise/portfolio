"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ExternalLink, Github, Star, GitFork, Code2 } from "lucide-react";
import { PROJECTS, PERSONAL_INFO } from "@/lib/constants";
import { GitHubRepo, getRepoLanguageColor } from "@/lib/github";

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [githubRepos, setGithubRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch GitHub repos
    fetch(
      `https://api.github.com/users/${PERSONAL_INFO.githubUsername}/repos?sort=updated&per_page=10`
    )
      .then((res) => res.json())
      .then((data) => {
        setGithubRepos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching GitHub repos:", error);
        setLoading(false);
      });
  }, []);

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  } as const;

  // Merge featured projects with GitHub data
  const enrichedProjects = PROJECTS.map((project) => {
    const repoName = project.github.split("/").pop();
    const githubData = githubRepos.find((repo) => repo.name === repoName);
    return {
      ...project,
      stars: githubData?.stargazers_count || 0,
      forks: githubData?.forks_count || 0,
      language: githubData?.language || project.tech[0],
    };
  });

  return (
    <section
      id="projects"
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
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full mb-6" />
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            A selection of projects I've built with passion and dedication
          </p>
        </motion.div>

        {/* Featured Projects Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {enrichedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="group"
              whileHover={{ scale: 1.02, y: -4 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 h-full flex flex-col">
                {/* Project Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-950/30">
                    <Code2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex gap-2">
                    {!loading && (
                      <>
                        {project.stars > 0 && (
                          <div className="flex items-center gap-1 px-3 py-1 rounded-lg bg-yellow-100 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-900 text-xs">
                            <Star className="w-3 h-3 text-yellow-600" />
                            <span>{project.stars}</span>
                          </div>
                        )}
                        {project.forks > 0 && (
                          <div className="flex items-center gap-1 px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-xs">
                            <GitFork className="w-3 h-3" />
                            <span>{project.forks}</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Project Info */}
                <h3 className="text-2xl font-bold mb-3">{project.name}</h3>
                <p className="text-foreground/70 mb-4 grow">
                  {project.description}
                </p>

                {/* Features List */}
                {project.features && project.features.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold mb-2 text-foreground/60">
                      Key Features:
                    </h4>
                    <ul className="space-y-1">
                      {project.features.slice(0, 3).map((feature, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-foreground/70 flex items-start gap-2"
                        >
                          <span className="text-blue-600 mt-1">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg bg-blue-100 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-xs font-medium text-blue-700 dark:text-blue-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3 mt-auto">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 font-medium transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="w-4 h-4" />
                    <span>View Code</span>
                  </motion.a>
                  {project.demo && (
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-primary text-white font-medium transition-all duration-300 hover:shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </motion.a>
                  )}
                </div>

                {/* Year Badge */}
                {project.year && (
                  <div className="absolute top-6 right-6 px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-xs font-medium">
                    {project.year}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* GitHub Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center"
        >
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white dark:bg-gray-800 border-2 border-blue-500 text-blue-600 dark:text-blue-400 font-semibold transition-all duration-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:shadow-lg hover:-translate-y-1"
          >
            <Github className="w-5 h-5" />
            <span>View More on GitHub</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
