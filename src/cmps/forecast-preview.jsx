import { useEffect, useState } from "react"
import day from "../assets/img/day.png"
import night from "../assets/img/night.png"
import moment from "moment"
import { weatherService } from "../services/weather.service";


export function ForecastPreview({ forecast }) {
    moment().format();

    const [dayIcon, setDayIcon] = useState(null)
    const [nightIcon, setNightIcon] = useState(null)
    const [isDayOn, setIsDayOn] = useState(true)

    useEffect(() => {
        if (forecast.dayIcon < 10) setDayIcon(`0${forecast.dayIcon}`)
        else setDayIcon(forecast.dayIcon)
        if (forecast.nightIcon < 10) setNightIcon(`0${forecast.nightIcon}`)
        else setNightIcon(forecast.nightIcon)

    }, [])

    const toggleForecastTime = () => {
        setIsDayOn(!isDayOn)
    }

    return (
        <section className="preview" style={{backgroundImage: `url(${isDayOn ? day : night})`}}>
            <button className="night-day-btn" onClick={toggleForecastTime}>{isDayOn ? '🌙' : '🌞' }</button>
            <h2>{moment(forecast.date).format("MMM Do YYYY")}</h2>
            <section className="day-and-night-container flex column">
                {isDayOn && <section className="day">
                    <h3>Max temperature</h3>
                    <p>{forecast.cTemp.max} Celsius</p>
                    <div className="forecast-img-container">
                        <img src={`https://developer.accuweather.com/sites/default/files/${dayIcon}-s.png`} />
                    </div>
                </section>}
                {!isDayOn && <section className="night">
                    <h3>Min temperature</h3>
                    <p>{forecast.cTemp.min} Celsius</p>
                    <div className="forecast-img-container">
                        <img src={`https://developer.accuweather.com/sites/default/files/${nightIcon}-s.png`} />
                    </div>
                </section>}
            </section>

        </section>
    )
}