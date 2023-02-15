const wishInput = document.querySelector(".wish-input");
const wishButton = document.querySelector(".wish-button");
const wishList = document.querySelector(".wish-list");
const filterOption = document.querySelector(".filter-wish");

document.addEventListener("DOMContentLoaded", getLocalWishes);
wishButton.addEventListener("click", addWish);
wishList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterWish);

function addWish(event) {
    event.preventDefault();
    const wishDiv = document.createElement("div");
    wishDiv.classList.add("wish");
    const newWish = document.createElement("li");
    newWish.innerText = wishInput.value; 
    newWish.classList.add("wish-item");
    wishDiv.appendChild(newWish);
    //ADDING TO LOCAL STORAGE 
    saveLocalWishes(wishInput.value);
    
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check-circle"></li>';
    completedButton.classList.add("complete-btn");
    wishDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></li>';
    trashButton.classList.add("trash-btn");
    wishDiv.appendChild(trashButton);
    
    wishList.appendChild(wishDiv);
    wishInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;

    if(item.classList[0] === "trash-btn") {
        const wish = item.parentElement;
        wish.classList.add("slide");

        removeLocalWishes(wish);
        wish.addEventListener("transitionend", function() {
            wish.remove();
        });
    }

    if(item.classList[0] === "complete-btn") {
        const wish = item.parentElement;
        wish.classList.toggle("completed");
    }
}

function filterWish(e) {
    const wishes = wishList.childNodes;
    wishes.forEach(function(wish) {
        switch(e.target.value) {
            case "all": 
                wish.style.display = "flex";
                break;
            case "completed": 
                if(wish.classList.contains("completed")) {
                    wish.style.display = "flex";
                } else {
                    wish.style.display = "none";
                }
                break;
            case "incomplete":
                if(!wish.classList.contains("completed")) {
                    wish.style.display = "flex";
                } else {
                    wish.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalWishes(wish) {
    let wishes;
    if(localStorage.getItem("wishes") === null) {
        wishes = [];
    } else {
        wishes = JSON.parse(localStorage.getItem("wishes"));
    }
    wishes.push(wish);
    localStorage.setItem("wishes", JSON.stringify(wishes));
}

function getLocalWishes() {
    let wishes;
    if(localStorage.getItem("wishes") === null) {
        wishes = [];
    } else {
        wishes = JSON.parse(localStorage.getItem("wishes"));
    }
    wishes.forEach(function(wish) {
        const wishDiv = document.createElement("div");
        wishDiv.classList.add("wish");
        const newWish = document.createElement("li");
        newWish.innerText = wish;
        newWish.classList.add("wish-item");
        wishDiv.appendChild(newWish);

        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check-circle"></li>';
        completedButton.classList.add("complete-btn");
        wishDiv.appendChild(completedButton);

        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></li>';
        trashButton.classList.add("trash-btn");
        wishDiv.appendChild(trashButton);

        wishList.appendChild(wishDiv);
    });
}

function removeLocalWishes(wish) {
    let wishes;
    if(localStorage.getItem("wishes") === null) {
        wishes = [];
    } else {
        wishes = JSON.parse(localStorage.getItem("wishes"));
    }

    const wishIndex = wish.children[0].innerText;
    wishes.splice(wishes.indexOf(wishIndex), 1);
    localStorage.setItem("wishes", JSON.stringify(wishes));
}