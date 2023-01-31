export { fetchCountries };

const filtr_options = ['name', 'capital', 'population', 'flags', 'languages'];
const start_url = 'https://restcountries.com/v2/name/';

function fetchCountries(name) {
  const trimmed_name = name.trim();

  let filtr = filtr_options.toString();

  const url = `${start_url}${trimmed_name}?fields=${filtr}`;
  console.log(url);
  return fetch(url);
}
