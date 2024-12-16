const login = document.querySelector("#login")
const logup = document.querySelector("#logup")
const linkToLogup=login.querySelector('#link-logup')
const linkToLogin=logup.querySelector('#link-login')


if(login){
    linkToLogup.addEventListener('click', ()=>{
        login.classList.remove('flex')
        login.classList.add('hidden')
        logup.classList.remove('hidden')
        logup.classList.add('flex')
    })

    linkToLogin.addEventListener('click', ()=>{
        logup.classList.remove('flex')
        logup.classList.add('hidden')
        login.classList.remove('hidden')
        login.classList.add('flex')
    })
}