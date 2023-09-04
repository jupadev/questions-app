import { ImageResponse } from "next/server";
import { QuestionsProps, getQuestion } from "./page";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Nicequestion";

export const contentType = "image/png";

// Image generation
export default async function Image({ params: { id } }: QuestionsProps) {
  const question = await getQuestion(id);
  if (!question) {
    return <div>Not found</div>;
  }
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 50,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            backgroundColor: "hotpink",
            color: "white",
            padding: 16,
            display: "flex",
            justifyContent: "center",
          }}
        >
          NiceQuestion
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            background: "white",
          }}
        >
          {question.text}
        </div>
      </div>
    ),
    // ImageResponse options
    {
      width: 800,
      height: 350,
    }
  );
}
