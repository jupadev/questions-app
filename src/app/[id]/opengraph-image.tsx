import { ImageResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { QuestionProp, QuestionsProps } from "./page";
import { QUESTIONS_TABLE } from "../constants";

const supabaseUrl = process.env.SUPABASE_URL ?? "";
const supabaseKey = process.env.SUPABASE_KEY ?? "";

const supabase = createClient(supabaseUrl, supabaseKey);

const getQuestion = async (id: string) => {
  const question = await supabase
    .from(QUESTIONS_TABLE)
    .select()
    .eq("id", id)
    .single()
    .then(({ data }) => data as QuestionProp);
  return question;
};

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
