import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Geometric Background */}
      <div className="geometric-bg">
        <div className="geometric-shape w-96 h-96 bg-blue-500 rounded-full top-10 -left-20" />
        <div className="geometric-shape w-80 h-80 bg-cyan-500 rounded-full top-1/4 right-10" />
        <div className="geometric-shape w-64 h-64 bg-blue-600 top-1/2 left-1/3 rotate-45" />
        <div className="geometric-shape w-72 h-72 bg-blue-400 rounded-full bottom-20 right-1/4" />
        <div className="geometric-shape w-56 h-56 bg-cyan-400 bottom-40 left-10 rotate-12" />
      </div>

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
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} SORO Colotcholoman Moïse. Built with{" "}
            <span className="text-gradient font-semibold">Next.js</span> and{" "}
            <span className="text-gradient font-semibold">Tailwind CSS</span>.
          </p>
        </div>
      </footer>
    </div>
  );
}
