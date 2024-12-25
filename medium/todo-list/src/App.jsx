import { useRef, useState } from "react";

export default function App() {
    const inputRef = useRef(null);
    const [ todoList, setTodoList ] = useState([]);
    const currentTodoRef = useRef({
        id: 'new',
        text: '',
        isCompleted: false
    })
    const insertIntoTodoListFn = () => {
        const todoConfig = currentTodoRef.current;
        const foundTodo = todoList.find(todo => todo.id === todoConfig.id);

        if(foundTodo) {
            foundTodo.text = inputRef.current.value;
            setTodoList([...todoList]);
        } else {
            todoConfig.id = Date.now();
            todoConfig.text = inputRef.current.value;
            setTodoList(prev => [...prev, todoConfig]);
        }

        inputRef.current.value = '';
        currentTodoRef.current = {
            id: 'new',
            text: '',
            isCompleted: false
        };
        document.getElementById('sumbit').innerText = 'Submit';
    };

    const markAsCompleted = (id) => {
        const foundTodo = todoList.find(todo => todo.id === id);
        foundTodo.isCompleted = !foundTodo.isCompleted;
        setTodoList([...todoList]);
    }

    const onEdit = (id) => {
        const foundTodo = todoList.find(todo => todo.id === id);
        currentTodoRef.current = {...foundTodo};
        inputRef.current.value = foundTodo.text;
        document.getElementById('sumbit').innerText = 'Update';
    }

    const onDelete = (id) => {
        const foundTodo = todoList.findIndex(todo => todo.id === id);
        todoList.splice(foundTodo, 1);
        setTodoList([...todoList]);
    }

    const onCancel = () => {
        inputRef.current.value = '';
        currentTodoRef.current = {
            id: 'new',
            text: '',
            isCompleted: false
        };
        document.getElementById('sumbit').innerText = 'Submit';
    }

    return <div>
        <input ref={inputRef} type="text" name="todoText" id="todoText" />
        <div className="btn-grp">
            <button id="sumbit" onClick={insertIntoTodoListFn} style={{
                padding: '5px',
                backgroundColor: 'lightgray',
                marginRight: '10px',
                marginTop: '10px',
                borderRadius: '10px'
            }}>Submit</button>
            <button
                onClick={onCancel}
                style={{
                    padding: '5px',
                    backgroundColor: 'lightgray',
                    borderRadius: '10px'
                }}

            >Cancel</button>
        </div>
        <div className="todo-container" style={{
            marginTop: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
        }}>
            {todoList.map(todo => (
                <div key={todo.id} style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center"
                }}>
                    <div style={{
                        userSelect: "none",
                        textDecoration: todo.isCompleted ? 'line-through' : 'none'
                    }} onDoubleClick={() => markAsCompleted(todo.id)}>{todo.text}</div>
                    <div>
                        <button
                            style={{
                                padding: '5px',
                                backgroundColor: 'blue',
                                marginRight: '10px',
                                borderRadius: '10px',
                                color: 'white'
                            }}
                            onClick={() => onEdit(todo.id)}>Edit</button>
                        <button
                            style={{
                                padding: '5px',
                                backgroundColor: 'red',
                                borderRadius: '10px',
                                color: 'white'
                            }}
                            onClick={() => onDelete(todo.id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
}