import Axios from 'axios'

import {storageService} from './async-storage.service'

export const weatherService = {
    getAutoComplete,
    getLocationForecast,
    save,
    quary,
    remove
}

async function getAutoComplete(debouncedQuary) {
    const { data } = await Axios.get(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?q=${debouncedQuary}&apikey=Q7d7nPAYi0atAkAxYALsE9wF9paB76dm`)
    return data
}

async function getLocationForecast(location) {
    if(location.Key) location.key = location.Key
    const {data} = await Axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${location.key}?apikey=Q7d7nPAYi0atAkAxYALsE9wF9paB76dm`)
    const forecast = data.DailyForecasts.map(day => {
        return (
            {
                date: day.Date,
                dayIcon: day.Day.Icon,
                nightIcon: day.Night.Icon,
                fTemp: {
                    min: day.Temperature.Minimum.Value,
                    max: day.Temperature.Maximum.Value
                },
                cTemp: {
                    min: ((day.Temperature.Minimum.Value-32)/1.8).toFixed(1),
                    max: ((day.Temperature.Maximum.Value-32)/1.8).toFixed(1)
                }
            }
        )
    })
   
    const locationForecast = {
        _id: location.key,
        forecastHeadline: data.Headline.Text,
        locationName: location.LocalizedName,
        forecast: forecast
    }
    return Promise.resolve(locationForecast)
}

function quary() {
    return storageService.query('favLocations')
} 

function save(location) {
    return storageService.post('favLocations', location)
}

function remove(locationId) {
    return storageService.remove('favLocations', locationId)
}