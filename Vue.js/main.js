var app = new Vue({
    el: '#app',
    data: {

        brand: 'Vue Mastery',
        product: 'Socks',
        selectedVariant:0,

        details: ["80% cotton", "20% polyester", "gender neutral"],

        variants: [{
                variantId: 2234,
                VariantColor: "green",
                variantimage: './imagenes/vmSocks-green-onWhite.jpg',
                variantquantity: 10
            },
            {
                variantId: 2235,
                VariantColor: "blue",
                variantimage: './imagenes/vmSocks-blue-onWhite.jpg',
                variantquantity: 0
            }
        ],

        cart: 0,
        onSale: true
    },
    methods: {
        addToCart: function () {
            this.cart += 1;
        },
        updateProduct: function (index) {
            this.selectedVariant = index;
    
        },
        removeFromCart() {
            this.cart -= 1;
        }
    },
    computed: {
        titulo(){
            return this.brand + ' ' +this.product
        },
        image(){
            return this.variants[this.selectedVariant].variantimage
        },
        inStock(){
            return this.variants[this.selectedVariant].variantquantity
        },
        sale() {
            if (this.onSale) {
              return this.brand + ' ' + this.product + ' are on sale!'
            } 
              return  this.brand + ' ' + this.product + ' are not on sale'
          }
    }

})