import { useEffect, useState } from "react"
import Timer from "../Timer/Timer"
import "./Banner.styles.css"
import axios from "axios"

const Banner = () => {

    const [bannerData, setBannerData] = useState({});

    useEffect(() => {
        const fetchBannerDetails = async() => {
            try {
                const response  = await axios.get("http://localhost:8800/api/banner-info")
                setBannerData(response.data[0]);
            } catch (error) {
                console.log(error)
            }
        }
        fetchBannerDetails();
    }, [])
    const {is_active, descr, link } = bannerData;

  return (
    <>
    <section id="banner">
        <header>
            <img src="https://yt3.googleusercontent.com/ytc/AIdro_mdPFTT7VuJHQkvzW9gjJxvSV3bBDpEVNw8dWOmHjTT5g=s900-c-k-c0x00ffffff-no-rj" alt="TUF logo" width={100} height={100} />
            <div className="socials">
                <a href="https://www.instagram.com/striver_79/"><p>Instagram</p></a>
                <a href="https://www.youtube.com/channel/UCJskGeByzRRSvmOyZOz61ig"><p>Youtube</p></a>
                <a href="/dashboard"><p className="Dashboard">Dashboard</p></a>
            </div>
        </header>

        {is_active === 1 ? <div className="hero">
            <div>
                <h4>We&apos;re almost ready!</h4>
                <h2>Launching in..</h2>
                <div>
                    <Timer />
                </div>
                <div className="notification">
                    <p>{descr}</p>
                    <a href={link}><button>Visit</button></a>
                </div>
            </div>
            <div>
                <img src="https://i.ibb.co/SfZdTH4/3d.png" alt="child on rocket" width={500} height={500} />
            </div>
        </div> : <div className="empty">
            <h1>Not Available</h1>
            <p>(You might want to active the banner from the dashboard)</p>
            <h1 className="error">
                404
            </h1>
        </div>}
    </section>
    </>
  )
}

export default Banner