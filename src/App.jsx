import React from "react";
import { motion } from "framer-motion";
import Dither from './blocks/Backgrounds/Dither/Dither';

function Card({ title, description }) {
  return (
    <div className="bg-[#f2fcee] border border-[#7c9971] shadow-md hover:shadow-xl transition duration-300 p-5">
      <h2 className="text-xl font-semibold text-[#1b950f]">{title}</h2>
      <p className="text-[#7c9971] mt-2 text-sm">{description}</p>
    </div>
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen font-mono text-[#1b950f] bg-[#f2fcee] overflow-hidden" style={{ position: "relative", zIndex: 10 }}>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -1,
          pointerEvents: "auto",
        }}
      >
        <Dither
          waveColor={[0.35, 0.5, 0.7]}
          disableAnimation={false}
          enableMouseInteraction={true}
          mouseRadius={0.1}
          colorNum={6}
          waveAmplitude={0.3}
          waveFrequency={3}
          waveSpeed={0.04}
        />
      </div>

      <header className="text-center pt-24 px-4">
        <h1 className="text-3xl font-bold text-[#9999cc]">Théo Marini</h1>
        <p className="text-[#7c9971] mt-2 text-sm max-w-md mx-auto">
          Crafting systems & ideas at the intersection of code, design, and reality.
        </p>
      </header>

      <main className="mt-20 px-4 grid gap-6 w-full max-w-4xl mx-auto">
        {[
          {
            title: "Rust + WebAssembly",
            description: "Minimal & high-performance UIs with a systems mind.",
          },
          {
            title: "Embedded Art",
            description: "Low-level code that behaves like poetry in motion.",
          },
          {
            title: "Architecture as Narrative",
            description: "Infra that tells a story: modular, reliable, expressive.",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <Card title={item.title} description={item.description} />
          </motion.div>
        ))}
      </main>

      <footer className="mt-24 mb-10 text-center text-xs text-[#7c9971] px-4">
        © {new Date().getFullYear()} Théo Marini — Portfolio of simplicity & synthesis.
      </footer>
    </div>
  );
}