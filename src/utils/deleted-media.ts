import type { ConvMessage } from "@/types";

export function filterDeletedConvs(
  convs: ConvMessage[],
  deletedKeys: ReadonlySet<string>,
): ConvMessage[] {
  return convs.filter((conv) => !deletedKeys.has(conv.creation?.image.key ?? ""));
}
