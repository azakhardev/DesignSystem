import { Check, Copy } from "lucide-react";
import {
  Highlight,
  type Language,
  type PrismTheme,
  themes,
} from "prism-react-renderer";
import React, { useState } from "react";

import { cn } from "../../lib/utils";

// === INLINE CODE SNIPPET ===

interface CodeSnippetProps extends React.ComponentProps<"code"> {
  children: React.ReactNode;
}

function CodeSnippet({ children, className, ...props }: CodeSnippetProps) {
  return (
    <code
      className={cn(
        "rounded-md bg-surface-secondary px-[0.4em] py-[0.2em] font-mono text-[0.85em] font-semibold text-text",
        className,
      )}
      {...props}
    >
      {children}
    </code>
  );
}

interface CodeBlockProps extends Omit<React.ComponentProps<"div">, "children"> {
  /** The raw string of code to highlight */
  code: string;
  /** The programming language for syntax highlighting (e.g. "tsx", "bash", "json") */
  language?: Language;
  /** Whether to render line numbers on the left side */
  showLineNumbers?: boolean;
  /** Custom prism-react-renderer theme object */
  theme?: PrismTheme;
  /** Whether to render a floating "Copy" button inside the block */
  withCopyButton?: boolean;
}

function CodeBlock({
  className,
  code,
  language = "tsx",
  showLineNumbers = false,
  withCopyButton = true,
  ...props
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg border border-border bg-[#1E1E1E]",
        className,
      )}
      {...props}
    >
      {withCopyButton && (
        <button
          aria-label="Copy code"
          className={cn(
            "absolute right-3 top-3 z-10 flex h-8 items-center justify-center rounded-md bg-white/10 px-2 text-white/70 opacity-0 backdrop-blur-sm transition-all ",
            "hover:bg-white/20 hover:text-white group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          )}
          onClick={handleCopy}
          type="button"
        >
          {copied ? (
            <span className="flex items-center gap-1 text-xs font-medium text-emerald-400">
              <Check className="h-3.5 w-3.5" />
              Copied!
            </span>
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      )}

      <Highlight code={code.trim()} language={language} theme={themes.vsDark}>
        {({ className, getLineProps, getTokenProps, style, tokens }) => (
          <pre
            className={cn(
              "overflow-x-auto p-4 text-sm font-mono",
              "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
              className,
            )}
            style={style}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ className: "table-row", line })}>
                {showLineNumbers && (
                  <span className="table-cell select-none pr-4 text-right text-xs opacity-50">
                    {i + 1}
                  </span>
                )}
                <span className="table-cell">
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}

export { CodeBlock, CodeSnippet };
