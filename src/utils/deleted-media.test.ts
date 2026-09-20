import { describe, expect, it } from "vitest";
import type { ConvMessage } from "@/types";
import { filterDeletedConvs } from "./deleted-media";

const conv = (key: string): ConvMessage => ({
  index_in_conv: 1,
  bot_reply_message_id: key,
  tts_content: key,
  conversation_id: "conversation",
  message_id: key,
  create_time: 1,
  creation: {
    creation_type: key.startsWith("video") ? "video" : "image",
    image: { image_ori_raw: { url: `https://${key}` }, key, gen_params: "" },
  },
});

describe("deleted media filtering", () => {
  it("removes only media whose stable creation key is persisted as deleted", () => {
    const convs = [conv("image-1"), conv("video-1"), conv("image-2")];

    expect(filterDeletedConvs(convs, new Set(["video-1"]))).toEqual([
      convs[0],
      convs[2],
    ]);
  });
});
