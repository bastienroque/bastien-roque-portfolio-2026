"use client";

import React, { useState } from "react";

export const CopyEmail: React.FC<{ email: string }> = ({ email }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="group block w-full mt-8 min-h-20 font-semibold text-[clamp(18px,4.6vw,44px)] leading-tight tracking-[-0.04em] bg-bg border border-line rounded-md px-5 py-4 text-left break-all transition-colors hover:border-accent-deep"
      >
        <span className="text-accent-deep">&gt; </span>
        {email}
      </button>
      <div className="text-xs text-dim mt-3" aria-live="polite">
        {copied ? <span className="text-accent-deep">✓ copied to clipboard</span> : "click to copy the email"}
      </div>
    </>
  );
};
