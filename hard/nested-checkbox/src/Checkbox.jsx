export default function Checkbox({ config, onChange }) {
    return <div style={{
        margin: '10px'
    }}>
        <label>
            <input type="checkbox" checked={config.checked} onChange={(event) => onChange(config.id)} />
            {config.label}
        </label>
        {config.children.map(child => <Checkbox key={child.id} config={child} onChange={onChange} />)}
    </div>
}