let currentPage = 1;

window.addEventListener('load', () => {
    const path = window.location.pathname
    console.log(path)
   
    if(path.includes('login')){
        const form = document.getElementById('form');
        form.addEventListener('submit', makeLoginReq)
    }
    
    
    
    if(path.includes('home.html')){
        checkValid();
        const searchBtn = document.getElementById('btn')
        searchBtn.addEventListener('click', searchUsers)
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

    const searchBar = document.getElementById('search')
    const searchQuery = searchBar.value
    return fetch(`https://api.github.com/search/users?q=${searchQuery}&per_page=10&page=${currentPage}`)
    .then( res => res.json() )
    .then( res => handleUsers(res) )
}

function handleUsers(data){
    console.log(data)
    const items = data.items
    
    const parentDiv = document.querySelector('.container');
    parentDiv.innerHTML = null;

    for(let user of items){
        const div = showUserData(user.login, user.html_url)
        parentDiv.append(div)
    }

    createPagination();
}

function showUserData(name, url){    

    const div = document.createElement('div');
    div.className = 'user'
    
    const userName = document.createElement('p')
    userName.textContent = `Name: ${name}`

    const userLink = document.createElement('a')
    userLink.setAttribute('href', url)
    userLink.textContent = "Github Link"

    div.append(userName, userLink)
    return div;
}

function createPagination(){
    const pagination = document.querySelector(".pagination");
    pagination.innerHTML = null;

    const prev = document.createElement('button')
    prev.textContent = currentPage - 1;
    prev.name = currentPage - 1;
    prev.addEventListener('click', handlePagination)

    if(currentPage == 1){
        prev.disabled = true
    }

    const current = document.createElement('button')
    current.textContent = currentPage;
    current.name = currentPage;

    const next = document.createElement('button')
    next.textContent = currentPage + 1;
    next.name = currentPage + 1;
    next.addEventListener('click', handlePagination)

    pagination.append(prev, current, next)    
}

function handlePagination(){
    console.log(event.target.name);
    currentPage = parseInt(event.target.name)
    searchUsers();
    
}
