export type Todo = {
  id: number;
  text: string,
  isDone: boolean,
  deadline?: Date | null
  // ... 他にも必要なものがあれば
}
