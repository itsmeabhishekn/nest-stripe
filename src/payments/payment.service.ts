import { Injectable } from "@nestjs/common";
import { PaymentRequestBody } from "./types/PaymentRequestBody";
import Stripe from 'stripe';


@Injectable()
export class PaymentService {

    stripe = new Stripe('sk_test_51MxqRmSA1g0hv96dw54ptAYNKztci0BHxqPg5yqrYVJB8SX3fpZbglSZYWrrXEvYYDtgZJbqv7YHnFcugD7UTXwC00IlOCFU3N', {
        apiVersion: '2022-11-15',
    });

    createPayment(PaymentRequestBody: PaymentRequestBody): Promise<any> {
        let sumAmount = 0;
        PaymentRequestBody.products.forEach((product => {
            console.log(product);
            sumAmount = sumAmount + product.price * product.quantity;
            console.log(sumAmount);
        }));
        const createdObject = this.stripe.paymentIntents.create({
            amount: sumAmount * 100,
            currency: 'usd'
        })
        return createdObject;
    }

    async fetchAllPayments(){
        const balanceTransactions = await this.stripe.balanceTransactions.list({
            limit: 3,
          });

          return balanceTransactions;
    }


    async chargePayment(amount,currency,source){

        try{
        const charge = await this.stripe.charges.create({
            amount,
            currency,
            source:'pm_1Myqv2SA1g0hv96dk8ReLRJz',
          });
          return charge;
        }
        catch(err){
            console.log(err);
        }
    }

    async intentCreate(pm:any){
        try {
            const paymentIntent = await this.stripe.paymentIntents.create({
                amount: 2000,
                currency: 'inr',
                automatic_payment_methods: {enabled: true},
                payment_method:pm,
                use_stripe_sdk: false
              }).then(async res=>{
                const piConfirm =await this.stripe.paymentIntents.confirm(res.id,
                {payment_method: pm,
                    return_url: 'https://example.com/success'},
                );
                    console.log(piConfirm);
                return piConfirm;
              });

              
        }
        catch(err){
            console.log(err);
        }
    }

    async tokenCreated(){
        try {
            const token = await this.stripe.paymentMethods.create({
                type: 'card',
                card: {
                  number: '4000003560000008',
                  exp_month: 4,
                  exp_year: 2024,
                  cvc: '314',
                },
              });

              return token
    }

    catch(err){
        console.log(err);
    }
}
}
