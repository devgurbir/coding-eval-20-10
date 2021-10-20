window.addEventListener('load', () => {
    const path = window.location.pathname
    console.log(path)
   
    if(path.includes('login')){
        const form = document.getElementById('form');
        form.addEventListener('submit', makeLoginReq)
    }
    
    
    
    if(path.includes('home.html')){
        checkValid();        
    }
});

function login(){
    event.preventDefault();
    const x = document.getElementById('form');
    const data = new FormData(x);
    const email = data.get('email');
    const password = data.get('password');
    return { email , password}
}

async function makeLoginReq(){
    const data = await login();

    return fetch(`https://reqres.in/api/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "Application/json"
        }
    }).then( res => res.json() )
    .then( res => handleToken(res.token) )
}

function handleToken(token){
    if(token){
        localStorage.setItem('token', token)
        window.location = 'home.html'   
    }
    else{
        window.location = 'register.html'   
    }    
}

function checkValid(){
    const token = localStorage.getItem('token')
    if(token){
    console.log('valid')
        return
    }
    else{
        console.log('check')
        window.location ='register.html'
    }
}

