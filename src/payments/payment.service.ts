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
}