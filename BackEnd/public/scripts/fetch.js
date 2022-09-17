export default function fetchAJAX(parametros){

    let {url, settings, resSuccess, resError} = parametros;

    fetch(url, settings)
    .then(res=>{return res.ok?res.json():Promise.reject(res)})
    .then(json=>{
        if(json.Success !== false){
            resSuccess(json)
        }else{
            console.error("Huvo un Error:", json.message)
        }
    })
    .catch(err=>{
        resError(err)
    })

}