const modifyPixelSize = (pixelUnitModified: string, lambda: (unit: number) => number): string => {
  return `${lambda(Number(pixelUnitModified.slice(0, pixelUnitModified.length - 2)))}px`;
};

export const getHeaderHeightWithOffset = (offsetInPixel: number): string => {
  return modifyPixelSize(headerHeight, (heightInNumber) => heightInNumber + offsetInPixel);
};

export const getHeaderHeightPercentage = (percentage: number): string => {
  return modifyPixelSize(headerHeight, (heightInNumber) => heightInNumber * percentage);
};

export const headerHeight = '100px';
export const headerUpperPartHeight = getHeaderHeightPercentage(0.55);
export const headerBottomPartHeight = getHeaderHeightPercentage(0.45);