"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { NAV_LINKS } from "@/lib/constants";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="glass dark:glass-dark rounded-2xl backdrop-blur-xl border-2 border-white/20 dark:border-white/10 px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <motion.a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("#home");
                }}
                className="text-xl font-bold text-gradient cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                MS
              </motion.a>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-8">
                {NAV_LINKS.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>

              {/* Right Side */}
              <div className="flex items-center gap-4">
                <ThemeToggle />

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="md:hidden w-10 h-10 rounded-full glass dark:glass-dark flex items-center justify-center"
                  aria-label="Toggle menu"
                >
                  {isOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
        className="fixed inset-0 z-40 md:hidden"
      >
        {/* Backdrop */}
        <motion.div
          initial={false}
          animate={{ opacity: isOpen ? 1 : 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        {/* Menu */}
        <motion.div
          initial={false}
          animate={{
            x: isOpen ? 0 : "100%",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute top-0 right-0 bottom-0 w-64 glass dark:glass-dark backdrop-blur-xl border-l-2 border-white/20 dark:border-white/10 p-6"
        >
          <div className="flex flex-col gap-6 mt-20">
            {NAV_LINKS.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="text-lg font-medium text-foreground/70 hover:text-foreground transition-colors cursor-pointer"
                initial={{ opacity: 0, x: 20 }}
                animate={{
                  opacity: isOpen ? 1 : 0,
                  x: isOpen ? 0 : 20,
                }}
                transition={{ delay: index * 0.05 }}
              >
                {link.name}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
