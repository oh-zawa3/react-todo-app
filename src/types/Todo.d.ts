type Todo = {
  text: string,
  isDone: boolean,
  deadline: string
  // ... 他にも必要なものがあれば
}

type TextFieldsProps = {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  textValue: {
    todo: string;
  };
};

export {Todo, TextFieldsProps}
