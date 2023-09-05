import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import crypto from "crypto";
import { redirect } from "next/navigation";
import { Button } from "@/components/Button";
import { QUESTIONS_TABLE } from "./constants";

const supabaseUrl = process.env.SUPABASE_URL ?? "";
const supabaseKey = process.env.SUPABASE_KEY ?? "";

const supabase = createClient(supabaseUrl, supabaseKey);

interface Question {
  id: string;
  text: string;
}

const FORM_NAME = "question";

const handleSubmit = async (formData: FormData) => {
  "use server";
  const question = formData.get(FORM_NAME);
  const id = crypto.randomUUID();
  const { error } = await supabase
    .from(QUESTIONS_TABLE)
    .insert({ text: question, id });
  if (error) {
    console.error("Error can't create question", error);
    return;
  }
  revalidatePath("/");
  redirect(`/${id}`);
};

const getQuestions = async () => {
  const questions = await supabase
    .from(QUESTIONS_TABLE)
    .select()
    .order("created_at", { ascending: false })
    .then(({ data }) => data as Question[]);
  console.log("questions >>>", questions.length);
  return questions;
};

export default async function Questions() {
  const questions = await getQuestions();

  return (
    <>
      <form action={handleSubmit} className="mb-4">
        <label className="flex flex-col gap-2">
          <span>Add your NiceQuestion</span>
          <input
            required
            className="mb-3 w-full appearance-none rounded-lg border border-pink-500 px-3 py-2 leading-tight text-white shadow focus:outline-none"
            maxLength={200}
            name={FORM_NAME}
            type="text"
          />
        </label>
        <Button type="submit">Send a question</Button>
      </form>
      <hr className="my-6" />
      <article className="grid grid-cols-4 items-start gap-4">
        {questions.map((question) => (
          <Link href={`/${question.id}`} key={question.id}>
            <header className="rounded-t-lg bg-pink-500 p-4 text-xl">
              NiceQuestion
            </header>
            <p className="rounded-b-lg bg-white p-4 text-xl text-gray-900">
              {question.text}
            </p>
          </Link>
        ))}
      </article>
    </>
  );
}
