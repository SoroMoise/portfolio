"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/lib/constants";

type FormStatus = "idle" | "loading" | "success" | "error";

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus("success");
        setStatusMessage(
          "Message sent successfully! I'll get back to you soon."
        );
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setFormStatus("error");
        setStatusMessage("Failed to send message. Please try again.");
      }
    } catch (error) {
      setFormStatus("error");
      setStatusMessage("An error occurred. Please try again later.");
    }

    // Reset status after 5 seconds
    setTimeout(() => {
      setFormStatus("idle");
      setStatusMessage("");
    }, 5000);
  };

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
    hidden: { opacity: 0, y: 20 },
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

  return (
    <section
      id="contact"
      ref={ref}
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-6" />
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach
            out!
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="glass dark:glass-dark rounded-3xl p-8 backdrop-blur-xl border-2 border-white/20 dark:border-white/10">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                    <Mail className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60 mb-1">Email</p>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="font-medium hover:text-purple-500 transition-colors"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
                    <MapPin className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60 mb-1">Location</p>
                    <p className="font-medium">{PERSONAL_INFO.location}</p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20">
                    <Phone className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60 mb-1">WhatsApp</p>
                    <a
                      href={PERSONAL_INFO.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium hover:text-green-500 transition-colors"
                    >
                      {PERSONAL_INFO.whatsapp}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links Card */}
            <div className="glass dark:glass-dark rounded-3xl p-8 backdrop-blur-xl border-2 border-white/20 dark:border-white/10">
              <h3 className="text-xl font-bold mb-6">Connect With Me</h3>
              <div className="flex gap-4">
                {SOCIAL_LINKS.map((social) => {
                  const Icon =
                    social.name === "GitHub"
                      ? require("lucide-react").Github
                      : social.name === "WhatsApp"
                      ? require("lucide-react").MessageCircle
                      : require("lucide-react").Facebook;

                  return (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 p-4 rounded-xl glass dark:glass-dark glass-hover dark:glass-hover-dark flex flex-col items-center gap-2 transition-all duration-300"
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-6 h-6" />
                      <span className="text-xs font-medium">{social.name}</span>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Availability Card */}
            <div className="glass dark:glass-dark rounded-3xl p-8 backdrop-blur-xl border-2 border-white/20 dark:border-white/10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping" />
                </div>
                <div>
                  <p className="font-semibold">Available for Projects</p>
                  <p className="text-sm text-foreground/60">
                    Open to freelance and full-time opportunities
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <form
              onSubmit={handleSubmit}
              className="glass dark:glass-dark rounded-3xl p-8 backdrop-blur-xl border-2 border-white/20 dark:border-white/10 h-full"
            >
              <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>

              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl glass dark:glass-dark border border-white/20 dark:border-white/10 focus:border-purple-500 focus:outline-none transition-colors bg-transparent"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Your Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl glass dark:glass-dark border border-white/20 dark:border-white/10 focus:border-purple-500 focus:outline-none transition-colors bg-transparent"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium mb-2"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl glass dark:glass-dark border border-white/20 dark:border-white/10 focus:border-purple-500 focus:outline-none transition-colors bg-transparent"
                    placeholder="Project Inquiry"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl glass dark:glass-dark border border-white/20 dark:border-white/10 focus:border-purple-500 focus:outline-none transition-colors bg-transparent resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={formStatus === "loading"}
                  className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={formStatus !== "loading" ? { scale: 1.02 } : {}}
                  whileTap={formStatus !== "loading" ? { scale: 0.98 } : {}}
                >
                  {formStatus === "loading" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>

                {/* Status Message */}
                {formStatus !== "idle" && formStatus !== "loading" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center gap-2 p-4 rounded-xl ${
                      formStatus === "success"
                        ? "bg-green-500/20 border border-green-500/30 text-green-600 dark:text-green-400"
                        : "bg-red-500/20 border border-red-500/30 text-red-600 dark:text-red-400"
                    }`}
                  >
                    {formStatus === "success" ? (
                      <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    )}
                    <span className="text-sm">{statusMessage}</span>
                  </motion.div>
                )}
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
