import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { PaymentsCreateChargeDto } from './dto/payments-create-charge.dto';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern('create_charge')
  @UsePipes(new ValidationPipe())
  async createCharge(
    @Payload() date: PaymentsCreateChargeDto,
    @Ctx() context: RmqContext,
  ) {
    // The context provides access to the RabbitMQ channel and message
    // Acknowledge the message to prevent reprocessing

    const channel = context.getChannelRef();
    // Get the original message from the context
    const originalMsg = context.getMessage();

    channel.ack(originalMsg); // Acknowledge the message to prevent reprocessing
    // Process the charge creation
    return this.paymentsService.createCharge(date);
  }
}
