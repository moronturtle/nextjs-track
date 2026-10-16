import TodoApp from "./todo-app";

export default function TodoPage() {
  return (
    <main className="mx-auto max-w-xl p-8">
      <h1 className="text-3xl font-bold">Todo Saya</h1>
      <div className="mt-6">
        <TodoApp />
      </div>
    </main>
  );
}
