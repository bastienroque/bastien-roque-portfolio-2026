import React from "react";
import { Member } from "@/lib/types";

interface MemberChipProps {
  /** "band-member" index pair, used by the scheduler to flash this chip */
  id: string;
  member: Member;
  color: string;
  interactive: boolean;
  active: boolean;
  onToggle: () => void;
}

export const MemberChip: React.FC<MemberChipProps> = ({
  id,
  member,
  color,
  interactive,
  active,
  onToggle,
}) => {
  const inner = (
    <>
      <i className="w-3 h-3 flex-none rounded-full" style={{ backgroundColor: color }} />
      <span>
        <b className="block font-medium">{member.name}</b>
        <em className="not-italic text-xs text-muted">{member.instrument}</em>
      </span>
    </>
  );

  const shape = "flex items-center gap-2.5 min-h-12 text-sm leading-tight border rounded-xl px-3 py-1.5 text-left";

  if (!interactive) {
    return (
      <div className={`${shape} bg-surface border-line`}>{inner}</div>
    );
  }

  return (
    <button
      type="button"
      data-member={id}
      data-color={color}
      onClick={onToggle}
      aria-pressed={active}
      aria-label={`${member.name} on ${member.instrument}: ${active ? "playing, tap to mute" : "muted, tap to unmute"}`}
      className={`${shape} transition-all ${
        active ? "bg-surface text-fg" : "border-dashed opacity-45 bg-transparent text-muted"
      }`}
      style={{ borderColor: active ? color : undefined }}
    >
      {inner}
    </button>
  );
};
