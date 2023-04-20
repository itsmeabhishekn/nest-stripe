import { Body,Controller,HttpStatus,Post,Res,Get } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { PaymentRequestBody } from "./types/PaymentRequestBody";
import {Response } from 'express';
import { ChargeDto } from "./types/chargeDto";
import { CardDto } from "./types/cardDto";
import { IntentDto } from "./types/intentDto";
@Controller('payments')
export class PaymentController {

constructor(private paymentService:PaymentService){}

@Post()
createPayments(
    @Res() response: Response,
    @Body() PaymentRequestBody : PaymentRequestBody
){  
    this.paymentService
    .createPayment(PaymentRequestBody)
    .then((res)=> {
        response.status(HttpStatus.CREATED).json(res);
    })
    .catch((err) => {
        response.status(HttpStatus.BAD_REQUEST).json(err);
    })
}

@Post('charge')
async createCharge(@Body() body: ChargeDto) {
  const { amount, currency, source } = body;

  const charged = await this.paymentService.chargePayment(amount,currency,source);
    return charged;
}

@Post('createCardToken')
async createToken(@Body() body: CardDto){
    const {number , exp_month,exp_year,cvc} = body;

    const tokenCreated = await this.paymentService.tokenCreated();

    return tokenCreated
}

@Post('createPaymentIntent')
async createIntent(@Body() body : IntentDto){
    const {amount,currency,pm} = body;

    const pmIntent = await this.paymentService.intentCreate(pm);

    return pmIntent;
}

@Get()
getPayments() {
    const transHis = this.paymentService.fetchAllPayments()
    return transHis;
}

}