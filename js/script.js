'use strict';
// menu button
const button = document.getElementById('burger');
const navigation = document.getElementById('menu');

button.addEventListener('click', function(){
    navigation.classList.toggle('header__nav--show');
});

// basket
const basketCounterEl = document.querySelector('.header__cartIconWrap span');
const basketTotalValueEl = document.querySelector('.header__basketTotalValue');
const basketEl = document.querySelector('.header__basket');
const basketTotalEl = document.querySelector('.header__basketTotal');

document.querySelector('.header__cartIconWrap').addEventListener('click', () => {
    basketEl.classList.toggle('hidden');
});

const basket = {};

document.querySelector('.fetured__list').addEventListener('click', event => {
    if(!event.target.closest('.item__btn')) {
        return;
    }
    const featuredItem = event.target.closest('.fetured__item');
    const id = +featuredItem.dataset.id;
    const name = featuredItem.dataset.name;
    const price = +featuredItem.dataset.price;
    addToCart(id,name,price);
});

function addToCart(id, name, price) {
    if (!(id in basket)) {
        basket[id] = {id, name, price, count: 0};
    }
    basket[id].count++;
    basketCounterEl.textContent = getTotalBasketCount().toString();
    basketTotalValueEl.textContent = getTotalBasketPrice().toFixed(2);
    renderProductInBasket(id);
}

function getTotalBasketCount() {
    return Object.values(basket).reduce((acc, product) => acc + product.count, 0);
}

function getTotalBasketPrice() {
    return Object.values(basket).reduce((acc, product) => acc + product.count * product.price, 0);
}

function renderProductInBasket(id) {
    const basketRowEl = basketEl.querySelector(`.basketRow[data-productId="${id}"]`);
    if (!basketRowEl) {
        renderNewProductInBasket(id);
        return;
    }

    const product = basket[id];
    
    basketRowEl.querySelector('.productCount').textContent = product.count;
    basketRowEl
      .querySelector('.productTotalRow')
      .textContent = (product.price * product.count).toFixed(2);
}

function renderNewProductInBasket(productId) {
    const productRow =  `
    <div class="basketRow" data-productId="${productId}">
      <div>${basket[productId].name}</div>
      <div>
        <span class="productCount">${basket[productId].count}</span> шт.
      </div>
      <div>$${basket[productId].price}</div>
      <div>
        $<span class="productTotalRow">${(basket[productId].price * basket[productId].count).toFixed(2)}</span>
      </div>
    </div>
    `;
    basketTotalEl.insertAdjacentHTML('beforebegin', productRow);
}