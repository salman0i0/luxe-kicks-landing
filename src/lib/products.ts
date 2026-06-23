import s1 from "@/assets/sneaker-1.png";
import s2 from "@/assets/sneaker-2.png";
import s3 from "@/assets/sneaker-3.png";
import s4 from "@/assets/sneaker-4.png";
import s5 from "@/assets/sneaker-5.png";
import s6 from "@/assets/sneaker-6.png";
import j1 from "@/assets/jordan-1.png";
import j2 from "@/assets/jordan-2.png";
import j3 from "@/assets/jordan-3.png";
import j4 from "@/assets/jordan-4.png";

export type Category = "Basketball" | "Running" | "Lifestyle";
export type Accent = "red" | "blue" | "white";

export type Product = {
  id: string;
  name: string;
  tag: string;
  price: number;
  image: string;
  accent: Accent;
  category: Category;
  description: string;
  material: string;
  colorway: string;
  sizes: number[];
  isNew?: boolean;
};

const SIZES = [7, 8, 9, 10, 11, 12];

export const products: Product[] = [
  {
    id: "1",
    name: "Air Legacy 01",
    tag: "New",
    price: 189,
    image: s1,
    accent: "red",
    category: "Basketball",
    description:
      "Court-tested high-top with encapsulated air cushioning and a hand-finished leather upper. Built for explosive cuts and feather landings.",
    material: "Premium full-grain leather upper · TPU midfoot shank · Rubber outsole",
    colorway: "Crimson / Bone / Black",
    sizes: SIZES,
    isNew: true,
  },
  {
    id: "2",
    name: "Flux Runner",
    tag: "Hot",
    price: 159,
    image: s2,
    accent: "blue",
    category: "Running",
    description:
      "Lightweight jogger engineered for daily miles. Energy-return foam paired with a breathable engineered mesh keeps every stride efficient.",
    material: "Engineered knit mesh · React foam midsole · Carbon rubber pods",
    colorway: "Cobalt / White",
    sizes: SIZES,
  },
  {
    id: "3",
    name: "Mono High",
    tag: "Essential",
    price: 139,
    image: s3,
    accent: "white",
    category: "Lifestyle",
    description:
      "Monochrome high-top crafted for everyday wear. Soft suede paneling and a vulcanized sole make it the go-anywhere staple.",
    material: "Brushed suede & canvas · Vulcanized rubber sole",
    colorway: "Triple White",
    sizes: SIZES,
  },
  {
    id: "4",
    name: "Strike White",
    tag: "Drop",
    price: 169,
    image: s4,
    accent: "red",
    category: "Running",
    description:
      "Daily trainer with a propulsive rocker geometry. Designed for tempo runs and long miles without losing pop.",
    material: "Recycled mesh upper · PEBAX foam plate · Continental rubber",
    colorway: "White / Crimson Flash",
    sizes: SIZES,
  },
  {
    id: "5",
    name: "Court Cobalt",
    tag: "Limited",
    price: 199,
    image: s5,
    accent: "blue",
    category: "Basketball",
    description:
      "Low-profile hooper with a herringbone outsole and a snug bootie construction for elite court feel.",
    material: "Synthetic leather · Zoom Air unit · Herringbone rubber",
    colorway: "Cobalt / Black / Volt",
    sizes: SIZES,
  },
  {
    id: "6",
    name: "Retro Heat",
    tag: "Archive",
    price: 179,
    image: s6,
    accent: "red",
    category: "Lifestyle",
    description:
      "Reissue of a hardwood classic. Premium tumbled leather, plush collar, and original retro tooling.",
    material: "Tumbled leather upper · OG foam midsole · Gum rubber outsole",
    colorway: "Varsity Red / Black",
    sizes: SIZES,
  },
  {
    id: "j1",
    name: "Air Legacy '85 Bred",
    tag: "Just Dropped",
    price: 229,
    image: j1,
    accent: "red",
    category: "Basketball",
    description:
      "Heritage high-top with hand-finished red leather, an encapsulated Air unit, and a tuned rubber outsole for hardwood traction.",
    material: "Hand-finished leather · Encapsulated Air · Heritage rubber",
    colorway: "Bred / Bone",
    sizes: SIZES,
    isNew: true,
  },
  {
    id: "j2",
    name: "Royal Court High",
    tag: "Members First",
    price: 219,
    image: j2,
    accent: "blue",
    category: "Basketball",
    description:
      "Royal blue tumbled leather upper paired with a translucent icy outsole. Wing logo, padded ankle collar.",
    material: "Tumbled leather · Translucent rubber · Padded collar",
    colorway: "Royal / White",
    sizes: SIZES,
    isNew: true,
  },
  {
    id: "j3",
    name: "Panda Concord",
    tag: "Restock",
    price: 199,
    image: j3,
    accent: "white",
    category: "Lifestyle",
    description:
      "Iconic black-and-white panda colorway with a refined finish. Wear-anywhere everyday silhouette.",
    material: "Pebbled leather · EVA midsole · Rubber outsole",
    colorway: "Black / White",
    sizes: SIZES,
    isNew: true,
  },
  {
    id: "j4",
    name: "Crimson Flight V",
    tag: "Limited",
    price: 249,
    image: j4,
    accent: "red",
    category: "Basketball",
    description:
      "Modern flight silhouette with a sculpted heel counter and full-length Zoom Air. Numbered limited release.",
    material: "Engineered leather · Full-length Zoom · Carbon shank",
    colorway: "Crimson / Black",
    sizes: SIZES,
    isNew: true,
  },
];

export const CATEGORIES: ("All" | Category)[] = ["All", "Basketball", "Running", "Lifestyle"];

export const getNewDrops = () => products.filter((p) => p.isNew);
export const getByCategory = (c: "All" | Category) =>
  c === "All" ? products : products.filter((p) => p.category === c);
