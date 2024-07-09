import styles from "./Form.module.css";
import { useState } from "react";

const Form = (props) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      props.putToDo(value);
      setValue('');
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    setError(null); // Очистка ошибки при вводе
  };



  return (
    <form class={styles.form} onSubmit={handleSubmit}>
      <input type="text" placeholder="Введите текст..." className={styles.input} value={value} onChange={handleChange} />
      {error && <div className={styles.error}>{error}</div>}
      <button type="submit" className={styles.button}>Добавить задачу</button>
      <select className={styles.select} value={props.filter} onChange={e => props.setFilter(e.target.value)}>
        <option value="all">Все задачи</option>
        <option value="done">Выполненные</option>
        <option value="notDone">Невыполненные</option>
      </select>
    </form>
  )
}

export default Form;