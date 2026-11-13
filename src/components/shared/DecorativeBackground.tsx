export function DecorativeBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <img
        src="/images/shapes.svg"
        alt="Illustration"
        className="min-w-250 object-contain absolute inset-e-0 opacity-[0.1]"
      />
    </div>
  );
}
