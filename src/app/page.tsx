import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

const supabaseUrl = process.env.SUPABASE_URL ?? "";
const supabaseKey = process.env.SUPABASE_KEY ?? "";

const supabase = createClient(supabaseUrl, supabaseKey);

interface Question {
  id: string;
  text: string;
}

const QUESTIONS_TABLE = "questions";

const handleSubmit = async (formData: FormData) => {
  "use server";
  const question = formData.get("question");

  await supabase.from(QUESTIONS_TABLE).insert({ text: question });
  revalidatePath("/");
};

const getQuestions = async () => {
  const questions = await supabase
    .from(QUESTIONS_TABLE)
    .select()
    .order("created_at", { ascending: false })
    .then(({ data }) => data as Question[]);
  return questions;
};

export default async function Home() {
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
            name="question"
            type="text"
          />
        </label>
        <button
          className="group relative inline-block w-full text-lg"
          type="submit"
        >
          <span className="relative z-10 block overflow-hidden rounded-lg border-2 border-gray-900 px-5 py-3 font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out group-hover:text-white">
            <span className="absolute inset-0 h-full w-full rounded-lg bg-pink-50 px-5 py-3" />
            <span className="ease absolute left-0 h-48 w-48 w-full origin-top-right -translate-x-full translate-y-12 -rotate-90 bg-pink-600 transition-all duration-300 group-hover:-rotate-180" />
            <span className="relative">Send Question</span>
          </span>
          <span
            className="absolute bottom-0 right-0 -mb-1 -mr-1 h-12 w-full rounded-lg bg-pink-700 transition-all duration-200 ease-linear group-hover:mb-0 group-hover:mr-0"
            data-rounded="rounded-lg"
          />
        </button>
      </form>
      <hr className="my-6" />
      <article className="grid grid-cols-4 items-start gap-4">
        {questions.map((question) => (
          <section key={question.id}>
            <header className="rounded-t-lg bg-pink-500 p-4 text-xl">
              NiceQuestion
            </header>
            <p className="rounded-b-lg bg-white p-4 text-xl text-gray-900">
              {question.text}
            </p>
          </section>
        ))}
      </article>
    </>
  );
}
