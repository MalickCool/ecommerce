export const remakeCart = (store, addToCart, incrementCartItem) => {
    if (localStorage.cartProducts) {
        const cartProducts = localStorage.cartProducts;

        const products = JSON.parse(cartProducts);

        let itemInCart = 0;

        products.forEach(element => {
            itemInCart += element.quantite;
        });

        store.dispatch(addToCart(products));
        store.dispatch(incrementCartItem(itemInCart));
    }
}

export const format = (nStr) => {
    nStr += '';
    let x = nStr.split('.');
    let x1 = x[0];
    let x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ' ' + '$2');
    }
    return x1 + x2;
}