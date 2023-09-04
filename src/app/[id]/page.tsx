import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { CopyToClipboardButton } from "./CopyToClipboardButton";

const supabaseUrl = process.env.SUPABASE_URL ?? "";
const supabaseKey = process.env.SUPABASE_KEY ?? "";

const supabase = createClient(supabaseUrl, supabaseKey);

interface Question {
  id: string;
  text: string;
}

const QUESTIONS_TABLE = "questions";

export const getQuestion = async (id: string) => {
  const question = await supabase
    .from(QUESTIONS_TABLE)
    .select()
    .eq("id", id)
    .single()
    .then(({ data }) => data as Question);
  return question;
};

export interface QuestionsProps {
  params: {
    id: string;
  };
}

export default async function Question({ params: { id } }: QuestionsProps) {
  const question = await getQuestion(id);
  if (!question) {
    return <div>Not found</div>;
  }
  return (
    <div className="grid gap-4">
      <Link href="/"> Back</Link>
      <article className="grid items-start">
        <header className="rounded-t-lg bg-pink-500 p-4 text-xl">
          NiceQuestion
        </header>
        <p className="rounded-b-lg bg-white p-4 text-xl text-gray-900">
          {question.text}
        </p>
      </article>
      <CopyToClipboardButton id={question.id} />
    </div>
  );
}
