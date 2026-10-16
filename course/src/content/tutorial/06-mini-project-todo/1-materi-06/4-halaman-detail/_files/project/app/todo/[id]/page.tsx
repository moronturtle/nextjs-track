import DetailTodo from "./detail-todo";

export default async function DetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="mx-auto max-w-xl p-8">
      <DetailTodo id={id} />
    </main>
  );
}
