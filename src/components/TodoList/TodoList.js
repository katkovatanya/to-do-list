import ListItem from "../ListItem/ListItem";
import styles from "./TodoList.module.css";

const TodoList = (props) => {
  return (
    <ul className={styles.list}>
      {props.list.map(item => {
        return (
          <ListItem toggleToDo={props.toggleToDo} removeToDo={props.removeToDo} item={item} key={item.id} />
        )
      })}
    </ul>
  )
}

export default TodoList;