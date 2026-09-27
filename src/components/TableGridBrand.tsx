import Image from "next/image";

type BrandSize = "nav" | "hero" | "footer";

export default function TableGridBrand({
  size = "nav",
  className = "",
}: {
  size?: BrandSize;
  className?: string;
}) {
  const widthClasses = {
    nav: "w-[122px] sm:w-[140px]",
    hero: "w-[310px] sm:w-[370px] lg:w-[420px]",
    footer: "w-[300px] sm:w-[380px]",
  }[size];

  const responsiveSizes = {
    nav: "(max-width: 640px) 122px, 140px",
    hero: "(max-width: 640px) 310px, (max-width: 1024px) 370px, 420px",
    footer: "(max-width: 640px) 300px, 380px",
  }[size];

  return (
    <Image
      src="/tablegrid-logo.webp"
      alt="TableGrid — Food Businesses Solutions"
      width={1200}
      height={669}
      priority={size !== "footer"}
      sizes={responsiveSizes}
      className={`h-auto object-contain drop-shadow-[0_10px_22px_rgba(108,62,28,.16)] ${widthClasses} ${className}`}
    />
  );
}
