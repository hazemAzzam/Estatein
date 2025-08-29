"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

function useResponsiveItems() {
  const [itemsPerPage, setItemsPerPage] = useState(1);

  const cardSize = 460;

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < cardSize * 2) setItemsPerPage(1); // mobile
      else if (window.innerWidth < cardSize * 3) setItemsPerPage(2); // tablet
      else setItemsPerPage(3);
    }
    handleResize(); // run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return itemsPerPage;
}

type SliderProps = {
  Items: React.ReactNode[];
};

export const Slider = ({ Items }: SliderProps) => {
  const [page, setPage] = useState(0);
  const itemsPerPage = useResponsiveItems();

  const totalPages = Math.ceil((Items?.length | 0) / itemsPerPage);

  const start = page * itemsPerPage;
  const end = start + itemsPerPage;
  const visibleProperties = Items.slice(start, end);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <div className="flex flex-col w-full">
      {/* Cards */}
      <div className="flex flex-row justify-around items-center  flex-nowrap gap-4 h-[500px] bg-gray-08 justify-items-center overflow-hidden">
        {visibleProperties.map((Item, i) => (
          <div key={i}>{Item}</div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between mt-4 items-center border-t py-2 border-t-gray-20">
        <div className="flex flex-row gap-1">
          <span className="text-white">{page + 1}</span>
          <span className="text-gray-60">of {totalPages}</span>
        </div>
        <div className="flex flex-row gap-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={page === 0}
            className="px-2 py-2 cursor-pointer bg-gray-20 rounded-full disabled:opacity-50"
          >
            <ArrowLeft />
          </button>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
            disabled={page === totalPages - 1}
            className="px-2 py-2 cursor-pointer bg-gray-20 rounded-full disabled:opacity-50"
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};
