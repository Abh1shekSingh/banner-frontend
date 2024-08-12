import { useEffect } from "react"
import "./Timer.styles.css"
import axios from "axios"
import { useState } from "react"
const Timer = () => {

  const [timerData, setTimerData] = useState(null)
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const fetchBannerData = async() => {
      try {
        const response = await axios.get("http://localhost:8800/api/banner-info");
        setTimerData(response?.data[0])
      }catch(err) {
        console.log(err);
      }
    }
    fetchBannerData();
  }, [])
  
  useEffect(() => {
    if (timerData) {
      const { timer_hour, timer_min, timer_sec } = timerData;
      const totalSeconds = (timer_hour * 3600) + (timer_min * 60) + timer_sec;
      setTimeLeft(totalSeconds);
    }
  }, [timerData]);

  useEffect(() => {
    if (timeLeft > 0) {
      const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timeLeft]);

  const calculateTimeLeft = (timeLeft) => {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    return { hours, minutes, seconds };
  };

  const { hours, minutes, seconds } = calculateTimeLeft(timeLeft);


  return (
    <section className="banner">
      <div>
        <div>
          <div className="banner_timer_inputs">
            <div className="digit_container">
              <p>{hours}</p>
            </div>
            <div className="digit_container">
              <p>{minutes}</p>
            </div>
            <div className="digit_container">
              <p>{seconds}</p>
            </div>
          </div>
          <div className="banner_timer_labels">
            <p>Hours</p>
            <p>Minutes</p>
            <p>Seconds</p>
          </div>
        </div>
      </div>
      <div className="image_container">
        {/* <img src="https://images.unsplash.com/photo-1719562277279-83bc024e35bb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHByb2R1Y3QlMjBiYW5uZXJ8ZW58MHwwfDB8fHww" alt="deer"   /> */}
      </div>
    </section>
  )
}

export default Timer