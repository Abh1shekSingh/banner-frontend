import { useEffect, useState } from 'react';
import './Dashboard.styles.css';
import axios from 'axios'
import {useNavigate} from "react-router-dom"

function Dashboard() {
  const navigate = useNavigate();
  const [bannerData, setBannerData] = useState({});
  const [isActiveBanner, setIsActiveBanner] = useState(false);
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [timerHours, setTimerHours] = useState(0);
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/banner-info");
        setBannerData(res.data[0]);
      } catch (error) {
        console.log(error)
      }
    }
    fetchBannerData();
    setIsActiveBanner(bannerData.is_active);
    setDescription(bannerData.desc)
    setLink(bannerData.link)
  },[bannerData.desc, bannerData.is_active, bannerData.link])

  console.log(bannerData)


  const handleSendData = async(e) => {
    
    e.preventDefault();

    try {
        await axios.put("http://localhost:8800/api/banner-info", {is_active:isActiveBanner, desc:description, link:link, timer_hour:timerHours, timer_min:timerMinutes, timer_sec:timerSeconds})
        navigate("/")
    }catch(err) {
        console.log(err)
    }

  };

  const handleHoursChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 0) {
      setTimerHours(value);
    }
  };

  const handleMinutesChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 0 && value < 60) {
      setTimerMinutes(value);
    } else if (value >= 60) {
      const newHours = Math.floor(value / 60);
      setTimerHours(timerHours + newHours);
      setTimerMinutes(value % 60);
    }
  };

  const handleSecondsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 0 && value < 60) {
      setTimerSeconds(value);
    } else if (value >= 60) {
      const newMinutes = Math.floor(value / 60);
      setTimerMinutes(timerMinutes + newMinutes);
      setTimerSeconds(value % 60);
    }
  };

  return (
    <div className="dashboard">
        <h1>Dashboard</h1>
        <div className='form'>
            <div className="toggle-container">
                <label className="toggle">
                <input type="checkbox" checked={isActiveBanner} onChange={() => setIsActiveBanner(!isActiveBanner)} />
                <span className="slider round"></span>
                </label>
                <span>Active Banner</span>
            </div>
            <div className="input-container">
                <label htmlFor="description">DESCRIPTION</label>
                <textarea id="description" value={description} rows={6} cols={3} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="input-container">
                <label htmlFor="link">LINK</label>
                <input type="text" id="link" value={link} onChange={(e) => setLink(e.target.value)} />
            </div>
            <div className="timer-container">
                <h3 className='timer_heading'>TIMER</h3>
                <div className='timer_labels'>
                    <p>Hours</p>
                    <p>Minutes</p>
                    <p>Seconds</p>
                </div>
                <div className='timer_inputs'>
                    <input type="number" min="0" placeholder='00' value={timerHours} onChange={handleHoursChange} />
                    <span>:</span>
                    <input type="number" min="0" placeholder='00' max="59" value={timerMinutes} onChange={handleMinutesChange} />
                    <span>:</span>
                    <input type="number" min="0" placeholder='00' max="59" value={timerSeconds} onChange={handleSecondsChange} />
                </div>
            </div>
            <button onClick={(e) => handleSendData(e)}>Update Banner</button>
        </div>
    </div>
  );
}

export default Dashboard;
