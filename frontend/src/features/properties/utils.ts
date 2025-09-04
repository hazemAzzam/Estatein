// features/properties/utils.ts

const PROPERTY_IMAGES = [
  "/assets/villa.png",
  "/assets/villa-2.png",
  "/assets/villa-3.png",
  "/assets/home.png",
  "/assets/management.png",
  "/assets/smart.png",
  "/assets/value.png",
  "/assets/Abstract Design.png",
  "/assets/Container.png",
  "/assets/stars.png",
];

export async function getRandomImage(): Promise<string> {
  const randomIndex = Math.floor(Math.random() * PROPERTY_IMAGES.length);
  return PROPERTY_IMAGES[randomIndex];
}

export async function getRandomImages(count: number): Promise<string[]> {
  const images: string[] = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * PROPERTY_IMAGES.length);
    images.push(PROPERTY_IMAGES[randomIndex]);
  }
  return images;
}
