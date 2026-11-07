import TodoDetail from "../_components/todo-detail";

export default async function TodoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <TodoDetail id={id} />;
}
