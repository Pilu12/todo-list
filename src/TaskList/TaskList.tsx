import React from 'react'
import styles from './taskList.module.scss'
import { Todo } from '../@types/todo.type'
import { start } from 'repl'
interface TaskListProps {
  doneTaskList?: boolean
  todos: Todo[]
  handleDoneTodo: (id: string, done: boolean) => void
  startEditTodo: (id: string) => void
  delTodo: (id: string) => void
}

export default function TaskList(props: TaskListProps) {
  const { doneTaskList, todos, handleDoneTodo, startEditTodo, delTodo } = props
  const handleCheckbox =
    (id: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      handleDoneTodo(id, event.target.checked)
    }

  return (
    <div>
      <h2 className={styles.title}>
        {' '}
        {doneTaskList ? 'Hoàn thành' : 'Chưa hoàn thành'}
      </h2>
      <div className={styles.tasks}>
        {todos.map((todo) => (
          <div className={styles.task} key={todo.id}>
            <input
              type='checkbox'
              className={styles.taskCheckbox}
              checked={todo.done}
              onChange={handleCheckbox(todo.id)}
            />
            <span
              className={`${styles.taskText} ${doneTaskList && styles.taskTextDone}`}
            >
              {todo.title}
            </span>
            <div className={styles.taskActions}>
              <button
                className={styles.taskBtn}
                onClick={() => {
                  startEditTodo(todo.id)
                }}
              >
                🪒
              </button>
              <button
                className={styles.taskBtn}
                onClick={() => delTodo(todo.id)}
              >
                ✖️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
