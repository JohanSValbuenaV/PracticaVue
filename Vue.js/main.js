var app = new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        image: './imagenes/vmSocks-green-onWhite.jpg',
        inStock: true,
        details: ["80% cotton", "20% polyester", "gender neutral"],

        variants: [{
                variantId: 2234,
                VariantColor: "green"
            },
            {
                variantId: 2235,
                VariantColor: "blue"
            }
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL']

    }

})