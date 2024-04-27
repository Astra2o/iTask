import React, { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import Navbar from './components/Navbar';

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const todoString = localStorage.getItem('todos');
    console.log('retrieve'+todoString);
    if (todoString) {
      try {
        const storedTodos = JSON.parse(todoString);
        setTodos(storedTodos);
      } catch (error) {
        console.error('Error parsing todos from local storage:', error);
      }
    }
  }, []);
 
  const saveLocally = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
    console.log('save localstorage');
  };
 
  const handleEdit = (e, id) => {
    const selectedTodo = todos.find(item => item.id === id);
    if (selectedTodo) {
      setTodo(selectedTodo.todo);
      const updatedTodos = todos.filter(item => item.id !== id);
      setTodos(updatedTodos);
      // localStorage.setItem('todos', JSON.stringify(todos));

      // saveLocally();
      console.log('edit');
    }
  };

  const handleDelete = (e, id) => {
    const updatedTodos = todos.filter(item => item.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(todos.filter(item => item.id !== id)));
    console.log('delete');
  };

  const handleAdd = () => {
    if (todo.trim() !== '') {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
      setTodo('');
            localStorage.setItem('todos', JSON.stringify([...todos, { id: uuidv4(), todo, isCompleted: false }]));

      // saveLocally();
      
      console.log('add');
    }
  };

  const handleChange = e => {
    setTodo(e.target.value);
  };

  const handleCheckbox = id => {
    const updatedTodos = todos.map(todoItem =>
      todoItem.id === id ? { ...todoItem, isCompleted: !todoItem.isCompleted } : todoItem
    );
    setTodos(updatedTodos);
    // saveLocally();
          localStorage.setItem('todos', JSON.stringify(updatedTodos));

    console.log('checkchange');
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };
  return (
    <>
      <Navbar />
      <div className="mx-auto flex flex-col bg-zinc-800 text text-zinc-100  lg:my-10 h-screen md:h-full py-5 rounded-xl p-5 lg:w-1/2   min-h-[80vh]">
        <div className="addtodo my-5">
          <h2 className="text-lg font-bold">Add a Task</h2>
          <input autoFocus onKeyPress={handleKeyPress} onChange={handleChange} value={todo} type="text" className=" rounded-md border bg-transparent border-zinc-100 px-3 min-w-72" />
          <button
            onClick={handleAdd}
            disabled={todo.trim() === ''}
            className="bg-[#CDEA68] hover:bg-[#b8db39] text-md text-zinc-900 font-semibold p-3 py-1 text-md  rounded-md mx-6"
          >
            Add
          </button>
        </div>
        <h1 className="text-xl font-bold">Your Tasks</h1>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">no tasks to display</div>}
          {todos.map(item => (
            <div key={item.id} className="todo flex justify-between my-3">
              <div className="flex capitalize text-lg gap-5">
                <input
                  name={item.id}
                  checked={item.isCompleted}
                  onChange={() => handleCheckbox(item.id)}
                  type="checkbox"
                  className=' border bg-red-400 text-[#CDEA68]'
                />
                <div className={item.isCompleted ? 'line-through' : ''}>{item.todo}</div>
              </div>
              <div className="buttons">
                <button
                  onClick={e => {
                    handleEdit(e, item.id);
                  }}
                  className="bg-[#CDEA68] hover:bg-[#b8db39] px-2 py-1 text-md text-zinc-900 font-semibold rounded-md mx-1"
                >
                  Edit
                </button>
                <button
                  onClick={e => {
                    handleDelete(e, item.id);
                  }}
                  className="bg-[#CDEA68] hover:bg-[#b8db39] px-2 py-1 text-md text-zinc-900 font-semibold rounded-md mx-1"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
