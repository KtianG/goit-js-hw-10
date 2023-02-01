import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import _ from 'lodash';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('input#search-box');
const country_list = document.querySelector('.country-list');
const country_info = document.querySelector('.country-info');

function listMarkupFromData(data) {
  /*
  
  function returning markup of list of countries generated from data

  */

  let markup = '';
  data.forEach(element => {
    markup += `<li class= "country-list__item">
    <img src="${element.flags.svg}" class="country-list__flag">
    <p>${element.name}</p>
    </li>`;
  });
  return markup;
}

function infoMarkupFromData(data) {
  /*

  function returning markup of card of single country generated from data

  */

  const { name, capital, population, flags, languages } = data[0];
  let languages_list = '';

  languages.forEach((element, index) => {
    if (index === 0) {
      languages_list += element.name;
    } else {
      languages_list += `, ${element.name}`;
    }
  });

  const markup = `
  <h2 class="country-info__name">
  <img src="${flags.svg}" class="country-list__flag"> ${name}
  </h2>
  <ul class="country-info__list">
  <li class="country-info__list-item"><b>Capital:</b> ${capital}</li>
  <li class="country-info__list-item"><b>Population:</b> ${population}</li>
  <li class="country-info__list-item"><b>Languages:</b> ${languages_list}</li>
  </ul>
  `;

  return markup;
}

const handleInput = () => {
  /*
  
  function handling changes in input field

  */

  if (input.value.length === 0) {
    country_list.style.display = 'none';
    country_info.style.display = 'none';
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
      if (data.length === 1) {
        //Displaying Info of single Country
        country_list.style.display = 'none';
        country_info.style.display = 'inline-block';

        country_info.innerHTML = infoMarkupFromData(data);
      } else if (data.length <= 10) {
        //Displaying list of countries
        country_list.style.display = 'inline-block';
        country_info.style.display = 'none';

        country_list.innerHTML = listMarkupFromData(data);
      } else {
        //Displaying notification of too many matches
        country_list.style.display = 'none';
        country_info.style.display = 'none';
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
    })
    .catch(error => {
      console.log(error);
      country_list.style.display = 'none';
      country_info.style.display = 'none';
      Notify.failure('Oops, there is no country with that name');
    });
};

input.addEventListener('input', _.debounce(handleInput, DEBOUNCE_DELAY));
