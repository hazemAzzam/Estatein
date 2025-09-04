import { BoltIcon } from "@heroicons/react/24/solid";
import { PropertyType } from "../../types";

export default function PropertyFeaturesSection({
  property,
}: {
  property: PropertyType;
}) {
  return (
    <div className="flex flex-row gap-4 flex-1 w-full border border-gray-20 rounded-lg p-5 h-fit">
      <div className="flex flex-col gap-5 w-full">
        <h2 className="text-2xl font-bold">Key Features and Amenities</h2>
        <div className="flex flex-col gap-5 flex-wrap w-full">
          {property?.features?.map((feature, i) => (
            <div
              key={i}
              className="bg-gray-10 w-full p-3 flex flex-row gap-2 items-center border-l border-purple-60"
            >
              <BoltIcon className="size-6" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
