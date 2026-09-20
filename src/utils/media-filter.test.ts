import { describe, expect, it } from "vitest";
import type { ConvMessage } from "@/types";
import { countConvsByMediaType, filterConvsByMediaType } from "./media-filter";

const conv = (creation_type: "image" | "video", message_id: string): ConvMessage => ({
  index_in_conv: 1,
  bot_reply_message_id: message_id,
  tts_content: message_id,
  conversation_id: "conversation",
  message_id,
  create_time: 1,
  creation: {
    creation_type,
    image: {
      image_ori_raw: { url: `https://${message_id}` },
      key: message_id,
      gen_params: "",
    },
  },
});

describe("media filtering", () => {
  const convs = [
    conv("image", "image-1"),
    conv("video", "video-1"),
    conv("image", "image-2"),
  ];

  it("filters all, images, and videos", () => {
    expect(filterConvsByMediaType(convs, "all")).toHaveLength(3);
    expect(filterConvsByMediaType(convs, "image").map((item) => item.message_id)).toEqual([
      "image-1",
      "image-2",
    ]);
    expect(filterConvsByMediaType(convs, "video").map((item) => item.message_id)).toEqual([
      "video-1",
    ]);
  });

  it("counts images and videos independently of the active type", () => {
    expect(countConvsByMediaType(convs)).toEqual({ all: 3, image: 2, video: 1 });
  });
});
