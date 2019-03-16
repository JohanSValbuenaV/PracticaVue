Vue.component('product-review', {
    template: `
    <form  class="review-form" @submit.prevent="onsubmit">
<p v-if="errors.length"> 
<b>please correct the following error(s):</b>
<ul>
<li v-for="error in errors"> {{error}}
</li>
</ul>
</p>

    <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name">
    </p>

    <p>
        <label for="review">Review:</label>
        <textarea  id="review" v-model="review" ></textarea>
    </p>

    <p>
        <label for="rarting">Rating:</label>
        <select id="rating" v-model.number="rating">
            <option >5</option>
            <option >4</option>
            <option >3</option>
            <option >2</option>
            <option >1</option>
        </select>
    </p>

    <p>
        <input type="submit" value="submit">
    </p>
</form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: []

        }
    },
    methods: {
        onsubmit() {
            if (this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
                this.$emit('review-submit', productReview)
                this.name = null,
                    this.review = null,
                    this.rating = null
            } else {
                if (!this.name) this.errors.push("nombre requerido")
                if (!this.rating) this.errors.push("rating requerido")
                if (!this.review) this.errors.push("review requerido")
            }

        }
    }

})

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


    <div>
    <h2>Reviews</h2>
    <p v-if="!reviews.length">There are no reviews yet..</p>
    <ul>
        <li v-for="review in reviews">
        <p>{{review.name}}</p>
        <p>Rating: {{review.rating}}</p>
        <p>{{review.review}}</p>
        
        </li>
    </ul>
</div>



    <product-review @review-submit="publicar"></product-review>


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

            reviews: [],
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
            this.$emit('remove-cart', this.variants[this.selectedVariant].variantId)
        },
        publicar(productReview) {
            this.reviews.push(productReview)
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
        resta(id) {
            for (var i = this.cart.length - 1; i >= 0; i--) {
                if (this.cart[i] === id) {
                    this.cart.splice(i, 1);
                }
            }

        }

    }

})