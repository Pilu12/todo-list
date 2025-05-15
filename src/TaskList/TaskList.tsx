import React from 'react'
import styles from './taskList.module.scss'
interface TaskListProps {
  doneTaskList?: boolean
}

export default function TaskList(props: TaskListProps) {
  const { doneTaskList } = props
  return (
    <div>
      <h2 className={styles.title}> Chưa hoàn thành</h2>
      <div className={styles.tasks}>
        <div className={styles.task}>
          <input type='checkbox' className={styles.taskCheckbox} />
          <span
            className={`${styles.taskText} ${doneTaskList && styles.taskTextDone}`}
          >
            task 1
          </span>
          <div className={styles.taskActions}>
            <button className={styles.taskBtn}>🪒</button>
            <button className={styles.taskBtn}>✖️</button>
          </div>
        </div>
      </div>
    </div>
  )
}
