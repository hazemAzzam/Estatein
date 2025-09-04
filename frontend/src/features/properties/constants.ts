import { PropertyType } from "./types";

export const PROPERTIES: PropertyType[] = [
  {
    id: "1",
    title: "Seaside Serenity Villa",
    description:
      "A stunning 4-bedroom, 3-bathroom villa in a peaceful suburban neighborhood",
    bedrooms: 4,
    bathrooms: 3,
    area: 2000,
    keywords: ["4-Bedroom", "3-Bathroom", "Villa"],
    thubnail: "/assets/villa.png",
    location: "Malibu, California",
    price: 550000,
    features: ["Swimming Pool", "Gym", "BBQ Area", "Parking"],
  },
  {
    id: "2",
    title: "Metropolitan Haven",
    description:
      "A chic and fully-furnished 2-bedroom apartment with panoramic city views",
    bedrooms: 2,
    bathrooms: 2,
    area: 1000,
    keywords: ["2-Bedroom", "2-Bathroom", "Apartment"],
    thubnail: "/assets/villa-2.png",
    location: "Beverly Hills, California",
    price: 450000,
    features: ["Swimming Pool", "Gym", "BBQ Area", "Parking"],
  },
  {
    id: "3",
    title: "Rustic Retreat Cottage",
    description:
      "An elegant 3-bedroom, 2.5-bathroom townhouse in a gated community",
    keywords: ["3-Bedroom", "2.5-Bathroom", "Townhouse"],
    bathrooms: 2.5,
    area: 1500,
    bedrooms: 3,
    thubnail: "/assets/villa-3.png",
    location: "Santa Monica, California",
    price: 650000,
    features: ["Swimming Pool", "Gym", "BBQ Area", "Parking"],
  },
  {
    id: "4",
    title: "Urban Luxury Penthouse",
    description:
      "A modern 3-bedroom penthouse with stunning city skyline views",
    keywords: ["3-Bedroom", "3-Bathroom", "Penthouse"],
    bathrooms: 3,
    area: 1500,
    bedrooms: 3,
    thubnail: "/assets/home.png",
    location: "Downtown LA, California",
    price: 850000,
    features: ["Swimming Pool", "Gym", "BBQ Area", "Parking"],
  },
  {
    id: "5",
    title: "Coastal Family Home",
    description:
      "A spacious 5-bedroom family home with ocean views and private beach access",
    keywords: ["5-Bedroom", "4-Bathroom", "Family Home"],
    bathrooms: 4,
    area: 2500,
    bedrooms: 5,
    thubnail: "/assets/management.png",
    location: "Venice Beach, California",
    price: 1200000,
    features: ["Swimming Pool", "Gym", "BBQ Area", "Parking"],
  },
];
