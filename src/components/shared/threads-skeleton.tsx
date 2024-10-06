import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ThreadListSkeleton = () => {
  return (
    <div className="max-h-[calc(100vh-120px)] max-w-full overflow-y-scroll">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {/* Mocking multiple date sections */}
        {Array.from({ length: 3 }).map((_, index) => (
          <React.Fragment key={index}>
            <Skeleton className="mt-5 h-4 w-1/4" />
            {Array.from({ length: 5 }).map((_, threadIndex) => (
              <button
                key={threadIndex}
                className="relative flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all"
              >
                <div className="flex w-full flex-col gap-2">
                  <div className="flex items-center">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="ml-auto h-3 w-1/6" />
                  </div>
                  <Skeleton className="h-3 w-2/3" />
                </div>
                <Skeleton className="line-clamp-2 h-3 w-full" />
                <div className="flex items-center gap-2">
                  {/* Assuming labels, you can create a few more skeletons for them */}
                  <Skeleton className="h-4 w-1/6" />
                  <Skeleton className="h-4 w-1/6" />
                </div>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ThreadListSkeleton;
