import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <div className="relative min-h-screen gradient-bg-light dark:gradient-bg-dark">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-foreground/60 text-sm">
            © {new Date().getFullYear()} SORO Colotcholoman Moïse. Built with{" "}
            <span className="text-gradient font-semibold">Next.js</span> and{" "}
            <span className="text-gradient font-semibold">Tailwind CSS</span>.
          </p>
        </div>
      </footer>
    </div>
  );
}
