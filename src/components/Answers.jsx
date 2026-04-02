import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Answers = ({ ans }) => {
  return (
    <div className="flex justify-start">
      <div className="bg-white text-black dark:bg-zinc-800 dark:text-white px-4 py-3 rounded-2xl max-w-3xl leading-relaxed">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h1 className="text-2xl font-bold mt-4 mb-2 text-black dark:text-white ">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-xl font-semibold mt-3 mb-2 text-black dark:text-white">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-lg font-semibold mt-3 mb-2 text-black dark:text-white">
                {children}
              </h3>
            ),
            li: ({ children }) => (
              <li className="ml-5 list-disc mb-1">{children}</li>
            ),
            code({ inline, children }) {
              if (inline) {
                return (
                  <code className="bg-zinc-700 px-1 py-0.5 rounded text-blue-300">
                    {children}
                  </code>
                );
              }

              return (
                <code className="block bg-zinc-900 p-3 rounded-lg overflow-x-auto text-green-300 text-sm">
                  {children}
                </code>
              );
            },
          }}
        >
          {ans}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Answers;
