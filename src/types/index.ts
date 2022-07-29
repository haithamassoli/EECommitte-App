export interface Subject {
  id: number;
  name: string;
  name2: string;
  subjectLink: string;
}

type ItemType = {
  x1: number;
  y1: number;
  id: number;
  fill?: string;
  prefill?: string;
};

type DimnesionWH = {
  width: number;
  height: number;
  x2?: never;
  y2?: never;
};

type DimnesionPosition = {
  x2: number;
  y2: number;
  width?: never;
  height?: never;
};

type CircleType = ItemType & {
  shape: "circle";
  radius: number;
  x2?: never;
  y2?: never;
  width?: never;
  height?: never;
};

type RectangleType = ItemType & {
  shape: "rectangle";
  radius?: never;
};

type RectangleTypeDimensions = RectangleType &
  (DimnesionWH | DimnesionPosition);

export type MapperItem = CircleType | RectangleTypeDimensions;
