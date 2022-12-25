import React, { useEffect, useState } from "react"
import { weatherService } from "../services/weather.service"
import { ForecastList } from "../cmps/forecast-list"


export function Favorites() {

    const [favLocations, setFavLocations] = useState(null)

    useEffect(() => {
        getFavLocations()
    }, [])

    const getFavLocations = async () => {
        const locations = await weatherService.quary()
        setFavLocations(locations)
    }

    if(!favLocations) return <h1>Loading...</h1>
    return (
        <section className="favorite-page">
            {favLocations.length ?
                <div>
                    <h1>Favorite locations</h1>
                    {favLocations.map(location => <ForecastList location={location} key={location._id} />)}
                </div>
                :
                <h1>No locations to show</h1>}
        </section>
    )

}