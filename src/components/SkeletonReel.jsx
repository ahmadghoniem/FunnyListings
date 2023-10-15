import { Skeleton } from "@/components/ui/skeleton";

const SkeletonRel = ({ length }) => {
  return Array.from({ length }).map((_, i) => (
    <div
      className="col-span-6 max-w-[17.5rem] md:col-span-3 lg:col-span-2"
      key={i}
    >
      <Skeleton
        id="image"
        className="mb-2 aspect-square w-[17.5rem] rounded-lg"
      />
      <div className="flex flex-row justify-between">
        <Skeleton className="h-5 w-24  rounded-md" />
        <Skeleton className="h-5 w-14 rounded-md" />
      </div>
    </div>
  ));
};

export default SkeletonRel;
