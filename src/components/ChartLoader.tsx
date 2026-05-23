export default function ChartLoader() {
  return (
    <div className="bg-bg-elevated p-5 pl-0 flex justify-center items-center rounded-2xl h-[371px]">
      <div className="flex items-end justify-center w-full h-auto">
        <div className="border-b-2 border-l-2 border-accent-muted flex items-end justify-center gap-2 px-1 5 py-4 h-37.5 w-37.5">
          {[0, 0.5, 0.2].map((delay, i) => (
            <div
              key={i}
              className="w-1/4 h-[90%] bg-accent-muted/40 origin-bottom"
              style={{
                animation: "barAnimate 1.25s linear infinite",
                animationDelay: `${delay * 0.5}s`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
