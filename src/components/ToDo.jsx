import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'antd';
import { ToDoItem } from './ToDoItem';
import { ToDoForm } from './ToDoForm';
 
const token = '78b9d28baffddc943ce761fb2d4db6e740392da2';
const config = {
  headers: { Authorization: `Bearer ${token}` }
};

export const ToDo = () => {
    const [todos, setTodos] = useState([]);
    useEffect(async () => {
    const result = await axios.get(
      `https://api.todoist.com/rest/v1/tasks`,
      config
    );

        setTodos(result.data);
    }, []);

    const onCheck = (id) => {
      const index = todos.findIndex(todo => todo.id === id);
  
      if (index !== -1) {
        const todo = todos[index];
  
        todo.checked = !todo.checked;
  
        axios.post(
          `https://api.todoist.com/rest/v1/tasks/${id}/close`,
          todo,
          config
        );
  
        todos.splice(index, 1, todo);
        setTodos([...todos]);
      }
    }

    const onRemove = (id) => {
        const index = todos.findIndex(todo => todo.id === id);
    
        if (index !== -1) {
          axios.delete(
            `https://api.todoist.com/rest/v1/tasks/${id}`,
            config
          );
          todos.splice(index, 1);
          setTodos([...todos]);
        }
      }

    const onChange = async (id) => {
      const index = todos.findIndex(todo => todo.id === id);
        
      if (index !== -1) {
        const todo = todos[index];
          
        await axios.post(
          `https://api.todoist.com/rest/v1/tasks/${id}`,
          todo,
          config
        );
        
        todos.splice(index, 1, todo);
        setTodos([...todos]);
      }
    }

    const onSubmit = async (content, due_date) => {
        const todo = { content, due_date };
    
        const { data } = await axios.post(
          `https://api.todoist.com/rest/v1/tasks`,
          todo,
          config
        );
    
        setTodos([...todos, {...todo, id: data.id}]);
      }

    const renderItems = (todos) => {
        return (
            <ul className='todo-list'>
                { todos.map(todo => {
                    return (
                        <ToDoItem item={todo} onCheck={onCheck} onRemove={onRemove} onChange={onChange} />
                    )
                }) }
            </ul>
        )
    }

    return (
        <Card title={'My todo list'}>
            <ToDoForm onSubmit={onSubmit}/>
            {
                renderItems(todos)
            }
        </Card>
    )
} 