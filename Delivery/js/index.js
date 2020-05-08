'use strict';

document.addEventListener('DOMContentLoaded', () => {







    new WOW().init();

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
    const cardsRestarants = document.querySelector('.cards-restarants');
    const containerPromo = document.querySelector('.container-promo');
    const reustarants = document.querySelector('.reustarants');
    const menu = document.querySelector('.menu');
    const logo = document.querySelector('.logo');
    const cardsMenu = document.querySelector('.cards-menu');
    const restarauntTitle = document.querySelector('.restaurant-title');
    const rating = document.querySelector('.rating');
    const minPrice = document.querySelector('.price');
    const category = document.querySelector('.category');
    const modalBody = document.querySelector('.modal-body');
    const modalPrice = document.querySelector('.modal-pricetag');
    const buttonClearCart = document.querySelector('.clear-cart');
    let login = localStorage.getItem('GloStudy');

    const Cart = JSON.parse(localStorage.getItem('GloStudyCart')) || [];


    const SaveInStore = function () {
        localStorage.setItem('GloStudyCart', JSON.stringify(Cart));
    };

    const getData = async function (url) {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error at the adress ${url},
            status: ${response.status}!
            `);
        }

        return await response.json();
    }



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
            cartButton.style.display = 'none';
        };

        console.log('Авторизован');
        userName.textContent = login;
        buttonAuth.style.display = 'none';
        userName.style.display = 'inline';
        buttonOut.style.display = 'flex';
        cartButton.style.display = 'flex';
        buttonOut.addEventListener('click', logOut);
    };

    function notAuthorized() {
        console.log(' Не авторизован');


        function logIn(event) {
            event.preventDefault();

            if (loginInput.value) {
                login = loginInput.value;
                localStorage.setItem('GloStudy', login);
                toogleModalAuth();
                buttonAuth.removeEventListener('click', toogleModalAuth);
                closeAuth.removeEventListener('click', toogleModalAuth);
                loginForm.removeEventListener('submit', logIn);
                loginForm.reset();
                checkAuth();
            } else {
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


    function createCardRestarants(restarant) {

        const {
            image,
            kitchen,
            name,
            price,
            stars,
            products,
            time_of_delivery: timeOfDelivery
        } = restarant;



        const card = `
        <a class="card card-restaurants wow fadeInUp" data-wow-delay="0.5s" data-products = "${products}"
        data-info = "${[name, price, stars, kitchen]}"
        >
        <img class="card-image" src=" ${image} " alt="">
          <div class="card-text">
            <div class="card-heading">
                <h3 class="card-title">${name}</h3>
                <span class="card-tag tag">${timeOfDelivery}</span>
            </div>
            <!-- card-heading -->
            <div class="card-info">
                <div class="rating"><img class="rating-star" src="./img/star.svg" alt="star">${stars}</div>
                <div class="price">От ${price} ₽</div>
                <div class="category">${kitchen}</div>
            </div>
    
        </div>
        </a>    
        `;

        cardsRestarants.insertAdjacentHTML('beforeend', card);

    }




    function createCardGood(goods) {

        const {
            description,
            image,
            name,
            price,
            id
        } = goods;


        const card = document.createElement('div')
        card.className = 'card';
        card.classList.add('wow');
        card.classList.add('fadeInUp');
        card.classList.add('data-wow-delay="0.5s"');
        card.id = id;
        card.insertAdjacentHTML('beforeend', `
        
        <img src="${image}" alt="${name}" class="card-image"/>
        <div class="card-text">
            <div class="card-heading">
                <h3 class="card-title card-title-reg">${name}</h3>
            </div>
            <!-- /.card-heading -->
            <div class="card-info">
                <div class="ingredients">${description}
                </div>
            </div>
            <!-- /.card-info -->
            <div class="card-buttons">
                <button class="button button-primary button-add-cart" id = "${id}">
                    <span class="button-card-text">В корзину</span>
                    <span class="button-cart-svg"></span>
                </button>
                <strong class="card-price card-price-bold">${price} ₽</strong>
            </div>
        </div>
        `);

        cardsMenu.insertAdjacentElement('beforeend', card);
    }



    function openGoods(event) {
        const target = event.target;

        if (login) {

            const restarant = target.closest('.card-restaurants');

            if (restarant) {
                const info = restarant.dataset.info.split(',');
                const [name, price, stars, kitchen] = info;
                cardsMenu.textContent = '';
                containerPromo.classList.add('hide');
                reustarants.classList.add('hide');
                menu.classList.remove('hide');

                restarauntTitle.textContent = name;
                rating.textContent = stars;
                minPrice.textContent = 'От' + price + '₽';
                category.textContent = kitchen;


                getData(`./db/${restarant.dataset.products}`).then(function (data) {
                    data.forEach(createCardGood);
                });
            }
        } else {
            toogleModalAuth();
        }



    }



    function addToCart(event) {
        const target = event.target;

        const buttonAddToCart = target.closest('.button-add-cart');

        if (buttonAddToCart) {

            const card = target.closest('.card');
            const title = card.querySelector('.card-title-reg').textContent;
            const cost = card.querySelector('.card-price').textContent;
            const id = buttonAddToCart.id;

            const food = Cart.find((item) => {
                return item.id === id;
            })

            if (food) {
                food.count += 1;
            } else {
                Cart.push({
                    id,
                    title,
                    cost,
                    count: 1
                });
            }


        }

        console.log(Cart);
        SaveInStore();
    }


    function renderCart() {
        modalBody.textContent = '';

        Cart.forEach(function ({
            id,
            title,
            cost,
            count
        }) {
            const itemCart = `
        <div class="food-row">
        <span class="food-name">${title}</span>
        <strong class="food-price">${cost}</strong>
        <div class="food-counter">
            <button class="counter-button counter-minus" data-id = ${id}>-</button>
            <span class="counter">${count}</span>
            <button class="counter-button counter-plus" data-id = ${id}>+</button>
        </div>
    </div>
        `;


            modalBody.insertAdjacentHTML('afterbegin', itemCart);
        });

        const totalPrice = Cart.reduce((result, item) => result + (parseFloat(item.cost) * item.count), 0);

        modalPrice.textContent = totalPrice + ' ₽';


    }


    function changeCount(event) {
        const target = event.target;


        if (target.classList.contains('counter-button')) {

            const food = Cart.find((item) => item.id === target.dataset.id);
            if (target.classList.contains('counter-minus')) {
                food.count--;

                if (food.count === 0) {
                    Cart.splice(Cart.indexOf(food), 1);
                }

            };
            if (target.classList.contains('counter-plus')) food.count++;
            renderCart();

        }

        SaveInStore();

    }

    function init() {
        getData('./db/partners.json').then(function (data) {
            data.forEach(createCardRestarants);
        });

        cartButton.addEventListener('click', function () {
            renderCart();
            toggleModal();

        });


        buttonClearCart.addEventListener('click', function () {

            Cart.length = 0;
            renderCart();
        });

        modalBody.addEventListener('click', changeCount);

        cardsMenu.addEventListener('click', addToCart);

        close.addEventListener('click', toggleModal);

        cardsRestarants.addEventListener('click', openGoods);

        logo.addEventListener('click', () => {
            containerPromo.classList.remove('hide');
            reustarants.classList.remove('hide');
            menu.classList.add('hide');
        });
        checkAuth();
    }

    init();

});