import { useCallback, useState } from "react";
import styles from "./App.module.css";
import Form from "../Form/Form";


function App() {

  const [list, setList] = useState([]);

  const putToDo = (value) => {
    if (value) {
      setList([...list, { id: Date.now(), text: value, done: false }])
    }
    else {
      throw new Error('Значение не предоставлено');
    }
  }

  const toggleToDo = (id) => {
    setList(list.map(item => {
      if (item.id != id) {
        return item;
      }
      return {
        ...item,
        done: !item.done
      }
    }))
  }
  const removeToDo = (id) => {
    setList(list.filter(item => item.id !== id))
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>Список дел</h1>
        <Form putToDo={putToDo} />
        <ul className={styles.list}>
          {list.map(item => {
            return (
              <li className={`${styles.item} ${item.done ? styles.done : ''}`} key={item.id} onClick={() => toggleToDo(item.id)}>
                {item.text}
                <img src="./delete.png" alt="delete" className={styles.delete} onClick={(e) => {
                  e.stopPropagation();
                  removeToDo(item.id);
                }} />
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
