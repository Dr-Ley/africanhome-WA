import Image from "next/image";

export function LogoMark({
  className = "",
  width = 148,
  height = 56,
}: {
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <span
      className={`relative inline-block shrink-0 overflow-hidden ${className}`}
      style={{ width, height }}
    >
      <Image
        src="/images/logo/AHA_logo.png"
        alt="African Home Adventure Safaris"
        fill
        sizes="160px"
        className="object-cover object-center"
      />
    </span>
  );
}
