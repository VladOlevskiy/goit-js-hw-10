import { Notify } from 'notiflix/build/notiflix-notify-aio';
export const url = 'https://restcountries.com/v3.1/name/';
export const searchFilter = 'name,capital,population,flags,languages';

export function fetchCountries(name) {
  return fetch(`${url}${name}?fields=${searchFilter}`).then(response => {
    if (response.ok == false) {
      Notify.failure('Oops, there is no country with that name');
      return;
    }

    return response.json();
  });
}
