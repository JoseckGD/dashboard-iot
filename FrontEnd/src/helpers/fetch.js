export default function fetchAJAX(parametros) {

  let { url, settings, resSuccess, resError } = parametros;

  const controller = new AbortController();

  setTimeout(() => controller.abort(), 1000);

  fetch(url, settings)
    .then(res => { return res.ok ? res.json() : Promise.reject(res) })
    .then(json => {
      resSuccess(json)
    })
    .catch(err => {
      resError(err)
    })
}

