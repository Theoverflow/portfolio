import React from "react";
import { DitherText } from "reactbit";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-[#f2fcee] text-[#1b950f] p-8 font-mono flex flex-col items-center justify-center gap-10">
      <header className="text-center">
        <DitherText size="3xl" color="#9999cc" style={{ fontWeight: 700 }}>
          Théo Marini
        </DitherText>
        <p className="text-[#7c9971] mt-2 text-sm">
          Creative Developer | Rust & Web | Embedded Systems | Cloud Architect
        </p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {[
          {
            title: "Rust & WebAssembly",
            description: "Building performant UI using Rust & WASM with Bevy.",
          },
          {
            title: "Embedded Systems",
            description: "Designing reliable, low-latency firmware.",
          },
          {
            title: "Cloud Architecture",
            description: "Multi-cloud, containerized systems with CI/CD.",
          },
          {
            title: "Finance & Trading",
            description: "Quantitative models, algorithmic strategies, and analytics.",
          },
          {
            title: "Problem Solving",
            description: "Systematic, creative solutions for complex challenges.",
          },
          {
            title: "Event Planning",
            description: "Bringing people together through curated experiences.",
          },
        ].map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="bg-[#f2fcee] border border-[#7c9971] hover:shadow-xl transition duration-300">
              <CardContent className="p-6">
                <DitherText size="xl" color="#1b950f">{card.title}</DitherText>
                <p className="text-[#7c9971] mt-3 text-sm">{card.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </main>

      <footer className="mt-12 text-xs text-[#7c9971]">
        © {new Date().getFullYear()} Théo Marini. Crafted with creativity & code.
      </footer>
    </div>
  );
}
