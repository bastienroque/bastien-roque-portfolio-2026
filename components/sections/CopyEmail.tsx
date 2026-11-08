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
        className="block w-full mt-8 min-h-21 font-semibold text-[clamp(22px,6.4vw,56px)] leading-none tracking-[-0.04em] bg-paper-glass border border-paper-line rounded-card px-6 py-4.5 text-left break-all transition hover:bg-[rgba(242,239,233,0.12)] hover:border-paper"
      >
        {email}
      </button>
      <div className="font-mono text-xs text-paper-muted mt-3.5" aria-live="polite">
        {copied ? "Copied to clipboard" : "Tap to copy the email"}
      </div>
    </>
  );
};
