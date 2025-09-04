"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import React from "react";

import clsx from "clsx";
import { ArrowLeft, ArrowRight, Minus } from "lucide-react";

type GalleryProps = {
  images: string[];
};

export default function Gallery({ images }: GalleryProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="flex flex-col items-center gap-4 p-5 bg-gray-10 rounded-lg">
      <div className="grid grid-cols-9 gap-2 w-full">
        {images.map((img, idx) => (
          <AspectRatio
            key={idx}
            ratio={4 / 3}
            className={clsx(
              "rounded-lg overflow-hidden opacity-50 hover:opacity-100",
              idx === current - 1 && "ring-2 ring-primary opacity-100"
            )}
            onClick={() => api?.scrollTo(idx)}
          >
            <Image
              src={img}
              alt={`Property image ${idx + 1}`}
              fill
              className="object-cover"
            />
          </AspectRatio>
        ))}
      </div>

      <Carousel className="w-full border-0 rounded-full" setApi={setApi}>
        {/* Main large image */}
        <CarouselContent>
          {images.map((img, idx) => (
            <CarouselItem key={idx} className={"w-full"}>
              <AspectRatio
                key={idx}
                ratio={20 / 10}
                className="rounded-lg overflow-hidden"
              >
                <Image
                  src={img}
                  alt={`Property image ${idx + 1}`}
                  fill
                  className="object-fill"
                />
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious className="absolute bottom-0" />
        <CarouselNext /> */}
      </Carousel>

      <div className="flex flex-row items-center text-muted-foreground text-center bg-gray-08 w-fit rounded-full p-2">
        <button
          className={clsx(
            "p-2 border border-gray-20 rounded-full ",
            api?.canScrollPrev()
              ? "cursor-pointer hover:text-primary"
              : "opacity-50 cursor-not-allowed"
          )}
          onClick={() => api?.scrollTo(api.selectedScrollSnap() - 1)}
        >
          <ArrowLeft />
        </button>
        {Array.from({ length: count }, (_, i) => i + 1).map((num) => (
          <Minus
            key={num}
            className={clsx(
              "cursor-pointer hover:text-primary",
              num === current && "!text-purple-60 font-bold"
            )}
            onClick={() => api?.scrollTo(num - 1)}
          />
        ))}
        <button
          className={clsx(
            "p-2 border border-gray-20 rounded-full ",
            api?.canScrollNext()
              ? "cursor-pointer hover:text-primary"
              : "opacity-50 cursor-not-allowed"
          )}
          onClick={() => api?.scrollTo(api.selectedScrollSnap() + 1)}
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}
