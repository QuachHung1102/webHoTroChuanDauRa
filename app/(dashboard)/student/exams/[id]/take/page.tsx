import { notFound, redirect } from "next/navigation";
import { getExamForTaking } from "@/lib/student/queries";
import TakeExamClient from "./TakeExamClient";

export default async function TakeExamPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ attemptId?: string }>;
}) {
  const [{ id }, sp] = await Promise.all([params, searchParams]);

  if (!sp.attemptId) redirect(`/student/exams/${id}`);

  const data = await getExamForTaking(id, sp.attemptId);

  if (!data) notFound();

  return <TakeExamClient {...data} />;
}
