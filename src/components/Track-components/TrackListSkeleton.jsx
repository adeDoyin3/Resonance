import Skeleton from "../shared-components/Skeleton";

const SKELETON_ROWS = Array.from({ length: 8 }, (_, index) => index);

export default function TrackListSkeleton() {
  return (
    <section
      aria-label="Loading top tracks"
      aria-busy="true"
      className="mx-auto w-full px-4 pb-12 sm:px-6 md:px-8"
    >
      <span className="sr-only">Loading top tracks...</span>
      <div className="mb-3 flex items-end justify-between px-1 sm:mb-4">
        <div>
          <Skeleton className="h-2 w-20 bg-white/10" />
          <Skeleton className="mt-2 h-7 w-28 bg-white/10" />
        </div>
        <Skeleton className="h-2 w-14 bg-white/10" />
      </div>

      <div className="overflow-hidden rounded-md border border-white/[0.06]">
        {SKELETON_ROWS.map((row) => (
          <div
            key={row}
            className="grid min-h-[106px] grid-cols-[48px_56px_minmax(0,1fr)_42px] items-center gap-4 border-b border-white/[0.06] bg-gradient-to-r from-[#111111] to-[#0c0c0c] px-5 sm:grid-cols-[64px_56px_minmax(0,1fr)_48px] sm:gap-5 sm:px-6 md:min-h-[108px] md:grid-cols-[80px_56px_minmax(0,1fr)_52px] md:gap-6 md:px-8"
          >
            <Skeleton className="h-10 w-8 md:h-12" />
            <Skeleton className="h-14 w-14 rounded-[3px] bg-white/[0.08]" />
            <div className="min-w-0">
              <Skeleton className="h-4 w-3/5 bg-white/[0.09]" />
              <Skeleton className="mt-2 h-3 w-4/5 bg-white/[0.06]" />
            </div>
            <Skeleton className="ml-auto h-3 w-8 bg-white/[0.06]" />
          </div>
        ))}
      </div>
    </section>
  );
}
