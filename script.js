window.addEventListener('load', () => {
    const form = document.getElementById('form');
    form.addEventListener('submit', makeLoginReq)
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
    .then( res => console.log(res) )
}

