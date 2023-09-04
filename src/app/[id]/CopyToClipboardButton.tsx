"use client";

import { Button } from "@/components/Button";
import { FC } from "react";

interface CopyToClipboardButton {
  id: string;
}
export const CopyToClipboardButton: FC<CopyToClipboardButton> = ({ id }) => {
  const handleOnClick = async () => {
    const image = await fetch(`/${id}/opengraph-image`).then((resp) =>
      resp.blob()
    );
    await navigator.clipboard.write([
      new ClipboardItem({
        [image.type]: image,
      }),
    ]);

    alert("Copied to clipboard!");
  };
  return <Button onClick={handleOnClick}>Copy to clipboard</Button>;
};
