// Controle de quantidade de compra por usuario
let minusBtn = document.querySelector('.input__minus');
let plusBtn = document.querySelector('.input__plus');
let userInput = document.querySelector('.input__number');
let userInputNumber = 0;

plusBtn.addEventListener('click', () => {
    userInputNumber++;
    userInput.value = userInputNumber;
})

minusBtn.addEventListener('click', () => {
    userInputNumber--;
    if(userInputNumber <= 0) {
        userInputNumber = 0;
    }
    userInput.value = userInputNumber;
    console.log(userInputNumber)
})

// Somar total de produtos no carro quando se pressiona o botao ADD cart
const addToCartBtn = document.querySelector('.details__button')
let cartNotification = document.querySelector('.header__cart--notification');
let lastValue = parseInt(cartNotification.innerText)

addToCartBtn.addEventListener('click',()=> {
    if(userInputNumber == 0) {
        return false
    }
    lastValue = lastValue + userInputNumber;
    cartNotification.innerText = lastValue;
    cartNotification.style.display = 'block';

        drawProductInModal();
    
})

// mostrar o modal do carrinho

const cartIconBtn = document.querySelector('.header__cart');
const cartModal = document.querySelector('.cart-modal');
// let priceModal = document.querySelector('.cart-modal__price')
const productContainer = document.querySelector('.cart-modal__checkout-container')

cartIconBtn.addEventListener('click', ()=> {
    cartModal.classList.toggle('show')

    if(lastValue <= 0) {
        productContainer.innerHTML = `<p class="cart-empty">Your cart is empty</p>`;
        cartNotification.style.display = 'none';
    } else {
        drawProductInModal();
    }

})

// apagar os detalhes do carrinho
function deleteProduct(){
    const deleteProductBtn = document.querySelector('.cart-modal__delete'); 
    deleteProductBtn.addEventListener('click', ()=>{
        productContainer.innerHTML = `<p class="cart-empty">Your cart is empty</p>`;
        lastValue = 0;
        cartNotification.innerHTML = lastValue;
        cartNotification.style.display = 'none';
        atualizaPrice()
        userInput.value = 0;
    })
}

// trocar imagem quando pressionado
const imageContainer = document.querySelector('.gallery__image-container');
const previousGalleryBtn = document.querySelector('.gallery__previous');
const nextGalleryBtn = document.querySelector('.gallery__next');
let imgIndex = 1;

previousGalleryBtn.addEventListener('click', ()=> {
    changePreviousImage(imageContainer)
})

nextGalleryBtn.addEventListener('click', ()=> {
    changeNextImage(imageContainer)
})

// mostrar o modal de imagens quando aperta na imagem principal
const imageModal = document.querySelector('.modal-gallery__background');
const closeModalBtn = document.querySelector('.modal-gallery__close');

imageContainer.addEventListener('click', () => {
    if(window.innerWidth >= 1115) {
        imageModal.style.display = 'flex';
    }
})

closeModalBtn.addEventListener('click', () => {
    imageModal.style.display = 'none';
})
imageModal.addEventListener('click', (e) => {
    console.log(e.target.classList.value)
    const fundoClick = e.target.classList.value;

    if(fundoClick == 'modal-gallery__background'){
        imageModal.style.display = 'none';
        
    }

} )

// trocar as imagens principais do thumbnails para maior em MODAL
let modalThumbnails = document.querySelectorAll('.modal-gallery__thumnail');
const modalImageContainer = document.querySelector('.modal-gallery__image-container')

modalThumbnails = [...modalThumbnails];

modalThumbnails.forEach(modalThumbnails => {
    modalThumbnails.addEventListener('click', event => {
        // console.log(event.target.id.slice(-1))
        modalImageContainer.style.backgroundImage = `url('../../images/image-product-${event.target.id.slice(-1)}.jpg')`;
    })
})

const previousModalBtn = document.querySelector('.modal-gallery__previous');
const nextModalBtn = document.querySelector('.modal-gallery__next');

nextModalBtn.addEventListener('click', ()=>{
    changeNextImage(modalImageContainer);
});

previousModalBtn.addEventListener('click', ()=>{
    changePreviousImage(modalImageContainer);
});

// Functions

function drawProductInModal() {
    productContainer.innerHTML = `<div class="cart-modal__details-container">
    <img class="cart-modal__image" src="./images/image-product-1-thumbnail.jpg" alt="">
    <div class="">
        <p class="cart-modal__product">Autumn Limited Edition...</p>
        <p class="cart-modal__price">$123.00 x3 <span>$375.00</span> </p>
    </div>
    <img class="cart-modal__delete" src="./images/icon-delete.svg" alt="">
</div>
<button class="cart-modal__checkout">Checkout</button>`
deleteProduct()
let priceModal = document.querySelector('.cart-modal__price')
priceModal.innerHTML = `$125.00 x${lastValue} <span>${lastValue * 125}.00</span>`
atualizaPrice()
}

function changeNextImage(index) {
    if(imgIndex == 4) {
        imgIndex = 1;
    } else {
        imgIndex++;
        index.style.backgroundImage = `url('../../images/image-product-${imgIndex}.jpg')`;
    }
}
function changePreviousImage(index) {
    if(imgIndex == 1) {
        imgIndex = 4;
    } else {
        imgIndex--;
        index.style.backgroundImage = `url('../../images/image-product-${imgIndex}.jpg')`;
    }
}

// Trocar as imagens clicando
let thumbnails = document.querySelectorAll('.gallery__thumnail')
thumbnails = [...thumbnails]

thumbnails.forEach(thum => {
    thum.addEventListener('click', (event) => {
        // event.target.id
        imageContainer.style.backgroundImage = `url('../../images/image-product-${event.target.id}.jpg')`;
    })
})

// mostrar o navbar menu hamburguer
const hamburgerMenu = document.querySelector('.header__menu');
const modalNavbar = document.querySelector('.modal-navbar__background');
const closeModalNavbar = document.querySelector('.modal-navbar__close-icon');

modalNavbar.style.display = 'none'

hamburgerMenu.addEventListener('click', ()=>{
    modalNavbar.style.display = 'block';
});

closeModalNavbar.addEventListener('click', ()=>{
    modalNavbar.style.display = 'none';
});
modalNavbar.addEventListener('click', e => {
    const bgNav = e.target.classList.value;
    if(bgNav == 'modal-navbar__background'){
        modalNavbar.style.display = 'none'; 
    }
})

// trocar valor da pagina inicial

const priceHome = document.querySelector('.details__prices');

priceHome.innerHTML = `<p class="details__now">$125.00 <span class="details__discount">50%</span></p>
<p class="details__before">$250.00</p>`

function atualizaPrice(){
if (lastValue > 0) {
    priceHome.innerHTML = `<p class="details__now">$${125 * lastValue}.00 <span class="details__discount">50%</span></p>
    <p class="details__before">$${250 * lastValue}.00</p>`
} else {
    priceHome.innerHTML = `<p class="details__now">$125.00 <span class="details__discount">50%</span></p>
    <p class="details__before">$250.00</p>`
}}