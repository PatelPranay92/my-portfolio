export default function Loading() {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center loading-gradient">
      <div className="text-center">
        <h1
          className="text-4xl md:text-6xl font-bold gradient-text mb-4"
          style={{ letterSpacing: "0.1em" }}
        >
          PP
        </h1>
        <div className="w-48 h-[2px] mx-auto overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full animate-[shimmer_1.5s_ease-in-out_infinite]"
            style={{
              background: "linear-gradient(90deg, #3B82F6, #8B5CF6, #06B6D4)",
              width: "100%",
            }}
          />
        </div>
        <p className="text-sm text-white/40 mt-4 tracking-[0.3em] uppercase font-light">
          Pranay Patel
        </p>
      </div>
    </div>
  );
}
