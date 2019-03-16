Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
      <ul>
        <li v-for="detail in details">{{ detail }}</li>
      </ul>
    `
})


Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
<div class="product-image">
    <img :src="image" alt="">
</div>
<div class="product-info">
    <h1>{{titulo}}</h1>
    <p v-if="inStock">In Stock</p>
    <p v-else :class="{ outOfStock: !inStock }">Out Stock</p>
    <p>Shipping: {{shipping}} </p>

    <p>{{sale}}</p>

    <product-details :details="details"></product-details>


    <div v-for="(variant, index) in variants" :key="variant.VariantId" class="color-box" :style="{backgroundColor: variant.VariantColor}"
        @mouseover="updateProduct(index)">

    </div>

    <button v-on:click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock}">
        Add to Cart</button>
    <button @click="removeFromCart">Remove from cart</button>



</div>


</div>`,

    data() {
        return {
            brand: 'Vue Mastery',
            product: 'Socks',
            selectedVariant: 0,

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


            onSale: true
        }
    },
    methods: {
        addToCart: function () {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        updateProduct: function (index) {
            this.selectedVariant = index;

        },
        removeFromCart() {
            this.$emit('remove-cart',this.variants[this.selectedVariant].variantId)
        }
    },
    computed: {
        titulo() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantimage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantquantity
        },
        sale() {
            if (this.onSale) {
                return this.brand + ' ' + this.product + ' are on sale!'
            }
            return this.brand + ' ' + this.product + ' are not on sale'
        },
        shipping() {
            if (this.premium) {
                return "Free"
            }
            return "2.99"
        }
    }


})


var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updatecart(id) {
            this.cart.push(id)
        },
        resta(id){
            for(var i = this.cart.length - 1; i >= 0; i--) {
                if (this.cart[i] === id) {
                   this.cart.splice(i, 1);
                }
            }
            
        }

    }

})