//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';
const items = ['Apple', 'Huawei', 'LeEco', 'Lenovo', 'Meizu'];
const prices = [500, 400, 300, 200, 100];
const ids = [1, 2, 3, 4, 5];


//глобальные сущности корзины и каталога (ИМИТАЦИЯ! НЕЛЬЗЯ ТАК ДЕЛАТЬ!)
var userCart = [];
var list = fetchData()

//кнопка скрытия и показа корзины


document.querySelector('.btn-cart').addEventListener('click', () => {
    document.querySelector('.cart-block').classList.toggle('invisible');
});
//кнопки удаления товара (добавляется один раз)
document.querySelector('.cart-block').addEventListener ('click', (evt) => {
    if (evt.target.classList.contains ('del-btn')) {
        removeProduct (evt.target);
    }
})
//кнопки покупки товара (добавляется один раз)
document.querySelector('.products').addEventListener ('click', (evt) => {
    if (evt.target.classList.contains ('buy-btn')) {
        addProduct (evt.target);
    }
})

//создание массива объектов - имитация загрузки данных с сервера
function fetchData () {
    let arr = [];
    for (let i = 0; i < items.length; i++) {
        arr.push (createProduct (i));
    }
    return arr
};

//создание товара
function createProduct (i) {
    return {
        id: ids[i],
        name: items[i],
        price: prices[i],
        img: image,
        quantity: 0,
        createTemplate: function () {
            return `<div class="product-item" data-id="${this.id}">
                        <img src="${this.img}" alt="Some img">
                        <div class="desc">
                            <h3>${this.name}</h3>
                            <p>${this.price} $</p>
                            <button class="buy-btn" 
                            data-id="${this.id}"
                            data-name="${this.name}"
                            data-image="${this.img}"
                            data-price="${this.price}">Купить</button>
                        </div>
                    </div>`
        },

        add: function() {
            this.quantity++
        }
    }
};

//рендер списка товаров (каталога)
function renderProducts () {
    let arr = [];
    for (item of list) {
        arr.push(item.createTemplate())
    }
    document.querySelector('.products').innerHTML = arr.join();
}

function init () {
    console.log ('init start')
    list = fetchData ();
    renderProducts ();
}
init ()


//CART

// Добавление продуктов в корзину
function addProduct (product) {
    let productId = +product.dataset['id'];
    let find = userCart.find (element => element.id === productId);
    if (!find) {
        userCart.push ({
            name: product.dataset ['name'],
            id: productId,
            img: cartImage,
            price: +product.dataset['price'],
            quantity: 1
        })
    }  else {
        find.quantity++
    }
    renderCart ()
}

//удаление товаров
function removeProduct (product) {
    let productId = +product.dataset['id'];
    let find = userCart.find (element => element.id === productId);
    if (find.quantity > 1) {
        find.quantity--;
    } else {
       userCart.splice(userCart.indexOf(find), 1);
        document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
    }
    renderCart ();
}

//перерендер корзины
function renderCart () {
    let allProducts = '';
    for (el of userCart) {
        allProducts += `<div class="cart-item" data-id="${el.id}">
                            <div class="product-bio">
                                <img src="${el.img}" alt="Some image">
                                <div class="product-desc">
                                    <p class="product-title">${el.name}</p>
                                    <p class="product-quantity">Quantity: ${el.quantity}</p>
                                    <p class="product-single-price">$${el.price} each</p>
                                </div>
                            </div>
                            <div class="right-block">
                                <p class="product-price">${el.quantity * el.price}</p>
                                <button class="del-btn" data-id="${el.id}">&times;</button>
                           </div>
                        </div>`
    }

    document.querySelector(`.cart-block`).innerHTML = allProducts;
}


//классы

// массив товаров

const goods = [
    {title: 'Apple', price: 500, id: 1, img: 'https://placehold.it/100x80'},
    {title: 'Huawei', price: 400, id: 2, img: 'https://placehold.it/100x80' },
    {title: 'LeEco', price: 300, id:3, img: 'https://placehold.it/100x80' },
    {title: 'Lenovo', price: 200, id:4, img: 'https://placehold.it/100x80' },
    {title: 'Meizu', price: 100, id:5, img: 'https://placehold.it/100x80' }
]

//класс единицы товара
class GoodItem {
    constructor(good){
        
        this.title = good.title;
        this.price = good.price;
        this.id = good.id;
        this.img = good.img
    }
    render(){
        return `<div class="product-item">
                    <img src="${this.img}" alt="img">
                    <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn" data-value="addToCart" data-id="${this.id}">Добавить</button>
                    </div>
                </div>`
    }
}

// GoodList

class GoodList  {
    constructor(container){
        this.container = container; 
        this.goods=[];
    }

    init () {
        this.goods = goods
        this._render ()
    }

    render () {
        let listHtml=''
        this.goods.forEach((good)=> {
            listHtml+=new GoodItem(good).render ()
        })

        document.querySelector('.prodacts').innerHTML = listHtml;
    }
}

// каталог товара

const catalog = new GoodCatalog('.products')
catalog.fetchData();


class GoodItemCart {
    constructor(good){
       
        this.title = good.title;
        this.price = good.price;
        this.id = good.id;
        this.img = good.img;
        this.quantity =good.quantity;
    }
    render(){
        return  `<div class="cart-item" data-id="${this.id}">
                    <div class="product-bio">
                        <img src="${this.img}" alt="img">
                        <div class="product-desc">
                            <p class="product-title">${this.title}</p>
                            <p class="product-quantity">Quantity: ${this.quantity}</p>
                            <p class="product-single-price">$${this.price} each</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">${this.quantity * this.price}</p>
                        <button class="del-btn" data-id="${this.id}" data-value="removeToCart">&times;</button>
                    </div>
                </div>`
    }
}

//makeGETRequest() с использованием промиса

let URL_catalog = 'https://raw.githubusercontent.com/HelloAleno4ka/js2_12_0502/master/catalogData.json'
let URL_cart = 'https://raw.githubusercontent.com/HelloAleno4ka/js2_12_0502/master/get.Basket.json'

        function makeGETRequest(url, resolve, reject) {
            let xhr = new XMLHttpRequest()

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve (xhr.responseText)
                    } 
                }
            }

            xhr.open('GET', url, true)
            xhr.send()
        }


        function promiseReq (url) {
            return new Promise ((res, rej) => {
                makeGETRequest(url, res, rej)
            })
        }

        promiseReq (URL)
            .then (dataJSON => {
                console.log (dataJSON) // String
                console.log (a) // []
                return JSON.parse(dataJSON)
            })
            .then (dataParsedFromJSON => {
                console.log (dataParsedFromJSON) //Object/Array
                a = dataParsedFromJSON
            })
            .catch (errorData => {
                console.log (errorData + ' ERROR')
            })
            .finally (() => {
                console.log (a) // catch+ -> [] / -catch -> [{}, {}]
            })
            
