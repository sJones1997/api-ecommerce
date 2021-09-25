const stripe = require('stripe')(process.env.STRIPE_KEY)

class CheckoutService {

    getOrderTotal(items){
        let total = 0;
        items.forEach(e => {
            total += e.totalProductPrice
        })
        return total * 100
    }

    async checkout(productDetails){
        return await stripe.paymentIntents.create({
            amount: this.getOrderTotal(productDetails),
            currency: "gbp"
          })
          .then(data => {
              console.log(data.client_secret)
              return data.client_secret
          })
          .catch(err => {
              console.log(err)
          })
    }

}

module.exports = CheckoutService;