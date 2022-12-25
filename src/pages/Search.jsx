import { useEffect, useState } from 'react'
import { ForecastList } from '../cmps/forecast-list'
import { weatherService } from '../services/weather.service'



export function Search() {

    const [quary, setQuary] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [debouncedQuary, setDebouncedQuary] = useState('')
    const [location, setLocation] = useState(null)
    const [favLocations, setFaveLocations] = useState([])


    useEffect(() => {
        getFavLocations()
    }, [])

    useEffect(() => {
        let timeoutId = setTimeout(() => {
            setDebouncedQuary(quary)
        }, 500)

        return () => {
            clearTimeout(timeoutId)
        }
    }, [quary])

    useEffect(() => {
        if (debouncedQuary) {
            onAutoComplete(debouncedQuary)
        }
    }, [debouncedQuary])

    const getFavLocations = async () => {
        const locations = await weatherService.quary()
        setFaveLocations(locations)
    }

    const onAutoComplete = async (ev) => {
        if (debouncedQuary && debouncedQuary.length > 0) {
            const suggestions = await weatherService.getAutoComplete(debouncedQuary)
            setSuggestions(suggestions)
        }
    }

    const onGetLocationForecast = async (ev) => {
        ev.preventDefault()
        if (suggestions.length) {
            const location = await weatherService.getLocationForecast(suggestions[0])
            setLocation(location)
        }
    }

    const onSetQuary = (ev) => {
        setQuary(ev.target.value)
    }

    const saveLocation = async () => {
        const newLocation = await weatherService.save(location)
        const updatedFavLocations = [...favLocations, newLocation]
        setFaveLocations(updatedFavLocations)
    }

    const removeLocation = async () => {
        const updatedFavLocations = await weatherService.remove(location._id)
        setFaveLocations(updatedFavLocations)

    }


    return (
        <section className="search-page">
            <h1>Get Your Forecast</h1>
            <form action="" onClick={onGetLocationForecast} className="flex column align-center">
                <div>
                    <input type="text" placeholder='Enter city name here' autoFocus onChange={onSetQuary} list='cities' />
                    {suggestions &&
                        <datalist id='cities'>
                            {suggestions.map((suggestion, idx) => {
                                return (
                                    <option key={idx} value={suggestion.LocalizedName}>{suggestion.LocalizedName}</option>
                                )
                            })}
                        </datalist>}
                </div>
                <button className='search-btn'>Search</button>
            </form>



            {location &&
                <section>
                    {favLocations.some(currLocation => currLocation._id === location._id) ?
                        <i className="like-btn fas fa-heart liked" onClick={removeLocation}></i>
                        :
                        <i className="like-btn far fa-heart not-liked" onClick={saveLocation}></i>}
                    <ForecastList location={location} />
                </section>}
        </section>
    )
}