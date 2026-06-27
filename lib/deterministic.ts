export function seededRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

export function seededRange(seed: number, min: number, max: number) {
  return min + seededRandom(seed) * (max - min);
}
