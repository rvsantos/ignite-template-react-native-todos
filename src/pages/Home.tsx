import React, { useState } from 'react';
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

  function handleEditTask(id: number, taskNewTitle: string) {
    const updatedTasks = tasks.map(task => ({...task}))

    const task = updatedTasks.find(task => task.id === id)

    if (!task) {
        Alert.alert('Tarefa não encontrada', 'Não foi possível encontrar a tarefa para editar')
        return
    }

    task.title = taskNewTitle

    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {
      Alert.alert('Remover tarefa', 'Você tem certeza que deseja remover esta tarefa?', [
          {
                text: 'Cancelar',
                style: 'cancel'
          },
          {
                text: 'Remover',
                style: 'destructive',
                onPress: () => {
                    setTasks(oldTasks => oldTasks.filter(task => task.id !== id))
                }
          }
      ])
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
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
