import { Skeleton } from "./ui/skeleton";

function StatCardRowSkeleton() {
  return (
    <div className="flex justify-center items-center flex-wrap gap-6">
      {[...Array(4)].map((_, i) => (
        <Skeleton
          key={i}
          className="py-4 px-6 shadow-lg flex items-center bg-bg-elevated rounded-xl gap-6 w-[80%] md:w-[45%] xl:w-[23.5%] h-25"
        />
      ))}
    </div>
  );
}

export default StatCardRowSkeleton;
