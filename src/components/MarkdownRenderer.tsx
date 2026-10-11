import React from 'react';
import { ExternalLink } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
  isUser?: boolean;
}

// Helper to render inline markdown: **bold**, *italic*, `code`, and [text](url)
export const renderInlineMarkdown = (text: string, isUser = false): React.ReactNode[] => {
  if (!text) return [];

  // Tokenize by links, bold, code, and italics
  const regex = /(\[.*?\]\(https?:\/\/[^\s)]+\)|\*\*.*?\*\*|`.*?`|\*.*?\*)/g;
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (!part) return null;

    // Link: [label](url)
    if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
      const match = part.match(/\[(.*?)\]\((https?:\/\/[^\s)]+)\)/);
      if (match) {
        const [, label, url] = match;
        return (
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={
              isUser
                ? 'underline font-semibold text-white hover:text-amber-100'
                : 'text-amber-700 font-medium hover:text-amber-800 underline inline-flex items-center gap-0.5'
            }
          >
            <span>{label}</span>
            <ExternalLink className="w-3 h-3 inline-block ml-0.5" />
          </a>
        );
      }
    }

    // Bold: **text**
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      const inner = part.slice(2, -2);
      return (
        <strong
          key={index}
          className={isUser ? 'text-white font-bold' : 'text-stone-900 font-semibold'}
        >
          {inner}
        </strong>
      );
    }

    // Inline Code: `code`
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      const inner = part.slice(1, -1);
      return (
        <code
          key={index}
          className={
            isUser
              ? 'bg-amber-800/60 text-amber-100 px-1 py-0.5 rounded text-xs font-mono'
              : 'bg-stone-100 text-stone-800 border border-stone-200 px-1 py-0.5 rounded text-xs font-mono font-medium'
          }
        >
          {inner}
        </code>
      );
    }

    // Italic: *text*
    if (part.startsWith('*') && part.endsWith('*') && part.length >= 2) {
      const inner = part.slice(1, -1);
      return (
        <em key={index} className="italic">
          {inner}
        </em>
      );
    }

    return <span key={index}>{part}</span>;
  });
};

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, isUser = false }) => {
  if (!content) return null;

  // Split lines into blocks (paragraphs, tables, lists, headers, blockquotes)
  const lines = content.split('\n');
  const blocks: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    // Check for Horizontal Rule: ---
    if (trimmed === '---' || trimmed === '***') {
      blocks.push(
        <hr key={`hr-${i}`} className={`my-3 border-t ${isUser ? 'border-amber-400/40' : 'border-stone-200'}`} />
      );
      i++;
      continue;
    }

    // Check for Markdown Table: starts and ends with | or contains multiple |
    if (trimmed.startsWith('|') && trimmed.includes('|', 1)) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }

      if (tableLines.length >= 2) {
        // Parse header row
        const headerRow = tableLines[0];
        const headers = headerRow
          .split('|')
          .map((c) => c.trim())
          .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);

        // Check for separator row (e.g., |---|---|)
        const hasDivider = tableLines[1].includes('---') || tableLines[1].includes('-|-');
        const dataRows = tableLines.slice(hasDivider ? 2 : 1).map((r) =>
          r
            .split('|')
            .map((c) => c.trim())
            .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1)
        );

        blocks.push(
          <div
            key={`table-${i}`}
            className="overflow-x-auto my-3 rounded-xl border border-stone-200 shadow-xs bg-white"
          >
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-amber-50/90 text-amber-950 font-semibold border-b border-amber-200/90">
                  {headers.map((h, hIdx) => (
                    <th key={hIdx} className="py-2.5 px-3.5 whitespace-nowrap text-xs uppercase tracking-wider font-bold">
                      {renderInlineMarkdown(h, false)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {dataRows.map((row, rIdx) => (
                  <tr
                    key={rIdx}
                    className={
                      rIdx % 2 === 0
                        ? 'bg-white hover:bg-amber-50/40 transition-colors'
                        : 'bg-stone-50/70 hover:bg-amber-50/40 transition-colors'
                    }
                  >
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="py-2.5 px-3.5 align-middle">
                        {renderInlineMarkdown(cell, false)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      }
    }

    // Check for Headings: #, ##, ###
    if (trimmed.startsWith('#')) {
      const match = trimmed.match(/^(#{1,6})\s+(.*)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2];

        if (level === 1 || level === 2) {
          blocks.push(
            <h2
              key={`h-${i}`}
              className={`font-serif font-bold text-base sm:text-lg mt-3.5 mb-2 flex items-center gap-2 ${
                isUser ? 'text-white' : 'text-amber-950'
              }`}
            >
              {renderInlineMarkdown(text, isUser)}
            </h2>
          );
        } else {
          // Check if this is a Citation section heading
          const isCitationHeader = text.toLowerCase().includes('citation') || text.toLowerCase().includes('source');
          blocks.push(
            <h3
              key={`h-${i}`}
              className={`font-bold text-xs sm:text-sm uppercase tracking-wider mt-3 mb-1.5 flex items-center gap-1.5 ${
                isCitationHeader
                  ? 'text-amber-800 font-serif font-bold'
                  : isUser
                  ? 'text-amber-200'
                  : 'text-amber-900'
              }`}
            >
              {renderInlineMarkdown(text, isUser)}
            </h3>
          );
        }
        i++;
        continue;
      }
    }

    // Check for Blockquotes: > ...
    if (trimmed.startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
      }
      blocks.push(
        <div
          key={`quote-${i}`}
          className={`border-l-3 py-2 px-3.5 rounded-r-xl my-2 text-xs sm:text-sm ${
            isUser
              ? 'border-white/60 bg-white/10 text-white'
              : 'border-amber-600 bg-amber-50/80 text-amber-950'
          }`}
        >
          {renderInlineMarkdown(quoteLines.join(' '), isUser)}
        </div>
      );
      continue;
    }

    // Check for Bullet Lists: lines starting with - or *
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const listItems: string[] = [];
      while (
        i < lines.length &&
        (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('* '))
      ) {
        listItems.push(lines[i].trim().replace(/^[-*]\s+/, ''));
        i++;
      }

      blocks.push(
        <ul key={`ul-${i}`} className="space-y-1.5 my-2 pl-0.5">
          {listItems.map((item, idx) => (
            <li
              key={idx}
              className={`flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed ${
                isUser ? 'text-white' : 'text-stone-700'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                  isUser ? 'bg-white' : 'bg-amber-600'
                }`}
              />
              <span className="flex-1">{renderInlineMarkdown(item, isUser)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Check for Ordered / Numbered Lists: lines starting with 1. , 2. , etc.
    if (/^\d+\.\s+/.test(trimmed)) {
      const listItems: { num: string; text: string }[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        const itemLine = lines[i].trim();
        const m = itemLine.match(/^(\d+)\.\s+(.*)$/);
        if (m) {
          listItems.push({ num: m[1], text: m[2] });
        }
        i++;
      }

      blocks.push(
        <ol key={`ol-${i}`} className="space-y-1.5 my-2 pl-0.5">
          {listItems.map((item, idx) => (
            <li
              key={idx}
              className={`flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed ${
                isUser ? 'text-white' : 'text-stone-700'
              }`}
            >
              <span
                className={`font-mono font-bold text-xs mt-0.5 min-w-4 flex-shrink-0 ${
                  isUser ? 'text-amber-200' : 'text-amber-800'
                }`}
              >
                {item.num}.
              </span>
              <span className="flex-1">{renderInlineMarkdown(item.text, isUser)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Default: Regular Paragraph
    blocks.push(
      <p
        key={`p-${i}`}
        className={`leading-relaxed text-xs sm:text-sm my-1.5 ${
          isUser ? 'text-white' : 'text-stone-700'
        }`}
      >
        {renderInlineMarkdown(trimmed, isUser)}
      </p>
    );
    i++;
  }

  return <div className="space-y-1">{blocks}</div>;
};
