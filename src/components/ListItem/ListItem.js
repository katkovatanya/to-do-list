import styles from './ListItem.module.css'
import { useState, useRef, useEffect } from 'react';

const ListItem = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(props.item.text);
  const editRef = useRef(null);

  const handleEdit = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.stopPropagation();
    props.editToDo(props.item.id, newText);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave(e);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (editRef.current && !editRef.current.contains(event.target)) {
        handleSave(event);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing, newText]);

  return (
    <li className={`${styles.item} ${props.item.done ? styles.done : ''}`} key={props.item.id} onClick={() => props.toggleToDo(props.item.id)}>
      {isEditing ? (
        <div ref={editRef} className={styles.edit}>
          {/* предотвращаем всплытие события по клику на инпут, чтобы статус задачи не менялся */}
          <input type="text" value={newText} onChange={e => setNewText(e.target.value)} onKeyDown={handleKeyDown} onClick={e => e.stopPropagation()} className={styles.input} />
          <button onClick={handleSave} className={styles.saveButton}>Сохранить</button>
        </div>
      ) : (
        props.item.text
      )}
      <div className={styles.buttons}>
        <img src="./edit.png" alt="редактировать" className={styles.delete} onClick={handleEdit} />
        <img src="./delete.png" alt="удалить" className={styles.delete} onClick={(e) => {
          e.stopPropagation();
          props.removeToDo(props.item.id);
        }} />
      </div>
    </li>
  )
}

export default ListItem;
