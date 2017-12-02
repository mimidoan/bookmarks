
function main() {

    const logout = document.querySelector('#logout');

    logout.addEventListener('load', function(evt) {
      login.classList.remove('invisible');
      logout.classList.add('invisible');
    });

    const login = document.querySelector('#login');

    login.addEventListener('load', function(evt) {
      login.classList.add('invisible');
      logout.classList.remove('invisible');
    });
}

// function handleLoging() {
//   const login = document.querySelector('#login');
//   login.classList.add('invisible');
//
//   const logout = document.querySelector('#logout');
//   logout.classList.remove('invisible');
// }



document.addEventListener('DOMContentLoaded', main);


//
// const navbar = document.querySelector('.navbar');
// console.log(navbar);
//
// // create new nav item
// const newItem = document.createElement('span');
// newItem.classList.add('nav-item', 'active');
//
//
// // append nav-link to nav-item
//
// const newLink = document.createElement('a');
// newLink.setAttribute('href', '/logout');
// newLink.classList.add('nav-link');
// newLink.textContent = 'Logout';
//
// newItem.appendChild(newLink);
// navbar.appendChild(newItem);

// const confirmPg = document.querySelector('#confirm');
// if(confirmPg) {
