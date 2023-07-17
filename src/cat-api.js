import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_9PB9OKUALudUGIXYady0wOa3QcMtgOvOKMFgIxWIhiXAjF914YT57K54XRahuA2f";


export function fetchBreeds() {
    return axios.get('https://api.thecatapi.com/v1/breeds');
}

export function fetchCatByBreed(breedId) {
    return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
}