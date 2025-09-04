import { PropertyType } from "../../types";
import { FaBath, FaBed, FaChartArea } from "react-icons/fa";

export default function PropertyDescriptionSection({
  property,
}: {
  property: PropertyType;
}) {
  const card = (
    icon: React.ReactNode,
    title: string,
    value: string,
    unit?: string
  ) => {
    return (
      <div className="flex flex-col gap-2 min-w-[150px] flex-1 text-nowrap">
        <div className="flex flex-row items-center gap-2 text-gray-60">
          {icon}
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
        <p className="text-nowrap">
          {value}
          {unit}
        </p>
      </div>
    );
  };

  return (
    <div className="flex flex-row gap-4 flex-1 min-w-[400px] h-fit">
      <div className="flex flex-col gap-2 border border-gray-20 rounded-lg p-5">
        <div className="flex flex-col gap-2 border-b border-gray-20 pb-5">
          <h2 className="text-2xl font-bold">Description</h2>
          <p className="text-gray-60">{property.description}</p>
        </div>
        <div className="flex flex-row gap-2 flex-wrap items-center justify-between w-full p-5">
          {card(
            <FaBed size={20} />,
            "Bedrooms",
            property?.bedrooms?.toString().padStart(2, "0") || "0"
          )}
          {card(
            <FaBath size={20} />,
            "Bathrooms",
            property?.bathrooms?.toString().padStart(2, "0") || "0"
          )}
          {card(
            <FaChartArea size={20} />,
            "Area",
            property?.area?.toString().padStart(2, "0") || "0",
            " Square Feet"
          )}
        </div>
      </div>
    </div>
  );
}
