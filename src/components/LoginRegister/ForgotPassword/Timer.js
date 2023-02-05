import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Timer = () => {
    const Ref = useRef(null);
    const [timer, setTimer] = useState('00:01');
    const navigate = useNavigate();

    if (timer === '00:00') navigate('/login');

    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        return {
            total,
            minutes,
            seconds
        };
    };

    const startTimer = (e) => {
        let { total, minutes, seconds } = getTimeRemaining(e);
        if (total >= 0) {
            setTimer(
                (minutes > 9 ? minutes : '0' + minutes) +
                    ':' +
                    (seconds > 9 ? seconds : '0' + seconds)
            );
        }
    };

    const clearTimer = (e) => {
        setTimer('00:10');
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000);
        Ref.current = id;
    };

    const getDeadTime = () => {
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + 10);
        return deadline;
    };

    useEffect(() => {
        clearTimer(getDeadTime());
    }, []);

    return timer;
    // return (
    //     <div className="App">
    //         <h2>{timer}</h2>
    //     </div>
    // );
};

export default Timer;
