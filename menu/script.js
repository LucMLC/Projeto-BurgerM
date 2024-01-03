AOS.init();

//Abrir  - fechar - e finalizar compras
const cart = document.querySelector('.cart');
const fecharCart = document.querySelector('.add-itens');
const cartOpen = document.querySelector('.cart-button');
const totalDeDesconto = document.querySelector('.total-de-desconto');



//Abrir carrinho
const cartVisibel = () => {
    cart.style.opacity = 1;
};

//Fechar carrinho
const backCart = () => {
    cart.style.opacity = 0;
};

const completePurchase = document.querySelector('.finalizar-compra');

const completePurchases = () => {
    completePurchase.addEventListener('click', function () {
        // tira todos os elementos <li> do carrinho
        const itemsInCart = document.querySelectorAll('ul li');
        itemsInCart.forEach(item => item.remove());
        
        // serve para se necessário redefinir o valor total para 0
        valorTotal = 0;

        // Atualiza o conteúdo do elemento HTML que exibe o valor total
        totalDeDesconto.textContent = 'Seu valor total a pagar é R$0.00';
    });
};

// Chama a função para completar as compras
completePurchases();

// Adicionar produtos
const myUl = document.querySelector('ul');
const comprar = document.querySelectorAll('.comprar');

let valorTotal = 0;

for (let i = 0; i < comprar.length; i++) {
    comprar[i].addEventListener('click', function (event) {
        const clickedButton = event.target;
        const productContainer = clickedButton.parentElement;
        const productsPrice = parseFloat(productContainer.querySelector('.price-product').innerText.replace('R$', '').replace(',', '.').trim());
        const productName = productContainer.querySelector('.name-product').innerText;

        // Cria um novo elemento li para o novo produto
        const newProductLi = document.createElement('li');
        newProductLi.innerHTML = `${productName} - ${productsPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} <button class="remover">Remover</button>`;

        // Adiciona o novo li à ul existente
        myUl.appendChild(newProductLi);

        alert('Produto adicionado ao carrinho');

        calculateDesconto(productsPrice);

        // Adiciona evento de remoção ao novo botão de remoção
        const newRemoveButton = newProductLi.querySelector('.remover');
        newRemoveButton.addEventListener('click', function () {
            newProductLi.remove();
            calculateDesconto(-productsPrice); // Remover o desconto quando um produto é removido
        });
    });
}

// Calcular desconto
function calculateDesconto(valor) {
    if (valor > 100) {
        valor *= 0.95;
    }

    valorTotal += valor;

    totalDeDesconto.textContent = `Seu valor total a pagar é R$${valorTotal.toFixed(2)}`;
}

// Ouvintes
cartOpen.addEventListener('click', cartVisibel);
fecharCart.addEventListener('click', backCart);


