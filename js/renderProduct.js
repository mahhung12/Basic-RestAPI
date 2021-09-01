var courseApi = "http://localhost:3000/product";

function start() {
    getCourses(renderProduct);
}

start();

// Get Courses
function getCourses(callback) {
    fetch(courseApi)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

// Render Courses
function renderProduct(Product) {
    var listProductsBlock = document.querySelector(".header-content__items");
    var htmls = Product.map(function (Product) {
        return `
        <div class="header-content__items__product product-${Product.id}">
            <img 
                src=${Product.img}
                class="header-content__items__product-image" 
            />
            <div class="header-content__items__product-properties">
                <div class="properties__name">
                    <div class="properties__name__content">
                        <h3 class="name">${Product.name}</h3>
                        <div class="style">${Product.type}</div>
                    </div>

                    <div class="properties__name__action">
                        <button
                         class="AddCart"
                         onClick="handl(${Product.id})"
                        >
                         &#128722;
                        </button>
                        <button class="EditCart">&#x270D;</button>
                        <button 
                            class="Remove"
                            onClick="handleDeleteProduct(${Product.id})"
                        >
                            🗑️
                        </button>
                    </div>
                </div>
                <div class="properties__value">
                    <div class="properties__value__price">
                        <input 
                            class="fakePrice fakePrice-${Product.id}"
                            value="${Product.cost}"
                        />
                        <div class=" price-${Product.id}">${Product.cost}$</div>
                    </div>
                    <div class="properties__value__quantity">
                        <button 
                            class="plus"
                            onClick="SelectAddCart(${Product.id})"
                        >
                            &#43;
                        </button>
                        <input 
                            class="total total-${Product.id}" 
                            type="text" 
                            value="1" 
                            readonly 
                        />
                        <button 
                            onClick="SelectMinusCart(${Product.id})"
                            class="minus"
                        >
                            &#8722;
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `;
    });
    listProductsBlock.innerHTML = htmls.join("");
}


//Handle Quantity Product


// CreateCourse
function createCourse(data, callback) {
    var options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    fetch(courseApi, options)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

// Create Product
function handleCreateProduct() {
    var createBtn = document.querySelector("#add-product");
    createBtn.onclick = function () {
        var img = document.querySelector('#fileUpload').src;
        var name = document.querySelector('.add-name').value;
        var type = document.querySelector('.add-type').value;
        var price = document.querySelector('.add-price').value;
        var formData = {
            img: img,
            name: name,
            type: type,
            cost: parseInt(price),
        };
        if (img != "" && name != "" && type != "" && price != "") {
            createCourse(formData, function () {
                getCourses(renderProduct);
            });
        } else {
            alert("Hãy nhập đầy đủ thông tin");
        }
    };
}

// Delete Product
function handleDeleteProduct(id) {
    var result = confirm("Want to delete?");
    if (result) {
        var options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        };
        fetch(courseApi + "/" + id, options)
            .then(function (response) {
                return response.json();
            })
            .then(function () {
                var productItem = document.querySelector(".product-" + id);
                if (productItem) {
                    productItem.remove();
                }
            });
    }
}

// // Update course

// function updateCourse(id, data, callback) {
//     var options = {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//     };
//     fetch(courseApi + "/" + id, options)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(callback);
// }

// function handleUpdateCourse(id) {
//     var productItem = document.querySelector(".course-item-" + id);

//     var getName = productItem.querySelector("h2").innerText;
//     var getDescription = productItem.querySelector("p").innerText;

//     var name = document.querySelector('input[name="name"]');
//     var description = document.querySelector('input[name="description"]');

//     name.value = getName;
//     description.value = getDescription;
//     if (!document.querySelector("#update")) {
//         document.querySelector("#create").id = "update";
//     }
//     document.querySelector("#update").innerText = "Lưu";

//     var updateBtn = document.querySelector("#update");
//     updateBtn.onclick = function () {
//         var formData = {
//             name: name.value,
//             description: description.value,
//         };
//         if (name.value != "" && description.value != "") {
//             updateCourse(id, formData, function () {
//                 getCourses(renderProduct);
//             });
//         } else {
//             alert("Hãy nhập đầy đủ thông tin");
//         }
//     };
// }