export type Todo = {
  id: number;
  text: string;
  deadline: string | null; // null合体演算子を使用してデフォルト値を設定する
  completed: boolean;
}
