import fetchAJAX from './fetch.js';
import validations from './validations_css.js'
import {signalToValidation} from './validations_css.js'


validations();

let urlOrigin = location.origin;

const $tabla = document.querySelector('.tabla'),
      $template = document.getElementById('row-device').content,
      $fragment = document.createDocumentFragment(),
      $form = document.getElementById('form-devices')

const cargarTabla = ()=>{
    $tabla.querySelector('tbody').textContent = "";
    fetchAJAX({
        url:`${urlOrigin}/selectdevices`,
        resSuccess : (res)=>{
            
            res.result.forEach(el=>{

                $template.querySelector('#id').textContent = el.id_dispositivo;
                $template.querySelector('#nombre').textContent = el.nombre;
                $template.querySelector('#tipo').textContent = el.tipo;
                $template.querySelector('#estado').textContent = el.estado;
                $template.querySelector('#nombre_planta').textContent = el.nombre_planta;
                $template.querySelector('#data_medida').textContent = el.dato_medida;

                $template.querySelector('.eliminar').dataset.id = el.id_dispositivo;

                $template.querySelector('.actualizar').dataset.data = el.id_dispositivo;
                $template.querySelector('.actualizar').dataset.data += `$.$.$` + el.nombre;
                $template.querySelector('.actualizar').dataset.data += `$.$.$` + el.tipo;
                $template.querySelector('.actualizar').dataset.data += `$.$.$` + el.estado;
                $template.querySelector('.actualizar').dataset.data += `$.$.$` + el.nombre_planta;
                $template.querySelector('.actualizar').dataset.data += `$.$.$` + el.dato_medida;



                let $cloneTemplate = $template.cloneNode(true);

                $fragment.appendChild($cloneTemplate);
            })

            $tabla.querySelector('tbody').appendChild($fragment);

        },
        resError : (err)=>{
            console.log(err)
        }
    })

}

cargarTabla();


document.addEventListener('click', e=>{
    if(e.target.matches('.eliminar')){

        fetchAJAX({
            url:`${urlOrigin}/deletedevice/${e.target.dataset.id}`,
            settings : {
                method:'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            },
            resSuccess : (res)=>{
                console.log(res)
                cargarTabla();
            },
            resError : (err)=>{
                console.log(err)
            }
        }) 
    }

    if(e.target.matches('#cancelar')){
        e.preventDefault();
        $form.reset();
        document.getElementById("idDevice").value = ""
        document.querySelector('.form').classList.remove('is-active');
        document.querySelector('.opacity').classList.remove('is-active');
    }

    if(e.target.matches('#new')){
        document.getElementById("idDevice").value = ""
        document.querySelector('.form').classList.add('is-active');
        document.querySelector('.opacity').classList.add('is-active');        
    }

    if(e.target.matches('.actualizar')){

        const [id, nombre, tipo, estado, planta, variable] = e.target.dataset.data.split('$.$.$');
        
        $form.querySelector('#nombre').value = nombre;
        $form.querySelector('#tipo').value = tipo;
        $form.querySelector('#estado').value = estado;
        $form.querySelector('#nombre_planta').value = planta;
        $form.querySelector('#variable_medida').value = variable;
        $form.querySelector('#idDevice').value = id;

        document.querySelector('.form').classList.add('is-active');
        document.querySelector('.opacity').classList.add('is-active');        
    }

})


document.addEventListener('submit', e=>{
    if(e.target.matches('#form-devices')){

        e.preventDefault();

        const data = {
            nombre : e.target.querySelector('#nombre').value,
            tipo : e.target.querySelector('#tipo').value,
            estado : e.target.querySelector('#estado').value,
            nombre_planta : e.target.querySelector('#nombre_planta').value,
            variable_medida : e.target.querySelector('#variable_medida').value
        };

        if(document.getElementById("idDevice").value === "" && signalToValidation){
            fetchAJAX({
                url:`${urlOrigin}/insertdevice`,
                settings : {
                    method:'POST',
                    headers : {
                        'Content-Type':'application/json'
                    },
                    body : JSON.stringify(data)
                },
                resSuccess : (res)=>{
                    document.querySelector('.sk-flow').classList.add('is-active');
    
                    if(res.success == true){
                        document.querySelector('.sk-flow').classList.remove('is-active');
                        document.querySelector('.warn').textContent = res.message;
                        document.querySelector('.warn').classList.add('is-active');
    
                        setTimeout(()=>{
                            document.querySelector('.warn').classList.remove('is-active');
                        }, 2000);
                        
                        e.target.reset();
                        cargarTabla();
                    }else{
                        document.querySelector('.warn').textContent = res.message;
                        document.querySelector('.warn').classList.add('.is-active');
                    }
                },
                resError : (err)=>{
                    console.log(err)
                }
            }) 
        }else if(document.getElementById("idDevice").value !== "" && signalToValidation){
            fetchAJAX({
                url:`${urlOrigin}/updatedevice/${document.getElementById("idDevice").value}`,
                settings : {
                    method:'PUT',
                    headers : {
                        'Content-Type':'application/json'
                    },
                    body : JSON.stringify(data)
                },
                resSuccess : (res)=>{
                    document.querySelector('.sk-flow').classList.add('is-active');
    
                    if(res.success == true){
                        document.querySelector('.sk-flow').classList.remove('is-active');
                        document.querySelector('.warn').textContent = res.message;
                        document.querySelector('.warn').classList.add('is-active');
    
                        setTimeout(()=>{
                            document.querySelector('.warn').classList.remove('is-active');
                        }, 2000);
    
                        cargarTabla();
                    }else{
                        document.querySelector('.sk-flow').classList.remove('is-active');
                        document.querySelector('.warn').textContent = res.message;
                        document.querySelector('.warn').classList.add('is-active');
                    }
                },
                resError : (err)=>{
                    console.log(err)
                }
            })
        }
        
    }
})