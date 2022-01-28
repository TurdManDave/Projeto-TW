if (document.readyState == 'loading') {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
}
function ready() {
    var removeritem = document.getElementsByClassName("btn-danger")
    for (var i = 0;i < removeritem.length; i++){
        var butao = removeritem[i]
        butao.addEventListener("click", removecartitem)
    }
    var quantityinputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0;i < quantityinputs.length; i++){
        var input = quantityinputs[i]
        input.addEventListener('change', quantitychange)
    }
    var addtocartbtns = document.getElementsByClassName('card-btn')
    for (var i = 0;i < addtocartbtns.length; i++){
        var btn = addtocartbtns[i]
        btn.addEventListener('click', addtocartclick)
    }
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', compra)
}
var targetDiv = document.getElementById("show-carro");
function carrinho() {
    if (targetDiv.style.display == "block") {
        targetDiv.style.display = "none";
    } else {
        targetDiv.style.display = "block";
    }
    };
function compra(){
    var cartitems = document.getElementsByClassName('cart-items')[0]
    if (cartitems.hasChildNodes()) {
        alert('Por favor aguarde vai ser redirecionado')
        while (cartitems.hasChildNodes()) {
            cartitems.removeChild(cartitems.firstChild)
    }
    } else {
        alert('Não tem nada no carinho...')
    }
    updatecarttotal()
}
function removecartitem(event) {
    var butaoclick = event.target
    butaoclick.parentElement.parentElement.remove()
    updatecarttotal()
}

function addtocartclick(event) {
    var btn = event.target
    var shopitem = btn.parentElement.parentElement
    var title = shopitem.getElementsByClassName('product-brand')[0].innerText
    var price = shopitem.getElementsByClassName('price')[0].innerText
    var imgsrc = shopitem.getElementsByClassName('product-thumb')[0].src
    additemtocart(title, price, imgsrc)
    updatecarttotal()
}

function additemtocart(title, price, imgsrc) {
    var cartrow = document.createElement('div')
    cartrow.classList.add('cart-row')
    var cartitems = document.getElementsByClassName('cart-items')[0]
    var cartitemnames = cartitems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartitemnames.length; i++){
        if (cartitemnames[i].innerText == title) {
            alert('Este item já foi adicionado ao carrinho')
            return
        }
    }
    var cartrowscontent = `
        <div class="product-cart">
            <div class="cart-item cart-column">
                <img src="${imgsrc}" width="70" height="55">
                <span class="cart-item-title">${title}</span>
            </div>
            <span class="cart-price cart-column">${price}</span>
            <div class="cart-quantity cart-columm">
                <input class="cart-quantity-input" type="number" value="1">
                <button class="btn-danger" type="button">Remover</button>
            </div>
        </div>`
    cartrow.innerHTML = cartrowscontent
    cartitems.append(cartrow)
    cartrow.getElementsByClassName('btn-danger')[0].addEventListener('click', removecartitem)
    cartrow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantitychange)
}

function quantitychange(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updatecarttotal()
}

function updatecarttotal() {
    var cartitem = document.getElementsByClassName('cart-items')[0]
    var cartrows = cartitem.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0;i < cartrows.length; i++){
        var cartrow = cartrows[i]
        var priceelement = cartrow.getElementsByClassName('cart-price')[0]
        var quantityelement = cartrow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceelement.innerText.replace("$ ", ""))
        var quantity = quantityelement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100)/100
    document.getElementsByClassName('cart-total-price')[0].innerText = "$"+total
}