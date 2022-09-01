import './css/styles.css';
import { fetchCountries, url, searchFilter } from '../src/js/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');
const searchBoxEL = document.querySelector('#search-box');
let coutrySearch;
const DEBOUNCE_DELAY = 300;

searchBoxEL.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(evt) {
  coutrySearch = searchBoxEL.value.trim();
  if (coutrySearch === '') {
    Notify.warning('Please enter contry');
    countryListEl.innerHTML = '';
    countryInfoEl.innerHTML = '';
    return;
  }
  fetchCountries(coutrySearch)
    .then(countrys => {
      if (countrys.length > 2 && countrys.length < 10) {
        countryInfoEl.innerHTML = '';
        renderCountrysCard(countrys);
      }
      if (countrys.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      if (countrys.length === 1) {
        countryListEl.innerHTML = '';
        renderOneCountryCard(countrys);
      }
    })
    .catch(error => {
      console.log(error);
    });
}

function renderCountrysCard(countrys) {
  const markup = countrys
    .map(country => {
      return `<li><img src=${country.flags.svg} alt="" width='25'> - ${country.name.official}</li>`;
    })
    .join('');
  countryListEl.innerHTML = markup;
}

function renderOneCountryCard(countrys) {
  const markup = countrys
    .map(country => {
      return `
<div class="div"> <img src="${country.flags.svg}" alt="" width='25'>
<h1>${country.name.official}</h1> </div>
<p><b>Capital:</b>${country.capital}</p>
<p><b>Population:</b>${country.population}</p>
<p><b>Languages:</b>${Object.values(country.languages)}</p>
`;
    })
    .join('');
  countryInfoEl.innerHTML = markup;
}
