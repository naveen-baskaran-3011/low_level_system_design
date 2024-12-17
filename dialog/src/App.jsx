import { useState } from "react"
import Dialog from "./Dialog";
import './App.css';

export default function() {
    const [closeOnClickOutside, setCloseOnClickOutside] = useState(1);
    const [closeOnEsc, setCloseOnEsc] = useState(1);
    const [showCloseIcon, setShowCloseIcon] = useState(1);
    const [showBackDrop, setShowBackDrop] = useState(1);
    const [showDialog, setShowDialog] = useState(false);
    return <div>
        <div>
            <div>
                <label htmlFor="outSideClick">Close dialog on outside click</label>
                <input
                    type="checkbox"
                    id="outSideClick"
                    defaultChecked={closeOnClickOutside}
                    onChange={() => setCloseOnClickOutside(prev => !prev)} />
            </div>
            <div>
                <label htmlFor="escClose">Close dialog on escape</label>
                <input
                    type="checkbox"
                    id="escClose"
                    defaultChecked={closeOnEsc}
                    onChange={() => setCloseOnEsc(prev => !prev)} />
            </div>
            <div>
                <label htmlFor="closeIcon">Show close icon</label>
                <input
                    type="checkbox"
                    id="closeIcon"
                    defaultChecked={showCloseIcon}
                    onChange={() => setShowCloseIcon(prev => !prev)} />
            </div>
            <div>
                <label htmlFor="backDrop">Show backdrop</label>
                <input
                    type="checkbox"
                    id="backDrop"
                    defaultChecked={showBackDrop}
                    onChange={() => setShowBackDrop(prev => !prev)} />
            </div>
            <div>
                <button onClick={() => setShowDialog(true)}>Open Modal</button>
            </div>
        </div>
        {showDialog && <Dialog
            showDialog={showDialog}
            closeOnClickOutside={closeOnClickOutside}
            closeOnEsc={closeOnEsc}
            showCloseIcon={showCloseIcon}
            showBackDrop={showBackDrop}
            onClose={() => setShowDialog(false)} />}
    </div>
}