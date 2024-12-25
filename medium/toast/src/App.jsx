import { useState } from 'react';
import './App.css';
import Toast from './Toast.jsx';

export default function() {
    const [toastMsg, setToastMsg] = useState('This is a toast message!');
    const [toastMessages, setToastMessages] = useState([]);
    const [leftOrRight, setLeftOrRight] = useState('left');
    const [topOrBottom, setTopOrBottom] = useState('top');
    const [toasterType, setToasterType] = useState('top');

    return <div className='App'>
        <div className="input-grp">
            <select name="left_right" onChange={(event) => {
                setLeftOrRight(event.target.value);
            }}>
                <option value="left">Left</option>
                <option value="right">Right</option>
            </select>
            <select name="top_bottom" onChange={(event) => {
                setTopOrBottom(event.target.value);
            }}>
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
            </select>
            <select name="toaster_type" onChange={(event) => {
                setToasterType(event.target.value);
            }}>
                <option value="normal">Normal</option>
                <option value="success">Success</option>
                <option value="error">Error</option>
                <option value="warning">Warning</option>
                <option value="info">Info</option>
            </select>
            <input type='text' defaultValue={toastMsg} onChange={(event) => {
                setToastMsg(event.target.value);
            }}/>
            <button onClick={() => {
                if(toastMsg) {
                    const newToast = {
                        id: Date.now(),
                        message: toastMsg,
                        type: toasterType,
                    };
                  
                    setToastMessages((prevMessages) => [...prevMessages, newToast]);
                }
            }}>Show Toast</button>
        </div>
        {toastMessages.length > 0 && (
            <div className="toast-message-container" style={{
                position: 'absolute',
                top: topOrBottom === 'top' ? 0 : 'unset',
                bottom: topOrBottom === 'bottom' ? 0 : 'unset',
                left: leftOrRight === 'left' ? 0 : 'unset',
                right: leftOrRight === 'right' ? 0 : 'unset'
            }}>
            {toastMessages.map(el => <Toast key={el.id} toastConfig={el} setToastMessages={setToastMessages}/>)}
            </div>
        )}
    </div>
}