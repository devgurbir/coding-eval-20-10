window.addEventListener('load', () => {
    const path = window.location.pathname
    console.log(path)
   
    if(path.includes('login')){
        const form = document.getElementById('form');
        form.addEventListener('submit', makeLoginReq)
    }
    
    
    
    if(path.includes('home.html')){
        checkValid();
        searchUsers();
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

function searchUsers(){
    // const apiKey = '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'
    //https://api.github.com/users/octocat
    return fetch('https://api.github.com/search/users?q=gurbir&per_page=10')
    .then( res => res.json() )
    .then( res => handleUsers(res) )
}

function handleUsers(data){
    const items = data.items
    for(let user of items){
        showUserData(user.login, user.html_url)
    }
}

function showUserData(name, url){
    const parentDiv = document.querySelector('.container');
    
    const user = document.createElement('p')
    user.textContent = `Name: ${name}, URL: ${url}`

    parentDiv.append(user)
}
