import fetchAJAX from './fetch.js';

const urlOrigin = location.origin;


if(location.pathname === '/'){
    fetchAJAX({
        url:`${urlOrigin}/userauth`,        
        resSuccess : (res)=>{
            console.log(res)
            
            if(res.success == false){
                location.href = './pages/login.html';
            }
        },
        resError : (err)=>{
            console.log(err)
        }
    })
}else if(location.pathname === '/pages/login.html'){
    let band = 0;

    fetchAJAX({
        url:`${urlOrigin}/userauth`,        
        resSuccess : (res)=>{
            console.log(res)
            
            if(res.success == true){
                location.href = '/';
            }
        },
        resError : (err)=>{
            console.log(err)
        }
    })

    const loginForm = document.getElementById('login-form');

    document.addEventListener('submit', e=>{
            e.preventDefault();  
    
            if(e.target === loginForm){
    
                const data = {
                    nombre : (e.target.querySelector('#exampleInputText').value).toLowerCase(),
                    contrasena : e.target.querySelector('#exampleInputPassword').value,
                };
                    
                fetchAJAX({
                    url:`${urlOrigin}/selectuserauth`,
                    settings : {
                        method:'POST',
                        headers : {
                            'Content-Type':'application/json'
                        },
                        body : JSON.stringify(data)
                    },
                        
                    resSuccess : (res)=>{
                        console.log(res)
                        
                        if(res.success == true){
                            location.href = '/';
                            e.target.reset();
                        }else{
                            document.querySelector('.warn-auth').textContent = res.message;
                            document.querySelector('.warn-auth').classList.add('is-active')
                        }
                    },
                    resError : (err)=>{
                        console.log(err)
                    }
                })
    
            }
    
    })

}else{
    fetchAJAX({
        url:`${urlOrigin}/userauth`,        
        resSuccess : (res)=>{
            console.log(res)
            
            if(res.success == false){
                location.href = '../pages/login.html';
            }
        },
        resError : (err)=>{
            console.log(err)
        }
    })
}

//AL CERRAR SESION
document.addEventListener('click', e=>{
    if(e.target.matches('#close-session') || e.target.matches('#close-session *')){
 
       fetchAJAX({
          url:`${urlOrigin}/deleteusuerauth`,        
          resSuccess : (res)=>{
             console.log(res)
              
             if(res.success == true){
                location.href = '../pages/login.html';
             }
          },
          resError : (err)=>{
             console.log(err)
          }
       })

    }
})




