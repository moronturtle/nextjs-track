import TodoApp from "./_components/todo-app";
import styles from "@/styles/todo.module.css";

export default function TodoPage() {
  return (
    <main className={styles.page}>
      <h1 className="mb-2 text-3xl font-bold text-teal-900">
        Mini Project Todo
      </h1>
      <p className="mb-5 text-zinc-600">
        Daftar tugas sekarang dibaca dari server, bukan dari browser.
      </p>
      <TodoApp />
    </main>
  );
}
