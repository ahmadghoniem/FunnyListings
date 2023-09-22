import { Skeleton } from "@/components/ui/skeleton";

const SkeletonRel = () => {
  return Array.from({ length: 6 }).map((_, i) => (
    <div
      className="col-span-6 max-w-[18rem] md:col-span-3 lg:col-span-2"
      key={i}
    >
      <Skeleton
        id="image"
        className="mb-2 aspect-square w-[18rem] rounded-lg"
      />
      <div className="flex flex-row justify-between">
        <Skeleton className="h-5 w-24  rounded-md" />
        <Skeleton className="h-5 w-14 rounded-md" />
      </div>
    </div>
  ));
};

export default SkeletonRel;
