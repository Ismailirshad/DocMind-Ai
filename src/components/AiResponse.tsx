import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface AIResponseProps {
  content: string;
}

export default function AIResponse({ content }: AIResponseProps) {
  return (
    <div className="max-w-none text-[15px] leading-7 text-zinc-200">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="mb-4 mt-6 text-2xl font-bold text-white first:mt-0">
              {children}
            </h1>
          ),

          h2: ({ children }) => (
            <h2 className="mb-3 mt-6 text-xl font-bold text-white first:mt-0">
              {children}
            </h2>
          ),

          h3: ({ children }) => (
            <h3 className="mb-2 mt-5 text-lg font-semibold text-zinc-100">
              {children}
            </h3>
          ),

          p: ({ children }) => (
            <p className="mb-4 leading-7 text-zinc-300">{children}</p>
          ),

          ul: ({ children }) => (
            <ul className="mb-5 ml-6 list-disc space-y-2 pl-5 text-zinc-300">
              {children}
            </ul>
          ),

          ol: ({ children }) => (
            <ol className="mb-5 ml-6 list-decimal space-y-2 pl-5 text-zinc-300">
              {children}
            </ol>
          ),

          li: ({ children }) => (
            <li className="pl-1 leading-7 text-zinc-300">{children}</li>
          ),

          strong: ({ children }) => (
            <strong className="font-semibold text-white">{children}</strong>
          ),

          em: ({ children }) => <em className="text-zinc-300">{children}</em>,

          blockquote: ({ children }) => (
            <blockquote className="my-4 border-l-4 border-blue-500 pl-4 text-zinc-400">
              {children}
            </blockquote>
          ),

          hr: () => <hr className="my-6 border-zinc-700" />,

          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline-offset-4 hover:underline"
            >
              {children}
            </a>
          ),

          code: ({ children }) => (
            <code className="rounded-md bg-zinc-800 px-1.5 py-0.5 text-sm text-blue-300">
              {children}
            </code>
          ),

          pre: ({ children }) => (
            <pre className="my-4 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-sm">
              {children}
            </pre>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
