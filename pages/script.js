
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

function clearInputs(){

    productName.value = "";

    productPrice.value = "";

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