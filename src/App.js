import { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  // unidades
  const SECOND = 1000;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;
  
  // timer
  const [timerDays, setTimerDays] = useState('00');
  const [timerHours, setTimerHours] = useState('00');
  const [timerMinutes, setTimerMinutes] = useState('00');
  const [timerSeconds, setTimerSeconds] = useState('00');

  let interval = useRef();

  const startTimer = () => {
    const countdownDate = new Date("Jun 7, 2022 00:00:00").getTime();

    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      const days = Math.floor(distance / DAY);
      const hours = Math.floor((distance % DAY) / HOUR);
      const minutes = Math.floor((distance % HOUR) / MINUTE);
      const seconds = Math.floor((distance % MINUTE) / SECOND);

      if(distance < 0){
        // stop timer
        clearInterval(interval.current); // useRef hook
      } else {
        // update timer
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  }

  // componentDidMount
  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval); // interval.current en el original
    }
  })

  return (
    <div className="App">
      <p>Para mi cumpleaños faltan {timerDays} días, {timerHours} horas, {timerMinutes} minutos y {timerSeconds} segundos.</p>
    </div>
  )
}

export default App;
// source https://youtu.be/ZVOGPvo08zM