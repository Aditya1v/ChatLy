import { motion } from "framer-motion";

const MotionDot = motion.span;

const Loader = () => {
  return (
    <div className="flex items-center gap-3">
      <div>
        <p className="text-sm font-semibold text-slate-900 dark:text-white">
          Thinking through it
        </p>
        <div className="mt-2 flex items-center gap-1.5">
          {[0, 1, 2].map((dot) => (
            <MotionDot
              key={dot}
              className="h-2.5 w-2.5 rounded-full bg-sky-500"
              animate={{
                opacity: [0.35, 1, 0.35],
                y: [0, -4, 0],
              }}
              transition={{
                duration: 0.9,
                ease: "easeInOut",
                repeat: Infinity,
                delay: dot * 0.14,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loader;
