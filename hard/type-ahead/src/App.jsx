import TypeAheadOffline from "./TypeAheadOffline";
import TypeAheadOnline from "./TypeAheadOnline";

export default function App() {
    return <div style={{
        display: "flex"
    }}>
        <TypeAheadOffline />
        <TypeAheadOnline />
    </div>
}