import { storageService } from './async-storage.service'


export const weatherService = {
    getAutoComplete,
    getLocationForecast,
    save,
    quary,
    remove
}

const STORAGE_KEY = 'favLocations'

async function getAutoComplete() { }
async function getLocationForecast() { }

function quary() {
    return storageService.query(STORAGE_KEY)
}

function save(location) {
    return storageService.post(STORAGE_KEY, location)
}

function remove(locationId) {
    return storageService.remove(STORAGE_KEY, locationId)
}