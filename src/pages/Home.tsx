import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const isEmpty = (task: String) => task.trim().length === 0;

  function handleAddTask(newTaskTitle: string) {
    if (isEmpty(newTaskTitle)) return

    const task = tasks.find(t => t.title === newTaskTitle)
    if (task) {
        Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma tarefa que já existe')
        return
    }

    const data = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false
    }

    setTasks(oldTasks => [...oldTasks, data])
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({...task}))

    const task = updatedTasks.find(task => task.id === id)
    if (!task) return
    task.done = !task.done

    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {
    setTasks(oldTasks => oldTasks.filter(task => task.id !== id))
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})
