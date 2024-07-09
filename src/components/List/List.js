import ListItem from "../ListItem/ListItem";
import styles from "./List.module.css";

const List = (props) => {
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

export default List;