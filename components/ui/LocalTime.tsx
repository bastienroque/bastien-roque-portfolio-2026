"use client";

import React, { useSyncExternalStore } from "react";

// Re-render about every 15 s; the snapshot only changes when the minute does.
const subscribe = (onChange: () => void) => {
  const id = setInterval(onChange, 15_000);
  return () => clearInterval(id);
};
const currentMinute = () => Math.floor(Date.now() / 60_000);
const noTimeOnServer = () => null;

const part = (date: Date, timeZone: string, timeZoneName: "short" | "shortOffset") =>
  new Intl.DateTimeFormat("en-GB", { timeZone, timeZoneName })
    .formatToParts(date)
    .find((p) => p.type === "timeZoneName")?.value ?? "";

/**
 * Live local time in a time zone, e.g. "14:32 WET (UTC+0)".
 * Rendered as "--:--" on the server so the static HTML never shows a stale time.
 */
export const LocalTime: React.FC<{ timeZone: string; className?: string }> = ({ timeZone, className = "" }) => {
  const minute = useSyncExternalStore(subscribe, currentMinute, noTimeOnServer);

  if (minute === null) {
    return <span className={className}>--:--</span>;
  }

  const date = new Date(minute * 60_000);
  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(date);
  const abbr = part(date, timeZone, "short"); // WET / WEST
  const offset = part(date, timeZone, "shortOffset").replace("GMT", "UTC"); // UTC+0 / UTC+1

  return (
    <time dateTime={date.toISOString()} className={`tabular-nums ${className}`}>
      {time} {abbr !== offset.replace("UTC", "GMT") ? `${abbr} ` : ""}({offset})
    </time>
  );
};
