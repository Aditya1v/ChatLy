import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUp,
  BrainCircuit,
  Code2,
  FileText,
  ShieldCheck,
  Sparkles,
  TimerReset,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useChat } from "../context/useChat";
import QuerryAnswer from "./QuerryAnswer";

const suggestionCards = [
  {
    icon: BrainCircuit,
    eyebrow: "Strategy",
    title: "Shape a loose idea into a concrete plan",
    description:
      "Ask for roadmaps, decision frameworks, or the next best move on a project.",
    prompt: "Help me turn my rough product idea into a step-by-step launch plan.",
  },
  {
    icon: Code2,
    eyebrow: "Build",
    title: "Debug issues and generate cleaner code",
    description:
      "Use the assistant as a fast second set of eyes for bugs, refactors, and implementation work.",
    prompt:
      "Review this bug and suggest the cleanest fix with code examples and tradeoffs.",
  },
  {
    icon: FileText,
    eyebrow: "Write",
    title: "Draft polished messages, docs, and summaries",
    description:
      "Turn rough notes into communication that feels clear, confident, and professional.",
    prompt:
      "Help me write a concise, professional project update for my team.",
  },
];

const workflowPills = [
  "Context-aware answers",
  "Markdown-friendly output",
  "Saved conversation history",
];

const quickPrompts = [
  "Summarize a document",
  "Plan a feature rollout",
  "Explain a bug clearly",
];

const transition = {
  duration: 0.45,
  ease: [0.22, 1, 0.36, 1],
};

const MotionButton = motion.button;
const MotionDiv = motion.div;
const MotionHeader = motion.header;
const MotionList = motion.ul;

const ChatLayout = ({ isOpen }) => {
  const { result, querry, setQuerry, askQuerry, chats } = useChat();
  const [isFocused, setIsFocused] = useState(false);
  const showWelcome = result.length === 0;
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  const conversationCount = result.filter((item) => item.type === "q").length;
  const hasDraft = querry.trim().length > 0;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [result]);

  useEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) {
      return;
    }

    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(Math.max(textarea.scrollHeight, 52), 180)}px`;
    textarea.style.overflowY = textarea.scrollHeight > 180 ? "auto" : "hidden";
  }, [querry]);

  const handleSubmit = (event) => {
    event.preventDefault();
    askQuerry();
  };

  const handleSuggestionClick = (prompt) => {
    setQuerry(prompt);
    requestAnimationFrame(() => textareaRef.current?.focus());
  };

  return (
    <section
      className={`relative flex min-h-0 flex-1 flex-col overflow-hidden ${
        isOpen ? "pointer-events-none md:pointer-events-auto" : ""
      }`}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/30 to-transparent dark:from-white/4" />
        <div className="absolute -top-10 right-16 h-44 w-44 rounded-full bg-sky-400/12 blur-3xl dark:bg-sky-500/10" />
        <div className="absolute bottom-10 left-10 h-40 w-40 rounded-full bg-indigo-400/12 blur-3xl dark:bg-indigo-500/12" />
      </div>

      <MotionHeader
        className="relative z-10 flex flex-col gap-3 border-b border-white/45 px-4 py-4 md:px-6 md:py-4 xl:flex-row xl:items-center xl:justify-between dark:border-white/8"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition}
      >
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-950/6 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:bg-white/6 dark:text-slate-300">
            <Sparkles className="h-3.5 w-3.5 text-sky-500" />
            Intelligent Workspace
          </div>
          <h1 className="font-display mt-3 text-2xl font-bold tracking-tight text-slate-950 md:text-3xl dark:text-white">
            Calm interface, sharper answers.
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 md:text-[15px] dark:text-slate-300">
            Ask deep technical questions, write polished content, or think
            through ideas. The layout stays focused while motion makes each
            interaction feel smooth and deliberate.
          </p>
        </div>

        <div className="grid gap-2 sm:grid-cols-3 xl:w-[29rem]">
          <div className="glass-panel rounded-[20px] px-3 py-2.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
              Conversations
            </p>
            <p className="mt-1.5 font-display text-xl font-bold text-slate-950 dark:text-white">
              {chats.length}
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Saved locally for quick return.
            </p>
          </div>

          <div className="glass-panel rounded-[20px] px-3 py-2.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
              Exchanges
            </p>
            <p className="mt-1.5 font-display text-xl font-bold text-slate-950 dark:text-white">
              {conversationCount}
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Messages in the active thread.
            </p>
          </div>

          <div className="glass-panel rounded-[20px] px-3 py-2.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
              Experience
            </p>
            <div className="mt-1.5 flex items-center gap-2 text-slate-950 dark:text-white">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span className="text-sm font-semibold">Smooth transitions</span>
            </div>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Motion softens changes across the whole UI.
            </p>
          </div>
        </div>
      </MotionHeader>

      <div className="relative z-10 flex-1 overflow-y-auto px-3 py-4 md:px-6 md:py-5">
        <AnimatePresence mode="wait">
          {showWelcome ? (
            <MotionDiv
              key="welcome"
              className="mx-auto flex min-h-full w-full max-w-5xl flex-col justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={transition}
            >
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/75 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 shadow-sm dark:bg-slate-900/65 dark:text-slate-300">
                  <TimerReset className="h-3.5 w-3.5 text-sky-500" />
                  Ready When You Are
                </div>

                <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-5xl dark:text-white">
                  Bring clarity to every question.
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 md:text-base dark:text-slate-300">
                  This workspace is designed to feel modern, composed, and
                  fast. Start with a prompt below or type your own question to
                  jump straight into the conversation.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {workflowPills.map((pill) => (
                    <span
                      key={pill}
                      className="rounded-full border border-white/65 bg-white/80 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-300"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 xl:grid-cols-[1.35fr,0.85fr]">
                <div className="glass-panel-strong rounded-[28px] p-4 md:p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                        Launchpad
                      </p>
                      <h3 className="font-display mt-1.5 text-lg font-semibold text-slate-950 dark:text-white">
                        Start with something useful
                      </h3>
                    </div>
                    <div className="rounded-full bg-sky-500/10 px-3 py-1 text-[11px] font-semibold text-sky-700 dark:bg-sky-400/10 dark:text-sky-200">
                      Click to fill the composer
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    {suggestionCards.map((card, index) => {
                      const Icon = card.icon;

                      return (
                        <MotionButton
                          key={card.title}
                          type="button"
                          onClick={() => handleSuggestionClick(card.prompt)}
                          className="group rounded-[22px] border border-white/70 bg-white/70 p-4 text-left shadow-sm transition dark:border-white/10 dark:bg-slate-950/45"
                          whileHover={{ y: -3, scale: 1.01 }}
                          whileTap={{ scale: 0.985 }}
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.08 + index * 0.06, duration: 0.3 }}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px] bg-slate-950 text-white shadow-lg shadow-sky-500/10 dark:bg-white dark:text-slate-950">
                              <Icon className="h-4.5 w-4.5" />
                            </div>

                            <div className="min-w-0">
                              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                                {card.eyebrow}
                              </p>
                              <h4 className="mt-1.5 text-sm font-semibold text-slate-900 transition group-hover:text-sky-700 dark:text-white dark:group-hover:text-sky-200">
                                {card.title}
                              </h4>
                              <p className="mt-1.5 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                {card.description}
                              </p>
                            </div>
                          </div>
                        </MotionButton>
                      );
                    })}
                  </div>
                </div>

                <MotionDiv
                  className="glass-panel rounded-[28px] p-4 md:p-5"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.16, duration: 0.32 }}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                    Workflow
                  </p>
                  <h3 className="font-display mt-1.5 text-lg font-semibold text-slate-950 dark:text-white">
                    Designed to stay out of your way
                  </h3>

                  <div className="mt-4 space-y-3">
                    <div className="rounded-[22px] bg-slate-950 px-4 py-3.5 text-white dark:bg-white dark:text-slate-950">
                      <p className="text-sm font-semibold">Professional tone</p>
                      <p className="mt-1.5 text-sm leading-6 text-white/72 dark:text-slate-600">
                        Cleaner surfaces, stronger typography, and less visual
                        noise give the app a more product-ready presence.
                      </p>
                    </div>

                    <div className="rounded-[22px] border border-white/65 bg-white/70 px-4 py-3.5 dark:border-white/10 dark:bg-slate-900/55">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        Smooth interaction model
                      </p>
                      <p className="mt-1.5 text-sm leading-6 text-slate-500 dark:text-slate-400">
                        Framer Motion now eases in the sidebar, messages,
                        welcome state, and composer so transitions feel fluid.
                      </p>
                    </div>
                  </div>
                </MotionDiv>
              </div>
            </MotionDiv>
          ) : (
            <MotionList
              key="messages"
              layout
              className="mx-auto flex w-full max-w-4xl flex-col gap-4"
              transition={{ layout: { duration: 0.35, ease: "easeInOut" } }}
            >
              {result.map((item, index) => (
                <QuerryAnswer key={`${item.type}-${index}`} item={item} />
              ))}
              <div ref={bottomRef} />
            </MotionList>
          )}
        </AnimatePresence>
      </div>

      <MotionDiv
        className="relative z-10 px-3 pb-3 pt-2 md:px-6 md:pb-4"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.35 }}
      >
        <form onSubmit={handleSubmit} className="mx-auto max-w-4xl">
          <MotionDiv
            layout
            className="glass-panel-strong rounded-[26px] p-2.5 shadow-[0_24px_70px_-42px_rgba(15,23,42,0.45)]"
            animate={{
              y: isFocused ? -2 : 0,
              boxShadow: isFocused
                ? "0 28px 80px -42px rgba(14, 165, 233, 0.32)"
                : "0 24px 70px -42px rgba(15, 23, 42, 0.45)",
            }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-center justify-between gap-3 px-2 py-0.5">
              <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-300">
                <Sparkles className="h-3.5 w-3.5 text-sky-500" />
                {hasDraft
                  ? "Ready to send your prompt"
                  : "Ask for analysis, writing, coding, or ideation"}
              </div>

              <div className="hidden rounded-full bg-slate-950/6 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:flex dark:bg-white/6 dark:text-slate-300">
                Enter to send
              </div>
            </div>

            <div className="mt-2 flex items-end gap-3">
              <textarea
                ref={textareaRef}
                rows={1}
                placeholder="Ask anything: debug an issue, write a professional message, map out a plan, or summarize something complex."
                className="composer-textarea max-h-44 min-h-[52px] flex-1 resize-none bg-transparent px-2 py-2.5 text-[15px] leading-6 text-slate-900 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500"
                value={querry}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(event) => setQuerry(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    askQuerry();
                  }
                }}
              />

              <MotionButton
                type="submit"
                disabled={!hasDraft}
                className={`mb-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white ${
                  hasDraft
                    ? "bg-slate-950 shadow-lg shadow-sky-500/15 dark:bg-white dark:text-slate-950"
                    : "cursor-not-allowed bg-slate-300 dark:bg-slate-700 dark:text-slate-300"
                }`}
                whileHover={hasDraft ? { scale: 1.04, y: -1 } : {}}
                whileTap={hasDraft ? { scale: 0.96 } : {}}
              >
                <ArrowUp className="h-5 w-5" />
              </MotionButton>
            </div>

            <div className="mt-3 flex flex-wrap gap-2 px-2 pb-1">
              {quickPrompts.map((prompt) => (
                <MotionButton
                  key={prompt}
                  type="button"
                  onClick={() =>
                    handleSuggestionClick(`Help me ${prompt.toLowerCase()}.`)
                  }
                  className="rounded-full border border-white/65 bg-white/75 px-3 py-2 text-xs font-medium text-slate-500 transition hover:border-sky-300 hover:text-sky-700 dark:border-white/10 dark:bg-slate-900/55 dark:text-slate-300 dark:hover:border-sky-500/35 dark:hover:text-sky-200"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {prompt}
                </MotionButton>
              ))}
            </div>
          </MotionDiv>
        </form>
      </MotionDiv>
    </section>
  );
};

export default ChatLayout;
