import { useState } from "react";
import { galleryItems } from "@/data/projects";
import { SlideInLeft, SlideInRight, StaggerHorizontalItem } from "./Motion";
import { ScrollableCardStack, type CardItem } from "@/components/ui/scrollable-card-stack";

interface WorkShowcaseProps {
  onSelectProject?: (title: string) => void;
}

export function WorkShowcase({ onSelectProject }: WorkShowcaseProps) {
  const [activeImageId, setActiveImageId] = useState<string>(galleryItems[0]?.id ?? "");

  const item1 = galleryItems[0]!;
  const item2 = galleryItems[1]!;
  const item3 = galleryItems[2]!;
  const item4 = galleryItems[3]!;
  const item5 = galleryItems[4]!;
  const item6 = galleryItems[5]!;

  // Prepare card items for mobile scrollable card stack
  const mobileCardItems: CardItem[] = galleryItems.map((item) => ({
    id: item.id,
    name: item.title,
    handle: item.category,
    image: item.image,
    avatar: "/favicon-96x96.png",
    href: "#enquire",
  }));

  return (
    <section
      id="work"
      className="bg-primary py-14 text-primary-foreground md:py-20 lg:py-24 border-b border-background/15 overflow-hidden scroll-mt-20"
    >
      <div className="container-page">
        {/* Section Header with Intro & CTA */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-highlight">
              Construction Gallery · Site Visuals
            </p>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-primary-foreground sm:text-3xl md:text-4xl lg:text-5xl">
              See the work in motion.
            </h2>
          </div>

          <div className="max-w-md flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-xs leading-relaxed text-primary-foreground/80 sm:text-sm">
              A visual record of structural work, site preparation, foundation reinforcement, and
              material transport around Walajabad and Kanchipuram.
            </p>
          </div>
        </div>

        {/* 1. DESKTOP & LAPTOP VIEW (>= 768px): PURE IMAGE GRID (No text panels, no badges, pure photography) */}
        <div className="hidden md:grid gap-6 md:gap-8 lg:grid-cols-3 items-start">
          {/* COLUMN 1: Image 1 & Image 4 */}
          <div className="flex flex-col gap-6 md:gap-8">
            <PureImageCard
              image={item1.image}
              alt={item1.title}
              aspectClass="aspect-[4/5]"
              isActive={activeImageId === item1.id}
              onClick={() => {
                setActiveImageId(item1.id);
                onSelectProject?.(item1.title);
              }}
              direction="left"
            />
            <PureImageCard
              image={item4.image}
              alt={item4.title}
              aspectClass="aspect-[16/10]"
              isActive={activeImageId === item4.id}
              onClick={() => {
                setActiveImageId(item4.id);
                onSelectProject?.(item4.title);
              }}
              direction="left"
            />
          </div>

          {/* COLUMN 2: Image 2 & Image 3 */}
          <div className="flex flex-col gap-6 md:gap-8">
            <PureImageCard
              image={item2.image}
              alt={item2.title}
              aspectClass="aspect-square lg:aspect-[4/3]"
              isActive={activeImageId === item2.id}
              onClick={() => {
                setActiveImageId(item2.id);
                onSelectProject?.(item2.title);
              }}
              direction="up"
            />
            <PureImageCard
              image={item3.image}
              alt={item3.title}
              aspectClass="aspect-square lg:aspect-[4/3]"
              isActive={activeImageId === item3.id}
              onClick={() => {
                setActiveImageId(item3.id);
                onSelectProject?.(item3.title);
              }}
              direction="up"
            />
          </div>

          {/* COLUMN 3: Image 5 & Image 6 */}
          <div className="flex flex-col gap-6 md:gap-8">
            <PureImageCard
              image={item5.image}
              alt={item5.title}
              aspectClass="aspect-[16/10]"
              isActive={activeImageId === item5.id}
              onClick={() => {
                setActiveImageId(item5.id);
                onSelectProject?.(item5.title);
              }}
              direction="right"
            />
            <PureImageCard
              image={item6.image}
              alt={item6.title}
              aspectClass="aspect-[4/5]"
              isActive={activeImageId === item6.id}
              onClick={() => {
                setActiveImageId(item6.id);
                onSelectProject?.(item6.title);
              }}
              direction="right"
            />
          </div>
        </div>

        {/* 2. MOBILE VIEW (< 768px): SCROLLABLE 3D CARD STACK */}
        <div className="block md:hidden py-4">
          <ScrollableCardStack
            items={mobileCardItems}
            cardHeight={320}
            perspective={1100}
            transitionDuration={200}
            onSelectCard={(item) => onSelectProject?.(item.name)}
          />
        </div>
      </div>
    </section>
  );
}

interface PureImageCardProps {
  image: string;
  alt: string;
  aspectClass: string;
  isActive: boolean;
  onClick: () => void;
  direction?: "left" | "right" | "up";
}

function PureImageCard({
  image,
  alt,
  aspectClass,
  isActive,
  onClick,
  direction = "up",
}: PureImageCardProps) {
  const Wrapper =
    direction === "left"
      ? SlideInLeft
      : direction === "right"
        ? SlideInRight
        : StaggerHorizontalItem;

  return (
    <Wrapper className="w-full">
      <div
        onClick={onClick}
        className={`group relative overflow-hidden border bg-primary-soft transition-all duration-300 cursor-pointer ${
          isActive
            ? "border-highlight ring-1 ring-highlight/40 shadow-lg"
            : "border-background/20 hover:border-highlight/60"
        }`}
      >
        <div className={`relative ${aspectClass} w-full overflow-hidden bg-primary`}>
          <img
            src={image}
            alt={alt}
            width={1536}
            height={960}
            loading="lazy"
            className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-primary/10 transition-opacity duration-300 group-hover:opacity-0" />
        </div>
      </div>
    </Wrapper>
  );
}
