// features/properties/utils.ts

export async function getRandomImage(): Promise<string> {
  const res = await fetch("https://dog.ceo/api/breeds/image/random", {
    cache: "no-store", // make sure it's fresh every call
  });
  const data = await res.json();
  return data.message as string;
}

export async function getRandomImages(count: number): Promise<string[]> {
  const promises = Array.from({ length: count }, () => getRandomImage());
  return Promise.all(promises);
}
