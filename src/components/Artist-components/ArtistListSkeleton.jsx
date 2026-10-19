import Skeleton from "../shared-components/Skeleton";

const SKELETON_ROWS = Array.from({ length: 8 }, (_, index) => index);
const NAME_WIDTHS = ["w-3/4", "w-2/3", "w-4/5", "w-1/2"];

export default function ArtistListSkeleton() {
  return (
    <section
      aria-label="Loading top artists"
      aria-busy="true"
      className="mx-auto w-full px-4 pb-12 sm:px-6 md:px-8"
    >
      <span className="sr-only">Loading top artists...</span>
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
            className="relative flex min-h-[120px] w-full items-end overflow-hidden border-b border-white/[0.05] px-5 py-5 last:border-b-0 sm:min-h-[138px] sm:items-center sm:px-8 sm:py-6 md:min-h-[150px] md:px-12"
          >
            <Skeleton className="absolute left-4 top-1/2 h-2 w-4 -translate-y-1/2 sm:left-5" />
            <div className="ml-5 flex min-w-0 flex-1 flex-col gap-3 sm:ml-0 sm:flex-row sm:items-end sm:gap-8 md:gap-10">
              <Skeleton
                className={`h-9 max-w-full ${NAME_WIDTHS[row % NAME_WIDTHS.length]} sm:h-14 sm:w-[min(36vw,22rem)] md:h-[4.5rem]`}
              />
              <div className="flex flex-wrap gap-2 pb-0.5">
                <Skeleton className="h-2 w-12 bg-white/[0.05]" />
                <Skeleton className="h-2 w-16 bg-white/[0.05]" />
                {row % 2 === 0 && (
                  <Skeleton className="h-2 w-10 bg-white/[0.05]" />
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
