import { Body,Controller,HttpStatus,Post,Res,Get } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { PaymentRequestBody } from "./types/PaymentRequestBody";
import {Response } from 'express';


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

@Get()
getPayments() {
    const transHis = this.paymentService.fetchAllPayments()
    return transHis;
}

}