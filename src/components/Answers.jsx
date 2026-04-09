import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Answers = ({ ans }) => {
  return (
    <div className="markdown-body bubble-copy prose prose-slate max-w-none bg-transparent text-slate-700 dark:prose-invert dark:text-slate-200">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="font-display mt-1 text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="font-display mt-6 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-display mt-5 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="my-3 text-[15px] leading-7 text-slate-700 dark:text-slate-200">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="my-4 list-disc space-y-2 pl-5 text-[15px] leading-7 text-slate-700 dark:text-slate-200">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-4 list-decimal space-y-2 pl-5 text-[15px] leading-7 text-slate-700 dark:text-slate-200">
              {children}
            </ol>
          ),
          li: ({ children }) => <li>{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="my-4 rounded-r-2xl border-l-4 border-sky-500/70 bg-sky-500/8 px-4 py-3 italic text-slate-600 dark:text-slate-300">
              {children}
            </blockquote>
          ),
          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-sky-700 underline decoration-sky-300 underline-offset-4 transition hover:text-sky-500 dark:text-sky-300 dark:decoration-sky-700"
            >
              {children}
            </a>
          ),
          table: ({ children }) => (
            <div className="my-5 overflow-x-auto rounded-[24px] border border-slate-200/80 bg-white/75 dark:border-white/10 dark:bg-slate-900/65">
              <table className="min-w-full border-collapse text-left text-sm">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-slate-950 text-white dark:bg-white dark:text-slate-950">
              {children}
            </thead>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 font-semibold">{children}</th>
          ),
          td: ({ children }) => (
            <td className="border-t border-slate-200/70 px-4 py-3 text-slate-600 dark:border-white/10 dark:text-slate-300">
              {children}
            </td>
          ),
          pre: ({ children }) => (
            <pre className="my-5 overflow-x-auto rounded-[24px] bg-slate-950 px-4 py-4 text-sm text-slate-100 shadow-inner shadow-slate-900/20">
              {children}
            </pre>
          ),
          code({ inline, children, className, ...props }) {
            if (inline) {
              return (
                <code className="rounded-lg bg-slate-950/8 px-1.5 py-1 font-mono text-[0.9em] text-sky-700 dark:bg-white/10 dark:text-sky-200">
                  {children}
                </code>
              );
            }

            return (
              <code
                className={`${className || ""} font-mono text-[0.92rem] leading-7 text-slate-100`}
                {...props}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {ans}
      </ReactMarkdown>
    </div>
  );
};

export default Answers;
