import { useState } from "react"

export default function App() {
    const [value, setValue] = useState('');
    const formatInput = (event) => {
        let value = [...(event.target.value || '')].filter(el => Number.isInteger(+el) && el !== ' ');
        value = value.join('');
        if(value.length > 3) {
            value = `+(${value.slice(0,3)}) - ${value.slice(3)}`
        }
        setValue(value);
    };
    return <div>
        <input
            type="tel"
            value={value}
            maxLength={16}
            onChange={formatInput} />
    </div>
}