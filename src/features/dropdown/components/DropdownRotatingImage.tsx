'use client';

import { ComponentProps, useContext } from 'react';
import { DropdownContext } from '..';
import defaultSvg from '../icons/triangle.svg';

// 'directions' shows where the BOTTOM of the Image is
type Direction = 'top' | 'right' | 'bottom' | 'left';

type ImageProps = {
  width: number;
  height: number;
  src?: string;
  alt?: string;
} & Omit<ComponentProps<'img'>, 'src' | 'alt'>;

type Props = {
  openDirection: Direction;
  closeDirection?: Direction;
} & ImageProps;

const DropdownRotatingImage = ({
  openDirection,
  closeDirection,
  style,
  src,
  alt,
  ...imageProps
}: Props) => {
  if (!(imageProps.width && imageProps.height)) {
    throw new Error(
      'Triangle is the Image component, so it should have either ("width" && "height") || "fill" props!'
    );
  }
  const { isDropdownOpen } = useContext(DropdownContext);

  const direction = (() => {
    if (!isDropdownOpen) {
      return openDirection;
    }
    if (closeDirection) {
      return closeDirection;
    }

    switch (openDirection) {
      case 'top':
        return 'bottom';
      case 'right':
        return 'left';
      case 'bottom':
        return 'top';
      case 'left':
        return 'right';
    }
  })();

  const transform = {
    top: 'rotate(180deg)',
    right: 'rotate(270deg)',
    bottom: 'rotate(0deg)',
    left: 'rotate(90deg)',
  }[direction];

  return (
    <img
      style={{ transform, ...style }}
      src={src || defaultSvg}
      alt={alt || isDropdownOpen ? 'close' : 'open'}
      {...imageProps}
    />
  );
};
export default DropdownRotatingImage;
