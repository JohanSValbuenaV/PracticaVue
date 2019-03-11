var app = new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        image: './imagenes/vmSocks-green-onWhite.jpg',
        inStock: true,
        details: ["80% cotton", "20% polyester", "gender neutral"],

        variants: [{
                variantId: 2234,
                VariantColor: "green",
                variantimage: './imagenes/vmSocks-green-onWhite.jpg'
            },
            {
                variantId: 2235,
                VariantColor: "blue",
                variantimage: './imagenes/vmSocks-blue-onWhite.jpg'
            }
        ],

        cart: 0
    },
    methods: {
        addToCart: function () {
            this.cart += 1;
        },
        updateProduct: function (variantimage) {
            this.image = variantimage;
        },
        removeFromCart() {
            this.cart -= 1;
        }
    }

})