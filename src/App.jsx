import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "./components/Sidebar";
import ChatLayout from "./components/ChatLayout";

const MotionDiv = motion.div;

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative h-dvh overflow-hidden bg-[var(--bg)] text-[var(--text-main)] transition-colors duration-500">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <MotionDiv
          aria-hidden="true"
          className="hero-orb absolute -left-24 top-10 h-72 w-72 rounded-full bg-sky-400/35 dark:bg-sky-500/18"
          animate={{
            scale: [1, 1.08, 1],
            x: [0, 18, -8, 0],
            y: [0, -14, 8, 0],
          }}
          transition={{ duration: 16, ease: "easeInOut", repeat: Infinity }}
        />
        <MotionDiv
          aria-hidden="true"
          className="hero-orb absolute right-[-6rem] top-24 h-96 w-96 rounded-full bg-cyan-300/30 dark:bg-cyan-400/14"
          animate={{
            scale: [1.02, 0.96, 1.04, 1.02],
            x: [0, -24, 10, 0],
            y: [0, 18, -12, 0],
          }}
          transition={{ duration: 20, ease: "easeInOut", repeat: Infinity }}
        />
        <MotionDiv
          aria-hidden="true"
          className="hero-orb absolute bottom-[-8rem] left-1/3 h-[28rem] w-[28rem] rounded-full bg-indigo-400/18 dark:bg-indigo-500/16"
          animate={{
            scale: [0.94, 1.04, 0.98, 0.94],
            x: [0, 20, -14, 0],
            y: [0, -16, 12, 0],
          }}
          transition={{ duration: 22, ease: "easeInOut", repeat: Infinity }}
        />
      </div>

      <MotionDiv
        className="relative mx-auto flex h-full max-w-[1600px] p-2 sm:p-3 md:p-4"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="app-shell soft-grid flex h-full w-full overflow-hidden rounded-[24px] md:rounded-[28px]">
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          <ChatLayout isOpen={isOpen} />
        </div>
      </MotionDiv>
    </div>
  );
}

export default App;
