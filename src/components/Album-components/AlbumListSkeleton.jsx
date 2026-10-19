import Skeleton from "../shared-components/Skeleton";

const SKELETON_ROWS = Array.from({ length: 6 }, (_, index) => index);

export default function AlbumListSkeleton() {
  return (
    <section
      aria-label="Loading top albums"
      aria-busy="true"
      className="mx-auto w-full px-4 pb-12 sm:px-6 md:px-8"
    >
      <span className="sr-only">Loading top albums...</span>
      <div className="mb-3 flex items-end justify-between px-1 sm:mb-4">
        <div>
          <Skeleton className="h-2 w-20 bg-white/10" />
          <Skeleton className="mt-2 h-7 w-28 bg-white/10" />
        </div>
        <Skeleton className="h-2 w-16 bg-white/10" />
      </div>

      <ol className="overflow-hidden rounded-md border border-white/[0.06]">
        {SKELETON_ROWS.map((row) => (
          <li
            key={row}
            className="grid min-h-[112px] grid-cols-[36px_64px_minmax(0,1fr)] items-center gap-4 border-b border-white/[0.06] bg-gradient-to-r from-[#111111] to-[#0c0c0c] px-4 py-4 last:border-b-0 sm:grid-cols-[56px_80px_minmax(0,1fr)_auto] sm:gap-5 sm:px-6 md:px-8"
          >
            <Skeleton className="h-8 w-7 sm:h-10 sm:w-9" />
            <Skeleton className="h-16 w-16 rounded-[3px] bg-white/[0.08] sm:h-20 sm:w-20" />
            <div className="min-w-0">
              <Skeleton className="h-4 w-3/5 bg-white/[0.09]" />
              <Skeleton className="mt-2 h-3 w-2/5 bg-white/[0.06]" />
              <Skeleton className="mt-3 h-2.5 w-1/3 bg-white/[0.05]" />
            </div>
            <div className="col-start-3 mt-1 flex gap-2 sm:col-start-auto sm:mt-0">
              <Skeleton className="h-5 w-16 rounded-sm bg-white/[0.06]" />
              <Skeleton className="h-5 w-20 rounded-sm bg-white/[0.06]" />
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
