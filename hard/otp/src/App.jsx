import { useCallback, useRef, useState } from "react";
import styles from "./App.module.css";

const NUMBER_OF_OTP_FIELDS = 6;
const NUMBER_REGEX = /[0-9]/;

export default function App() {
    const inputRefs = useRef(Array(NUMBER_OF_OTP_FIELDS).fill(null));
    const [otpValueArray, setOtpValueArray] = useState(Array(NUMBER_OF_OTP_FIELDS).fill(''));
    const onChangeHandler = useCallback((index, value) => {
        if(NUMBER_REGEX.test(value)) {
            otpValueArray[index] = value;
            setOtpValueArray([...otpValueArray]);
            let indexToFocus = index + 1 < NUMBER_OF_OTP_FIELDS ? index + 1: index;
            inputRefs.current[indexToFocus].focus();
        }
    }, [otpValueArray]);

    return <div className={styles['otp-container']}>
        {otpValueArray.map((value, index) => <input
            ref={(el) => (inputRefs.current[index] = el)}
            onKeyDown={(e) => {
                let indexToFocus;
                if(e.key === 'ArrowRight') {
                    indexToFocus = index + 1 < NUMBER_OF_OTP_FIELDS ? index + 1: 0;
                } else if(e.key === 'ArrowLeft') {
                    indexToFocus = index - 1 >= 0 ? index - 1: NUMBER_OF_OTP_FIELDS - 1;
                } else if(e.key === 'Backspace') {
                    otpValueArray[index] = '';
                    setOtpValueArray([...otpValueArray]);
                    indexToFocus = index - 1 >= 0 ? index - 1: 0;
                } else {
                    onChangeHandler(index, e.key);
                }
                indexToFocus!== undefined && inputRefs.current[indexToFocus].focus();
            }}
            onChange={e => {}}
            onPaste={(event) => {
                const pastableData = event.clipboardData.getData('text');
                if((/^[0-9]*$/).test(pastableData)) {
                    for(let i=0; i<Math.min(pastableData.length, NUMBER_OF_OTP_FIELDS); i++) {
                        otpValueArray[i] = pastableData[i];
                    }

                    setOtpValueArray([...otpValueArray]);
                }

                event.preventDefault();
            }}
            key={index}
            type="text"
            value={otpValueArray[index]} />
        )}
    </div>
}