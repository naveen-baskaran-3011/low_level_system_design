import { useCallback, useEffect, useState } from 'react';
import './App.css';
import DayLayout from './components/DayLayout';
import MeetingLayout from './components/MeetingLayout';
import { DAY_CONFIG } from './constants/days';

function App() {

  const [perMinuteUnit, setPerMinuteUnit] = useState(0);

  const perMinUnitCalculator = useCallback(() => {
    let calendarContainer = document.querySelector('[data-test-container]');
    setPerMinuteUnit((calendarContainer.getBoundingClientRect().height / 12) / 60);
    console.log('calendarContainer', calendarContainer.getBoundingClientRect().height);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', perMinUnitCalculator);

    return () => {
      window.removeEventListener('resize', perMinUnitCalculator);
    }
  }, []);

  return (
    <div className="full-page-application" data-test-container="true">
      <DayLayout config={DAY_CONFIG}/>
      <MeetingLayout perMinuteUnit={perMinuteUnit}/>
    </div>
  );
}

export default App;
