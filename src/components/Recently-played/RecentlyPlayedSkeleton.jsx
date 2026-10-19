import Skeleton from "../shared-components/Skeleton";

const SKELETON_ROWS = Array.from({ length: 7 }, (_, index) => index);

export default function RecentlyPlayedSkeleton() {
  return (
    <section
      aria-label="Loading recently played tracks"
      aria-busy="true"
      className="w-full max-w-[660px]"
    >
      <span className="sr-only">Loading recently played tracks...</span>
      {SKELETON_ROWS.map((row) => (
        <div
          key={row}
          className="flex min-h-[71px] items-center justify-between gap-5 border-b border-white/[0.055] py-2.5 pr-2 sm:min-h-[72px] sm:pr-3"
        >
          <div className="flex min-w-0 items-center gap-4">
            <Skeleton className="h-[46px] w-[46px] shrink-0 rounded-[3px] border border-white/10" />
            <div className="min-w-0 flex-1">
              <Skeleton className="h-3 w-40 max-w-full bg-white/[0.09]" />
              <Skeleton className="mt-2 h-2.5 w-28 max-w-full bg-white/[0.06]" />
            </div>
          </div>
          <Skeleton className="h-2.5 w-10 shrink-0 bg-white/[0.06]" />
        </div>
      ))}
    </section>
  );
}
