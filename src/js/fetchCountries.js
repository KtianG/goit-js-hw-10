export { fetchCountries };

const filtr_options = ['name', 'capital', 'population', 'flags', 'languages'];
const start_url = 'https://restcountries.com/v2/name/';

function fetchCountries(name) {
  /*
  
  function returning fetch for list of countries containing string name

  */

  const trimmed_name = name.trim();

  let filtr = filtr_options.toString();

  const url = `${start_url}${trimmed_name}?fields=${filtr}`;
  return fetch(url);
}
