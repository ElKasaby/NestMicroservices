import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule);
  const configService = app.get(ConfigService);
  app.connectMicroservice({
    // transport: Transport.TCP,
    // options: {
    //   host: '0.0.0.0',
    //   port: configService.get('TCP_PORT'),
    //   retryAttempts: 5,
    //   retryDelay: 3000,
    // },
    transport: Transport.RMQ,
    options: {
      // Use the RabbitMQ URI from the configuration service
      // This URI should be set in your environment variables or configuration file
      // Example: amqp://user:password@localhost:5672
      // Ensure that the RabbitMQ server is running and accessible
      urls: [configService.getOrThrow('RABBITMQ_URI')],
      NO_ACK: false, // Set to false to acknowledge messages manually in the controller
      // The queue name for the payments service
      queue: 'payments',
    },
  });
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.useLogger(app.get(Logger));
  await app.startAllMicroservices();
  await app.listen(configService.get('PORT'));
}
bootstrap();
