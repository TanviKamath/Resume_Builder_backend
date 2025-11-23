const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-8 h-8">
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <path
            d="M16 4L4 10V22L16 28L28 22V10L16 4Z"
            fill="hsl(var(--brand-blue))"
            opacity="0.2"
          />
          <path
            d="M16 4L4 10V22L16 28V16L4 10"
            fill="hsl(var(--brand-blue))"
          />
          <path
            d="M16 4L28 10L16 16V28L28 22V10L16 4Z"
            fill="hsl(var(--brand-blue))"
            opacity="0.6"
          />
        </svg>
      </div>
      <span className="text-xl font-semibold text-foreground">prebuiltui</span>
    </div>
  );
};

export default Logo;
