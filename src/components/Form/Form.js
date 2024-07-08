import styles from "./Form.module.css";
import { useState } from "react";

const Form = (props) => {
  const [value, setValue] = useState("");
  return (
    <form class={styles.form} onSubmit={e => {
      e.preventDefault();
      props.putToDo(value);
      setValue('');
    }}>
      <input type="text" placeholder="Введите текст..." className={styles.input} value={value} onChange={e => {setValue(e.target.value)}} />
    </form>
  )
}

export default Form;