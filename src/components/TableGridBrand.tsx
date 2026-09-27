import Image from "next/image";

type BrandSize = "nav" | "hero" | "footer";

export default function TableGridBrand({
  size = "nav",
  className = "",
}: {
  size?: BrandSize;
  className?: string;
}) {
  const sizes = {
    nav: {
      wrap: "gap-2.5",
      crest: "h-12 w-[35px]",
      name: "text-[22px]",
      tagline: "text-[7px] tracking-[.22em]",
    },
    hero: {
      wrap: "gap-5 sm:gap-7",
      crest: "h-36 w-[104px] sm:h-44 sm:w-[126px]",
      name: "text-5xl sm:text-6xl lg:text-[68px]",
      tagline: "text-[10px] sm:text-[11px] tracking-[.26em]",
    },
    footer: {
      wrap: "gap-4",
      crest: "h-24 w-[69px]",
      name: "text-3xl sm:text-4xl",
      tagline: "text-[9px] tracking-[.24em]",
    },
  }[size];

  return (
    <div className={`inline-flex items-center ${sizes.wrap} ${className}`}>
      <div className={`relative shrink-0 ${sizes.crest}`}>
        <Image
          src="/tablegrid-crest.webp"
          alt=""
          fill
          priority={size !== "footer"}
          sizes={size === "hero" ? "126px" : "70px"}
          className="object-contain drop-shadow-[0_8px_16px_rgba(108,62,28,.18)]"
        />
      </div>

      <div className="min-w-0">
        <div
          className={`font-semibold leading-[.88] tracking-[-.035em] ${sizes.name}`}
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          <span className="bg-gradient-to-b from-[#F3CF8D] via-[#B96D32] to-[#7A3D20] bg-clip-text text-transparent">
            TableGrid
          </span>
        </div>
        <div
          className={`mt-2 whitespace-nowrap uppercase font-semibold text-[#75472F]/72 ${sizes.tagline}`}
        >
          Food Businesses Solutions
        </div>
      </div>
    </div>
  );
}
