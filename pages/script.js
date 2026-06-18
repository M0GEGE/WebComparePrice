
const openModal =
document.getElementById("openModal");

const modal =
document.getElementById("productModal");

const closeModal =
document.getElementById("closeModal");

const productName =
document.getElementById("productName");

const productPrice =
document.getElementById("productPrice");

const addProduct =
document.getElementById("addProduct");

const productsContainer =
document.getElementById("productsContainer");

function randomGradient(){

    const gradients = [

        "linear-gradient(120deg,#667eea,#764ba2)",

        "linear-gradient(120deg,#f093fb,#f5576c)",

        "linear-gradient(120deg,#43e97b,#38f9d7)",

        "linear-gradient(120deg,#4facfe,#00f2fe)",

        "linear-gradient(120deg,#fa709a,#fee140)",

        "linear-gradient(120deg,#30cfd0,#330867)"

    ];


    return gradients[
        Math.floor(Math.random()*gradients.length)
    ];

}

function clearInputs(){

    productName.value = "";

    productPrice.value = "";

}

async function loadProducts(){

    if(!productsContainer){

        return;

    }

    const response =
    await fetch(
        "http://localhost:3000/products"
    );

    const products =
    await response.json();

    productsContainer.innerHTML = "";

    products.forEach(product=>{

        const card =
        document.createElement("div");

        card.className =
        "product-card";
        
        card.style.background =
        randomGradient();

        card.innerHTML = `

            <h3>
                ${product.name}
            </h3>

            <p>
                ${product.price} ₽
            </p>

        `;

        productsContainer.appendChild(card);

    });

}

if(openModal){

openModal.addEventListener("click",()=>{

    clearInputs();

    modal.style.display="flex";

});

}

if(closeModal){

closeModal.addEventListener("click",()=>{

    modal.style.display="none";

});

}

// добавление товара в базу данных

if(addProduct){

addProduct.addEventListener(
"click",
async ()=>{

    const name =
    productName.value;

    const price =
    productPrice.value;

    const response =
    await fetch(
        "http://localhost:3000/products",
        {

            method:"POST",

            headers:{

                "Content-Type":
                "application/json"

            },

            body:JSON.stringify({

                name:name,

                price:price

            })

        }
    );

    const result =
    await response.json();

    console.log(result);

    // закрываем окно

    modal.style.display="none";

    // обновляем товары

    loadProducts();

});

}

// загрузить товары при открытии страницы

loadProducts();