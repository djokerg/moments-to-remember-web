type PagerDotsProps = {
  total: number;
  activeIndex: number;
  onSelect: (index: number) => void;
};

export default function PagerDots({
  total,
  activeIndex,
  onSelect,
}: PagerDotsProps) {
  return (
    <div className="mt-3 flex items-center justify-center gap-2 sm:hidden">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className={
            activeIndex === i
              ? "h-2.5 w-6 rounded-full bg-white"
              : "h-2.5 w-2.5 rounded-full bg-white/40"
          }
          aria-label={`Stranica ${i + 1}`}
        />
      ))}
    </div>
  );
}
