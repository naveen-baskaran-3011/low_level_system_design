import { useEffect, useState } from 'react'
import './App.css'

const NUM_REGEX = /\d/;
const UPPER_CASE_REGEX = /[A-Z]/;
const LOWER_CASE_REGEX = /[a-z]/;
const SPECIAL_CASE_REGEX = /[^A-Za-z0-9]/;

const STRENGTH_COLOR_CONFIG = {
  weak: 'red',
  medium: 'orange',
  strong: 'green'
};

function getPasswordStrength(score) {
  if(score >= 0 && score <= 5) {
    return 'weak';
  } else if(score > 5 && score <= 9) {
    return 'medium';
  } else {
    return 'strong';
  }
}

function getPasswordScore(password) {
  let score = 0;

  if(password.length > 3) {
    score += Math.min(6, Math.floor(password.length / 3));

    if(NUM_REGEX.test(password)) {
      score += 1;
    }
    if(UPPER_CASE_REGEX.test(password)) {
      score += 1;
    }
    if(LOWER_CASE_REGEX.test(password)) {
      score += 1;
    }
    if(SPECIAL_CASE_REGEX.test(password)) {
      score += 1;
    }
  }

  return score;
}

function App() {

  const [progressPercentage, setProgressPercentage] = useState(0);
  const [password, setPassword] = useState('');
  const [stregth, setStrength] = useState('weak');

  useEffect(() => {
    const score = getPasswordScore(password);
    setProgressPercentage(score);
    setStrength(getPasswordStrength(score));
  }, [password])

  return (
    <div>
      <input
        type="text"
        name="password"
        id="password"
        placeholder='Enter the password'
        style={{
          width: "320px",
          fontSize: "20px"
        }}
        onChange={(event) => {
          setPassword(event.target.value)
        }}/>
      <div style={{
          width: "320px",
          display: "flex",
          justifyContent: "space-between",
          margin: "auto"
        }}>
        <div className={`muted ${LOWER_CASE_REGEX.test(password) && 'present'}`}>Lowercase</div>
        <div className={`muted ${UPPER_CASE_REGEX.test(password) && 'present'}`}>Uppercase</div>
        <div className={`muted ${NUM_REGEX.test(password) && 'present'}`}>Number</div>
        <div className={`muted ${SPECIAL_CASE_REGEX.test(password) && 'present'}`}>Symbols</div>
      </div>
      <div className="progress-bar" style={{
        width: '320px',
        margin: 'auto',
        height: '10px',
        borderRadius: '10px',
        backgroundColor: 'white'
      }}>
        <div className='progress-bar' style={{
          background: STRENGTH_COLOR_CONFIG[`${stregth}`],
          height: '100%',
          width: `${progressPercentage * 10}%`,
          borderRadius: '10px'
        }}></div>
      </div>
      <div>
        Password has {password.length} chars <br />
        Your password is <b>{stregth}</b>
      </div>
    </div>
  )
}

export default App
