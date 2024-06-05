import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'

async function bootstrap() {
  const PORT = process.env.PORT || 5000
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  const config = new DocumentBuilder()
    .setTitle('ArtStyle')
    .setDescription('REST API documentation')
    .setVersion('0.0.1')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/docs', app, document)
  app.useGlobalPipes(new ValidationPipe())

  app.use(cookieParser())
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true
  })
  await app.listen(PORT, () => console.log(`App is running at ${PORT}`))
}

bootstrap()