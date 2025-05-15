import React, { useState } from 'react'
import styles from './taskInput.module.scss'
import { Todo } from '../@types/todo.type'
interface TaskInputProps {
  addTodo: (title: string) => void
  curTodo: Todo | null
  editTodo: (id: string, title: string) => void
  finishedEditTodo: () => void
}
export default function TaskInput(props: TaskInputProps) {
  const { addTodo, curTodo, editTodo, finishedEditTodo } = props
  const [title, setTitle] = useState<string>('')
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (curTodo) {
      finishedEditTodo()
    } else {
      addTodo(title)
    }

    setTitle('')
  }
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (curTodo) editTodo(curTodo.id, value)
    else setTitle(value)
  }
  return (
    <div>
      <h1 className={styles.title}>To do list typescript</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='caption goes here'
          value={curTodo ? curTodo.title : title}
          onChange={handleChangeInput}
        />
        <button type='submit'>{curTodo ? '✔️' : '➕'}</button>
      </form>
    </div>
  )
}
