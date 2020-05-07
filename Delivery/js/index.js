'use strict';

document.addEventListener('DOMContentLoaded', () => {

    

    

   

    new WOW().init();

    //day 1
    const cartButton = document.querySelector('#cart-button');
    const modal = document.querySelector('.modal');
    const close = document.querySelector('.close');
    const buttonAuth = document.querySelector(".button-auth");
    const modalAuth = document.querySelector('.modal-auth');
    const closeAuth = document.querySelector('.close-auth');
    const loginForm = document.querySelector('#logInForm');
    const loginInput = document.querySelector('#login');
    const userName = document.querySelector('.user-name');
    const buttonOut = document.querySelector('.button-out');
    let login = localStorage.getItem('GloStudy');
    const cardsRestarants = document.querySelector('.cards-restarants');
    const containerPromo = document.querySelector('.container-promo');
    const reustarants = document.querySelector('.reustarants');
    const menu = document.querySelector('.menu');
    const logo = document.querySelector('.logo');
    const cardsMenu = document.querySelector('.cards-menu');


    function toggleModal() {
        modal.classList.toggle("is-open");
    }

    function toogleModalAuth() {
        loginInput.borderColor = '';
        modalAuth.classList.toggle("is-open");
    };



    function authorized() {

        function logOut() {
            login = null;
            localStorage.removeItem('GloStudy');
            buttonAuth.style.display = '';
            userName.style.display = '';
            buttonOut.style.display = '';
            buttonOut.removeEventListener('click', logOut);
            checkAuth();
        };

        console.log('Авторизован');

        userName.textContent = login;
        buttonAuth.style.display = 'none';
        userName.style.display = 'inline';
        buttonOut.style.display = 'block';
        buttonOut.addEventListener('click', logOut);
    };

    function notAuthorized() {
        console.log(' Не авторизован');


        function logIn(event) {
            event.preventDefault();
                
            if(loginInput.value){
                login = loginInput.value;
                localStorage.setItem('GloStudy',login);
                toogleModalAuth();
                buttonAuth.removeEventListener('click', toogleModalAuth);
                closeAuth.removeEventListener('click', toogleModalAuth);
                loginForm.removeEventListener('submit', logIn);
                loginForm.reset();
                checkAuth();
            }
            else{
                loginInput.style.borderColor = 'red';
            }

           
        };

        buttonAuth.addEventListener('click', toogleModalAuth);
        closeAuth.addEventListener('click', toogleModalAuth);
        loginForm.addEventListener('submit', logIn);
    };

    function checkAuth() {
        if (login)
            authorized();
        else
            notAuthorized();
    };


    checkAuth();


    function createCardRestarants(){
        const card =`
        <a class="card wow fadeInUp" data-wow-delay="0.5s">
        <img class="card-image" src="./img/image2.jpg" alt="">
          <div class="card-text">
            <div class="card-heading">
                <h3 class="card-title">Тануки</h3>
                <span class="card-tag tag">60 мин</span>
            </div>
            <!-- card-heading -->
            <div class="card-info">
                <div class="rating"><img class="rating-star" src="./img/star.svg" alt="star">4.5</div>
                <div class="price">От 1200 ₽</div>
                <div class="category">Роллы</div>
            </div>
    
        </div>
        </a>    
        `;
    
        cardsRestarants.insertAdjacentHTML('beforeend',card);
    
    }
    
    createCardRestarants();
    createCardRestarants();
    createCardRestarants();


    function createCardGood(){
        const card = document.createElement('div')
        card.className = 'card';
        card.insertAdjacentHTML('beforeend', `
        
        <img src="img/pizza-plus/pizza-classic.jpg" alt="image" class="card-image"/>
        <div class="card-text">
            <div class="card-heading">
                <h3 class="card-title card-title-reg">Пицца Классика</h3>
            </div>
            <!-- /.card-heading -->
            <div class="card-info">
                <div class="ingredients">Соус томатный, сыр «Моцарелла», сыр «Пармезан», ветчина, салями,
                    грибы.
                </div>
            </div>
            <!-- /.card-info -->
            <div class="card-buttons">
                <button class="button button-primary button-add-cart">
                    <span class="button-card-text">В корзину</span>
                    <span class="button-cart-svg"></span>
                </button>
                <strong class="card-price-bold">510 ₽</strong>
            </div>
        </div>
        `);

        cardsMenu.insertAdjacentElement('beforeend',card);
    }



    function openGoods(event){
        const target = event.target;
        const restarant = target.closest('.cards-restarants');

        if (restarant){
            cardsMenu.textContent = '';
            containerPromo.classList.add('hide');
            reustarants.classList.add('hide');
            menu.classList.remove('hide');
            createCardGood();
            createCardGood();
            createCardGood();
        }

        
    }

    
    cartButton.addEventListener('click', toggleModal);

    close.addEventListener('click', toggleModal);

    cardsRestarants.addEventListener('click', openGoods);

    logo.addEventListener('click', ()=>{
        containerPromo.classList.remove('hide');
            reustarants.classList.remove('hide');
            menu.classList.add('hide');
    })
});


