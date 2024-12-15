import { useEffect } from "react";

const TOASTER_BACKGROUND_CONFIG = {
    'normal': 'white',
    'success': '#ecfdf3',
    'error': '#ff9797',
    'warning': '#fffcf0',
    'info': '#f0f8ff'
}

const TOASTER_TEXT_CONFIG = {
    'normal': 'gray',
    'success': '#008a2e',
    'error': '#e60000',
    'warning': '#dc7609',
    'info': '#0973dc'
}

export default function({ toastConfig, setToastMessages }) {
    const removeToaster = () => {
        setToastMessages((prevMessages) => prevMessages.filter(toastMsg => toastMsg.id !== toastConfig.id));
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            removeToaster();
        }, [3000]);

        return () => {
            clearTimeout(timer);
        }
    }, []);

    return <div className="toaster" key={toastConfig.id} style={{
        backgroundColor: TOASTER_BACKGROUND_CONFIG[toastConfig.type],
        color: TOASTER_TEXT_CONFIG[toastConfig.type]
    }}>
        {toastConfig.message} <p onClick={removeToaster}>X</p>
    </div>
}