export type Todo = {
  text: string,
  isCompleted: boolean,
  deadline?: Date | null
  isSometimes?: boolean;
  isDeleted: boolean;
  // ... 他にも必要なものがあれば
}
