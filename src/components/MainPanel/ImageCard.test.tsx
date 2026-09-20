import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { ConvMessage } from "@/types";
import { ConvContext } from "@/context/ConvContext";
import ImageCard from "./ImageCard";

vi.mock("@/hooks/use-mobile", () => ({ useIsMobile: () => false }));
vi.mock("@douyinfe/semi-icons", () => ({ IconPlayCircle: () => null }));
vi.mock("@douyinfe/semi-ui-19", () => ({
  Button: ({ children, type }: { children: React.ReactNode; type?: string }) => <button data-button-type={type}>{children}</button>,
  Card: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="card" className={className}>{children}</div>
  ),
  Checkbox: () => null,
  Empty: () => null,
  Image: ({ style }: { style?: React.CSSProperties }) => <img alt="媒体预览" style={style} />,
  Modal: { info: vi.fn() },
  Space: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="actions" className={className}>{children}</div>
  ),
  Tag: () => null,
  Toast: { success: vi.fn() },
}));

const conv: ConvMessage = {
  index_in_conv: 1,
  bot_reply_message_id: "message",
  tts_content: "prompt",
  conversation_id: "conversation",
  message_id: "message",
  create_time: new Date(2026, 8, 20, 14, 40).getTime(),
  creation: {
    creation_type: "image",
    image: { image_ori_raw: { url: "https://example.com/image.png" }, key: "image-key", gen_params: "" },
  },
};

describe("ImageCard layout", () => {
  it("keeps the card vertical and lets the action row wrap inside it", () => {
    render(
      <ConvContext.Provider value={{
        convMessage: [conv],
        selectKeys: [],
        handleSelect: vi.fn(),
        handleDownload: vi.fn(),
        handlePlay: vi.fn(),
        handleDelete: vi.fn(),
        handleDownloadAll: vi.fn(),
        handleDownloadSelected: vi.fn(),
      }}>
        <ImageCard conv={conv} />
      </ConvContext.Provider>,
    );

    expect(screen.getByTestId("card").className).toContain("dd:flex-col");
    expect(screen.getByTestId("card").className).toContain("dd:min-w-0");
    expect(screen.getByTestId("actions").className).toContain("dd:flex-wrap");
    expect(screen.getByTestId("actions").className).toContain("dd:w-full");
    expect(screen.getByText("删除").closest("button")?.getAttribute("data-button-type")).toBe("danger");
    expect(screen.getByText("创建于 2026-09-20 14:40")).toBeTruthy();
  });
});
