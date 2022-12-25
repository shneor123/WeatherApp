
import { ForecastPreview } from './forecast-preview'


export function ForecastList({ location }) {

   
    return (
        <section className='forecast-list-container'>
            <h1>{location.locationName}</h1>
            <p className='headline'>{location.forecastHeadline}</p>
            <section className="forecast-list">
                {location.forecast.map((day, idx) => {
                    if (day.date) {
                        return (
                            <ForecastPreview key={idx} forecast={day} />
                        )
                    }

                })}
            </section>
        </section>
    )
}