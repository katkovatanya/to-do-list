import styles from './ListItem.module.css'

const ListItem = (props) => {
  return (
  <li className={`${styles.item} ${props.item.done ? styles.done : ''}`} key={props.item.id} onClick={() => props.toggleToDo(props.item.id)}>
    {props.item.text}
    <img src="./delete.png" alt="delete" className={styles.delete} onClick={(e) => {
      e.stopPropagation();
      props.removeToDo(props.item.id);
    }} />
  </li>
  )
}

export default ListItem;