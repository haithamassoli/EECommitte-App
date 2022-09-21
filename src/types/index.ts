export interface Subject {
  id: number;
  name: string;
  name2: string;
  aboutSubject?: string;
  subjectLink: string;
  fullPost?: string;
  notebook?: string;
  book?: string;
  prevYears?: string;
  slides?: string;
  explanations?: Explanation[];
  exams?: string;
  answers?: string;
}

type Explanation = {
  name: string;
  link: string;
};

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

export type Post = {
  id: number;
  body: string;
  post_id: number;
};

export type Doctor = {
  id: number;
  name: string;
  name2: string;
  email: string;
  office?: string;
  phone?: string;
  website: string;
  image: string;
};

export type Record = {
  id: number;
  subject: string;
  searchName: string;
  doctor: string;
  image: any;
  link: string;
};
