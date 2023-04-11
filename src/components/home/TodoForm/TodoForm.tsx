import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React, { memo, useCallback, useState } from "react";
import { initialTextValue, SELECT_VALUES } from "components/Home/TodoForm/const";
import { TemplateButton } from "components/Home/TodoForm/Button";
import { TextFields } from "components/Home/TodoForm/TextField";
import { SelectBox } from "components/Home/TodoForm/SelectBox/SelectBox";


export const TodoForm = memo(() => {
  /** SelectBox についての state */
  const [selectValue, setSelectValue] = useState(SELECT_VALUES[1]);
  /** TextFields についての state */
  const [textValue, setTextValue]:any[] = useState(initialTextValue);
  /** button　押下可否についての　state
   * フォームが空の時、ボタンを押下できないようにする
   */
  const [disable, setDisable] = useState(true);

    /** SelectBox の値の管理 */
  const handleChangeSelect = useCallback((event:any) => {
    setSelectValue({
      value: event.target.value,
      label: event.target.value,
    });
    setTextValue(initialTextValue);
  }, []);

  /** TextFields の値の管理 */
  const handleChangeText = useCallback((event:any) => {
    setTextValue((textValue:any) => ({
      ...textValue,
      [event.target.name]: event.target.value,
    }))
    setDisable(event.target.value === "" ? true : false);
  }, []);

  console.log(textValue);

    /** 全てのボタンの挙動の管理  */
  const handleClickButton = useCallback(() => {
    alert(`${selectValue.value}: ${textValue[selectValue.value]}`);
  }, [selectValue, textValue]);




  return (
    <>
      <SelectBox
        items={SELECT_VALUES}
        handleChange={handleChangeSelect}
        selectValue={selectValue}
      />
      <TextFields
        title={selectValue.label}
        textValue={textValue}
        handleChange={handleChangeText}
      />
      <TemplateButton
        title={selectValue}
        outputValue={textValue}
        handleClick={handleClickButton}
        disabled={disable}
      />

      <FormGroup>
        <FormControlLabel control={<Checkbox/>} label="Label" />
      </FormGroup>

    </>
  );
});
