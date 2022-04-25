import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Image,
    Omit,
    TextInput,
 } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png'
import penIcon from '../assets/icons/pen.png'
import { Task, TasksListProps } from './TasksList';

type TaskItemProps = Omit<TasksListProps, 'tasks'> & {
    task: Task
    index: number
}

export const TaskItem = ({removeTask, toggleTaskDone, editTask, task, index}: TaskItemProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [taskNewTitleValue, setTaskNewTitleValue] = useState(task.title);
    const textInputRef = useRef<TextInput>(null)

    const handleStartEditing = () => {
        setIsEditing(true);
    }

    const handleCancelEditing = () => {
        setTaskNewTitleValue(task.title);
        setIsEditing(false);
    }

    const handleSubmitEditing = () => {
        editTask(task.id, taskNewTitleValue);
        setIsEditing(false);
    }

    useEffect(() => {
        if (textInputRef.current) {
            isEditing ? textInputRef.current.focus() : textInputRef.current.blur();
        }
    }, [isEditing])

    return (
        <>
            <View>
                <TouchableOpacity
                    testID={`button-${index}`}
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => toggleTaskDone(task.id)}
                >
                    <View
                        testID={`marker-${index}`}
                        style={task.done ? styles.taskMarkerDone : styles.taskMarker}
                    >
                        { task.done && (
                        <Icon
                            name="check"
                            size={12}
                            color="#FFF"
                        />
                        )}
                    </View>

                    <TextInput
                        style={task.done ? styles.taskTextDone : styles.taskText}
                        value={taskNewTitleValue}
                        onChangeText={setTaskNewTitleValue}
                        editable={isEditing}
                        onSubmitEditing={handleSubmitEditing}
                        ref={textInputRef}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.iconContainer}>
                { isEditing ? (
                    <TouchableOpacity
                        testID={`close-${index}`}
                        onPress={() => handleCancelEditing()} >
                            <Icon name="x" size={24} color="#b2b2b2" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        testID={`pen-${index}`}
                        onPress={() => handleStartEditing()} >
                            <Image source={penIcon}  />
                    </TouchableOpacity>
                )}

                <View style={styles.iconDivider}></View>

                <TouchableOpacity
                    testID={`trash-${index}`}
                    disabled={isEditing}
                    onPress={() => removeTask(task.id)}
                >
                    <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    height: 48
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium',
    height: 48
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    height: 48,
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconContainer: {
      flexDirection: 'row',
      marginRight: 20
  },
  iconDivider: {
    width: 1,
    height: 24,
    marginHorizontal: 12,
    backgroundColor: 'rgba(196, 196, 196, 0.4)'
  }
})
