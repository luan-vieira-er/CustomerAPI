import 'dotenv/config'

import "reflect-metadata";
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { AppDataSource } from "./data-source"
import { BadRequestException, ConsoleLogger, ValidationError, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {

  await AppDataSource.initialize()

  console.log("Data Source has been initialized!")
 
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: 'CustomerAPI',
    }),
  });

  app.enableCors({
    origin: ['http://localhost:3000', 'https://dmx616r1r0n7b.cloudfront.net'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH','OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });


  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(validationErrors);
      },
    })
  );

  const config = new DocumentBuilder()
    .setTitle('Customer API')
    .setDescription('Build for accessing customer data')
    .setVersion('1.0')
    .addTag('customers')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  
  await app.listen(process.env.PORT ?? 3000);

  
}
bootstrap();
