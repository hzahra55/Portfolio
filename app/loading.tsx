export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="relative">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-border border-t-accent-1" />
        <div className="absolute inset-0 h-12 w-12 animate-pulse rounded-full bg-accent-1/10 blur-xl" />
      </div>
    </div>
  );
}
