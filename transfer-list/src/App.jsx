import { useState } from "react";
import * as styles from "./App.module.css";

export default function App() {
    const [firstList, setFirstList] = useState([
        { id: 1, label: 'USA', checked: true, listType: '1' },
        { id: 2, label: 'UAE', checked: false, listType: '1' },
        { id: 3, label: 'India', checked: false, listType: '1' },
        { id: 4, label: 'Australia', checked: true, listType: '1' },
        { id: 5, label: 'Canada', checked: false, listType: '1' }
    ]);

    const sendAllToSecond = () => {
        firstList.forEach(item => {
            item.listType = '2';
            item.checked = false;
        });
        setFirstList([...firstList]);
    };
    const sendAllToFirst = () => {
        firstList.forEach(item => {
            item.listType = '1';
            item.checked = false;
        });
        setFirstList([...firstList]);
    };
    const individualSendToSecond = () => {
        firstList.forEach(item => {
            if(item.checked && item.listType === '1') {
                item.listType = '2';
            }
        });
        setFirstList([...firstList]);
    };
    const individualSendToFirst = () => {
        firstList.forEach(item => {
            if(item.checked && item.listType === '2') {
                item.listType = '1';
            }
        });
        setFirstList([...firstList]);
    };

    return <div className={styles['container']}>
        <div className={`first-list ${styles["list"]}`}>
            {firstList.filter(item => item.listType === '1').map(item => (
                <div key={item.id}>
                    <input
                        type="checkbox"
                        name={item.label}
                        id={item.label}
                        defaultChecked={item.checked}
                        onChange={(event) => {
                            item.checked = event.target.checked;
                        }} />
                    <label htmlFor={item.label}>{item.label}</label>
                </div>
            ))}
        </div>
        <div className={styles["operators"]}>
            <button onClick={sendAllToSecond}>{'>>'}</button>
            <button onClick={individualSendToSecond}>{'>'}</button>
            <button onClick={individualSendToFirst}>{'<'}</button>
            <button onClick={sendAllToFirst}>{'<<'}</button>
        </div>
        <div className={`second-list ${styles["list"]}`}>
            {firstList.filter(item => item.listType === '2').map(item => (
                <div key={item.id}>
                    <input
                        type="checkbox"
                        name={item.label}
                        id={item.label}
                        defaultChecked={item.checked}
                        onChange={(event) => {
                            item.checked = event.target.checked;
                        }} />
                    <label htmlFor={item.label}>{item.label}</label>
                </div>
            ))}
        </div>
    </div>
}