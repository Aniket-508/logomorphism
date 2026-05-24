import type { Category } from "@/constants/logos";

export const R2_BUCKET_NAME = "logomorphism";

export const getLogoObjectKey = (category: Category, id: string) =>
  `${category}/${id}.png`;

export const getAudioObjectKey = (category: Category, id: string) =>
  `${category}/${id}.mp3`;
