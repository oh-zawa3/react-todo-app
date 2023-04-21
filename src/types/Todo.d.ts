type Todo = {
  text: string,
  isDone: boolean,
  deadline: string
  // ... 他にも必要なものがあれば
}

type TodoFormProps = {
  onClick: (todo: Todo) => void;
}

type TextFieldsProps = {
  title: string;
  textValue: { todo: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export {Todo, TodoFormProps, TextFieldsProps}
