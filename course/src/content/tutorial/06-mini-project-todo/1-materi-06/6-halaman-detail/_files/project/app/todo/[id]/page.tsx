import TodoDetail from "../_components/todo-detail";

export default async function DetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="mx-auto max-w-xl p-8">
      <TodoDetail id={id} />
    </main>
  );
}
