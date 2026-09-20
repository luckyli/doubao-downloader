import type { ConvMessage, MediaType } from "@/types";

export type MediaCounts = Record<MediaType, number>;

export function filterConvsByMediaType(
  convs: ConvMessage[],
  mediaType: MediaType,
): ConvMessage[] {
  if (mediaType === "all") return convs;
  return convs.filter((conv) => conv.creation?.creation_type === mediaType);
}

export function countConvsByMediaType(convs: ConvMessage[]): MediaCounts {
  return convs.reduce<MediaCounts>(
    (counts, conv) => {
      counts.all += 1;
      if (conv.creation?.creation_type === "image") counts.image += 1;
      if (conv.creation?.creation_type === "video") counts.video += 1;
      return counts;
    },
    { all: 0, image: 0, video: 0 },
  );
}
