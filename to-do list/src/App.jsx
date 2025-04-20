import { useState, useEffect } from 'react'

import { v4 as uuidv4 } from 'uuid';

function App() {

  const currentDate = new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)
  const [priority, setPriority] = useState("medium")


  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }




  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleAdd = () => {
    if (todo.trim().length <= 3) return;
    const newTodos = [...todos, {
      id: uuidv4(),
      todo: todo.trim(),
      isCompleted: false,
      priority
    }];
    setTodos(newTodos);
    setTodo("");
    saveToLS(newTodos);
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }


  return (
    < >
    <div  className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center" style={{ backgroundImage: `url('https://images.pexels.com/photos/5546885/pexels-photo-5546885.jpeg?auto=compress&cs=tinysrgb&w=600')` }}>
    <div className="backdrop-blur-sm bg-white/30 border border-white/20 p-8 rounded-2xl shadow-xl w-full  min-h-[80vh] md:w-[35%]" >
      
      <div className="addTodo my-5 flex flex-col gap-6 ">
        <h2 className='text-4xl font-bold pt-0.5'>Add a Todo: {currentDate}</h2>
        <div className="flex">

          <input onChange={handleChange} value={todo} type="text" className='border-2 border-black-500 w-md rounded-full px-5 py-1 style' />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="rounded-full px-5 py-1 border mx-2"
          >
            <option value="high">🔥 High</option>
            <option value="medium">⚠️ Medium</option>
            <option value="low">✅ Low</option>
          </select>
          <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-violet-800 mx-2 rounded-full hover:bg-violet-950 disabled:bg-violet-500 p-4 py-2 text-sm font-bold text-white'>Save</button>
        </div>
      </div>
      <input className='my-4' id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} />
      <label className='mx-2' htmlFor="show">Show Finished</label>
      <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
      <h2 className='text-2xl font-bold'>Your Todos</h2>
      <div className="todos">
        {todos.length === 0 && <div className='m-5'>No Todos to display</div>}
        {todos.map(item => {

          return (showFinished || !item.isCompleted) && <div key={item.id} className={"todo flex my-3 justify-between"}>
            <div className='flex gap-5'>
              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
              <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              <div className={`text-sm font-medium ${item.priority === 'high' ? 'text-red-600' : item.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'}`}>
                Priority: {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
              </div>
            </div>
            <div className="buttons flex h-full">
              <button onClick={(e) => handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'>✏️</button>
              <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'>🗑️</button>
            </div>
          </div>
        })}
      </div>

    </div>
    </div>
      
    </>
  )
}

export default App
