import { Module } from "@nestjs/common";
import { PaymentController } from "./payments.controller";
import { PaymentService } from "./payment.service";

@Module({
    controllers:[PaymentController],
    providers:[PaymentService],
})

export class PaymentsModule {
}