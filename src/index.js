import { fetchBreeds } from "./cat-api";
import { fetchCatByBreed } from "./cat-api";
import SlimSelect from 'slim-select';
import SlimSelect from "slim-select";
import 'slim-select/dist/slimselect.css';
import Notiflix from "notiflix";
import 'notiflix/dist/notiflix-3.2.6.min.css';

const refs = {
    select: document.querySelector('.breed-select'),
    wrapp: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error')
}



refs.select.style.display = 'none';
refs.loader.classList.remove('visually-hidden')
fetchBreeds()
    .then(resp => {
        const markup = resp.data.map((el) => {
            return `<option value="${el.id}">${el.name}</option>`
        }).join('');
        refs.select.insertAdjacentHTML('beforeend', markup);
    })
    .catch(() => Notiflix.Notify.failure('Oops error'))
    .finally(() => {
        refs.loader.classList.add('visually-hidden');
        refs.select.style.display = 'inline';
    });

refs.select.addEventListener('change', onSelect);

function onSelect(evt) {
    refs.select.style.display = 'none';
    refs.wrapp.innerHTML = '';
    refs.loader.classList.remove('visually-hidden')
    fetchCatByBreed(evt.currentTarget.value)
        .then(resp => {
            const data = resp.data[0];
            refs.wrapp.innerHTML = `
            <img class="image" src="${data.url}" alt="${data.breeds[0].name}">
            <div>
                <h1 class="name">${data.breeds[0].name}</h1>
                <p class="description">${data.breeds[0].description}</p>
                <p class="temperament">${data.breeds[0].temperament}</p>
            </div>`
        })
        .catch(() => Notiflix.Notify.failure('Oops error'))
        .finally(() => {
            refs.loader.classList.add('visually-hidden');
            refs.select.style.display = 'inline';
        });
}