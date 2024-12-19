import { useRef, useState } from "react";

export default function App() {
    const inputRef = useRef(null);
    const [todoList, setTodoList] = useState([])

    return <div>
        <form
            onSubmit={(event) => {
                const formData = new FormData(event.target)
                setTodoList(prev => [...prev, {
                    id: Date.now(),
                    label: Object.fromEntries(formData).chip
                }]);
                inputRef.current.value = '';
                event.preventDefault();
            }}>
            <input ref={inputRef} type="text" name="chip" id="chip" placeholder="Type & hit Enter" />
        </form>
        <div className="tags-container" style={{ display: 'flex', gap: '10px', margin: '10px' }}>
            {todoList.map(eachTag => (
                <div
                    className="tag"
                    key={eachTag.id}
                    style={{ padding: '10px', backgroundColor: 'gray', borderRadius: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {eachTag.label}
                        <p style={{ color: 'darkred', cursor: "pointer" }} onClick={() => {
                            const foundIndex = todoList.findIndex(item => item.id === eachTag.id);
                            todoList.splice(foundIndex, 1);
                            setTodoList([...todoList]);
                        }}>X</p>
                </div>
            ))}
        </div>
    </div>
}