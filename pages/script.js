console.log('=== script.js загружен ===');

const openModal = document.getElementById("openModal");
const modal = document.getElementById("productModal");
const closeModal = document.getElementById("closeModal");
const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const addProduct = document.getElementById("addProduct");
const productsContainer = document.getElementById("productsContainer");
const compareButton = document.querySelector('.comparison-button');

const editModal = document.getElementById("editModal");
const closeEditModal = document.getElementById("closeEditModal");
const editName = document.getElementById("editName");
const editPrice = document.getElementById("editPrice");
const saveEdit = document.getElementById("saveEdit");

const API_BASE = 'http://localhost:3000';

let currentProductId = null;

// Ранодомный градиент карточки товара
function randomGradient(){
  const gradients=[
    "linear-gradient(120deg,#667eea,#764ba2)",
    "linear-gradient(120deg,#f093fb,#f5576c)",
    "linear-gradient(120deg,#43e97b,#38f9d7)",
    "linear-gradient(120deg,#4facfe,#00f2fe)"
  ];
  return gradients[Math.floor(Math.random()*gradients.length)];
}

// Очистка полей добавления
function clearInputs() {
    productName.value = "";
    productPrice.value = "";
}

// Обработчик открытия модального окна
if(openModal){
    openModal.onclick = () => { modal.style.display="flex"; };
}

// Обработчик закрытия модального окна
if(closeModal){
    closeModal.onclick = () => {modal.style.display="none"; };
}

// Загрузка товаров для страницы прайса
async function loadProducts() {
    try {
        const response = await fetch(`${API_BASE}/products`);
        if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
        const products = await response.json();
        
        productsContainer.innerHTML = '';
        
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.style.background = randomGradient();
            
            card.innerHTML = `
                <h3>${product.name}</h3>
                <div class="product-price">${product.price} ₽</div>
                <div class="product-actions">
                    <button class="edit-product">Изменить</button>
                    <button class="delete-product">Удалить</button>
                </div>
            `;

            // Обработчик редактирования
            const editButton = card.querySelector('.edit-product');
            editButton.onclick = () => {
                currentProductId = product.id;
                editName.value = product.name;
                editPrice.value = product.price;
                editModal.style.display = 'flex';
            };

            // Обработчик удаления
            const deleteButton = card.querySelector('.delete-product');
            deleteButton.onclick = async () => {
                if (!confirm(`Удалить товар «${product.name}»?`)) return;
                try { 
                    const res = await fetch(`${API_BASE}/products/${product.id}`, { method: 'DELETE' });
                    if (!res.ok) throw new Error('Ошибка при удалении');
                    // Обновляем список
                    loadProducts();
                } catch (error) {
                    console.error('Не удалось удалить товар:', error);
                    alert('Не удалось удалить товар. Попробуйте позже.');
                }
            };

            productsContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Ошибка загрузки товаров:', error);
        productsContainer.innerHTML = '<p>Не удалось загрузить товары</p>';
    }
}

// Загрузка товаров для страницы сравнения
async function loadCompareProducts() {
    const container = document.getElementById('compareProductsContainer');
    if (!container) return;

    try {
        const response = await fetch(`${API_BASE}/products`);
        if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
        const products = await response.json();

        container.innerHTML = '';
        if (products.length === 0) {
            container.innerHTML = '<p class="no-products">Товары не найдены</p>';
            return;
        }

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.style.background = randomGradient();
            card.innerHTML = `
                <h3>${product.name}</h3>
                <div class="product-price">${product.price} ₽</div>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error('Ошибка загрузки товаров для сравнения:', error);
        container.innerHTML = '<p class="error-message">Не удалось загрузить товары</p>';
    }
}

// Добавление товара
if (addProduct) {
    addProduct.onclick = async () => {
        await fetch(`${API_BASE}/products`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: productName.value,
                price: productPrice.value
            })
        });
        modal.style.display = "none";
        clearInputs();
        loadProducts();
    };
}

// Закрытие модального окна редактирования
if (closeEditModal) {
    closeEditModal.onclick = () => { editModal.style.display = "none"; };
}

// Сохранение изменений
if (saveEdit) {
    saveEdit.onclick = async () => {
        await fetch(`${API_BASE}/products/${currentProductId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: editName.value,
                price: editPrice.value
            })
        });
        editModal.style.display = "none";
        loadProducts();
    };
}

// Загрузка данных при старте
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('productsContainer')) {
        loadProducts();
    }
    if (document.getElementById('compareProductsContainer')) {
        loadCompareProducts();
    }
});

// Обработчик кнопки Сравнение
if (compareButton) {
    compareButton.onclick = async () => {
        try {
            const response = await fetch(`${API_BASE}/products`);
            if (!response.ok) throw new Error('Ошибка загрузки товаров');
            const products = await response.json();
            const sorted = products.slice().sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            localStorage.setItem('compareResults', JSON.stringify(sorted));
            window.location.href = 'result-compare.html';
        } catch (error) {
            console.error(error);
            alert('Не удалось загрузить товары для сравнения');
        }
    };
}