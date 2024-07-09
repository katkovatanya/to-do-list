import { useCallback, useState, useEffect } from "react";
import styles from "./App.module.css";
import Form from "../Form/Form";
import TodoList from "../TodoList/TodoList";


function App() {

  //localStorage может хранить только строки
  const [list, setList] = useState(JSON.parse(localStorage.getItem('todoList')) || []);
  const [filter, setFilter] = useState("all");
  const [filtered, setFiltered] = useState(list);

  const todoFilter = (status, listToFilter) => {
    switch (status) {
      case 'all':
        setFiltered(listToFilter);
        break;
      case 'done':
        let doneList = listToFilter.filter(item => item.done);
        setFiltered(doneList);
        break;
      case 'notDone':
        let notDoneList = listToFilter.filter(item => !item.done);
        setFiltered(notDoneList);
        break;
      default:
        console.log('Неизвестный статус: ', status);
    }
  };

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(list));
    todoFilter(filter, list);
  }, [filter, list]);

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
    const newList = list.filter(item => item.id !== id);
    todoFilter(filter, newList);
    setList(newList);
  }

  const editToDo = (id, newText) => {
    setList(list.map(item => {
      if (item.id !== id) {
        return item;
      }
      return {
        ...item,
        text: newText
      }
    }))
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>Список дел</h1>
        <Form putToDo={putToDo} filter={filter} setFilter={setFilter} />
        <TodoList list={filtered} toggleToDo={toggleToDo} removeToDo={removeToDo} editToDo={editToDo}/>
      </div>
    </div>
  );
}

export default App;
