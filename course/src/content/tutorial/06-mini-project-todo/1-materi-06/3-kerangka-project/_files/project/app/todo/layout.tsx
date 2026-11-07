import { TodoProvider } from "@/contexts/todo-context";

export default function TodoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TodoProvider>{children}</TodoProvider>;
}
