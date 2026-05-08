export function StatusPill({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-glass px-3 py-1 text-xs font-medium text-muted-foreground">
      <span className="relative inline-flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
      </span>
      {label}
    </div>
  );
}
