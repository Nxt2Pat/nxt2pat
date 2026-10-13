'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Check, Copy } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none text-deep">
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-deep mt-8 mb-4 tracking-tight border-b border-card-border pb-3">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="font-serif text-2xl font-bold text-deep mt-8 mb-3 tracking-tight">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-serif text-xl font-semibold text-deep mt-6 mb-2">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-base text-deep/90 leading-relaxed mb-4 font-sans">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-1.5 my-4 text-deep/90 font-sans pl-2">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-1.5 my-4 text-deep/90 font-sans pl-2">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-ink pl-4 py-1 my-6 italic text-deep/80 bg-ink/5 dark:bg-ink/10 rounded-r-xl">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-6 rounded-xl border border-card-border">
              <table className="w-full text-left text-sm font-sans">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-black/5 dark:bg-white/5 border-b border-card-border font-mono text-xs text-muted uppercase">
              {children}
            </thead>
          ),
          th: ({ children }) => <th className="px-4 py-3 font-semibold">{children}</th>,
          td: ({ children }) => <td className="px-4 py-3 border-b border-card-border/50">{children}</td>,
          img: ({ src, alt }) => {
            if (!src) return null;
            return (
              <figure className="my-8">
                <div className="overflow-hidden rounded-2xl border border-card-border bg-black/5 dark:bg-white/5 shadow-md">
                  <img
                    src={src}
                    alt={alt || ''}
                    loading="lazy"
                    className="w-full max-h-[500px] object-cover object-center"
                  />
                </div>
                {alt && (
                  <figcaption className="text-center text-xs font-mono text-muted mt-2.5">
                    // {alt}
                  </figcaption>
                )}
              </figure>
            );
          },
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !match && !String(children).includes('\n');

            if (isInline) {
              return (
                <code
                  className="font-mono text-xs bg-ink/10 text-ink dark:text-cyan px-1.5 py-0.5 rounded border border-ink/15"
                  {...props}
                >
                  {children}
                </code>
              );
            }

            return <CodeBlock language={match ? match[1] : ''}>{String(children).replace(/\n$/, '')}</CodeBlock>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

const CodeBlock: React.FC<{ language?: string; children: string }> = ({ language, children }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-6 rounded-2xl overflow-hidden border border-card-border bg-[#110E24] text-slate-100 shadow-md">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5 text-xs font-mono text-slate-400">
        <span>{language || 'text'}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 text-[11px]">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="text-[11px]">Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-xs font-mono leading-relaxed">
        <code>{children}</code>
      </pre>
    </div>
  );
};
