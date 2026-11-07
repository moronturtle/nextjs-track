import TodoApp from "./_components/todo-app";
import styles from "@/styles/todo.module.css";

export default function TodoPage() {
  return (
    <main className={styles.halamanTodo}>
      <h1>Aplikasi Todo</h1>
      <TodoApp />
    </main>
  );
}
