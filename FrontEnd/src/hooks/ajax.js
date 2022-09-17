

//Hook which will help us to make request to the server :)
export const Ajax = function (obj) {

  let { url, settings, Success, Error } = obj;

  fetch(url, settings)
    .then((res) => res.ok ? res.json() : Promise.reject(res))
    .then((json) => {
      Success(json)
    })
    .catch((err) => {
      Error(err)
    })

}