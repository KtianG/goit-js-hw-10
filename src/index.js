import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import _ from 'lodash';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('input#search-box');
const country_list = document.querySelector('.country-list');
const country_info = document.querySelector('.country-info');

function listMarkupFromData(data) {
  let markup = '';
  data.forEach(element => {
    markup += `<li class= "country-list__item">
    <img src="${element.flags.svg}" class="country-list__flag">
    <p>${element.name}</p>
    </li>`;
  });
  return markup;
}

const handleInput = () => {
  if (input.value.length === 0) {
    return;
  }
  fetchCountries(input.value)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      if ((data.length < 10) & (data.length > 1)) {
        console.log(data);
        country_list.innerHTML = listMarkupFromData(data);
      }
    })
    .catch(error => console.log(error));
};

input.addEventListener('input', _.debounce(handleInput, 1000));
