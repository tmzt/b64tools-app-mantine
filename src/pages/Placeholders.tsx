
import React, { useRef } from "react";

import { Box, SimpleGrid, Skeleton, Stack, Text, Title } from "@mantine/core";

import "../styles/placeholders.css";
import { copyToClipboard } from "../conv/text/util/clipboard";


const GOLDEN_RATIO = 1.61803398875;
const FOUR_THREE_RATIO = 4 / 3;

const baseSizes = [100, 200, 250, 300, 350, 400, 450, 500, 600];

const squareSizes = baseSizes.map((size) => [size, size]);
const fourThreeSizes = baseSizes.map((size) => [size * FOUR_THREE_RATIO, size]);
const threeFourSizes = baseSizes.map((size) => [size, size * FOUR_THREE_RATIO]);
const goldenSizes = baseSizes.map((size) => [size, size * GOLDEN_RATIO]);
const goldenPortraitSizes = baseSizes.map((size) => [size * GOLDEN_RATIO, size]);

const placeholderSizes = [
  ...squareSizes,
  ...fourThreeSizes,
  ...threeFourSizes,
  ...goldenSizes,
  ...goldenPortraitSizes,
];

const Placeholder = ({ width, height, scale = 1.0, containerWidth }: { width: number, height: number, scale?: number, containerWidth?: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  const proportionalScale = Math.min(width, height) / 100;
  const [scaledWidth, scaledHeight] = [width / proportionalScale, height / proportionalScale];

  // const marginLeft = (scaledWidth - width) / 2;

  const cellWidth = containerWidth ? (containerWidth / 4) : undefined;
  const marginLeft = cellWidth ? (cellWidth - scaledWidth) / 2 : undefined;

  const onClick = () => {
    const dataUri = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"%3E%3Crect width="100%" height="100%" fill="lightgray" /%3E%3C/svg%3E`;
    // navigator.clipboard.writeText(dataUri);
    copyToClipboard(dataUri);

    if (ref.current) {
      ref.current.classList.add('clicked');
      setTimeout(() => {
        ref.current?.classList.remove('clicked');
      }, 200);
    }
  };

  return (
    // <Skeleton style={{ width, height }} />
    <Stack ref={ref} className="placeholderRect" style={{ width: scaledWidth, height: scaledHeight, marginLeft }} ta="center" onClick={onClick}>
      <Text size="sm" ta="center">
        {Math.floor(width)}x{Math.floor(height)}
      </Text>
    </Stack>
    );
};

export const PlaceholdersGrid = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  return (
    <SimpleGrid ref={gridRef} cols={4}>
      {/* {Array(16).map(
        (_, index) => <div key={index} style={{ width: 100, height: 100, background: "gray" }} />
      
      )} */}
      {/* {Array(15)
        .fill(0)
        .map((_, index) => (
          <Skeleton key={index} h={28} mt="sm" animate={false} />
        ))} */}

      {placeholderSizes.map(([width, height], index) => (
        <Placeholder key={index} width={width} height={height} scale={0.4} containerWidth={gridRef.current?.clientWidth} />
      ))}
    </SimpleGrid>
  );
};

export const Placeholders = () => {
    return (
      <Stack>
        <Title>Web Development Placeholders</Title>
        <Text size="sm">A grid of placeholder images with various aspect ratios. Click to copy the Data URI which you can use in any image tag or stylesheet.</Text>
        <PlaceholdersGrid />
      </Stack>
    );
};
