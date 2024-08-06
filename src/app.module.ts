import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { CorsMiddleware } from '@nest-middlewares/cors';
import { LocationsModule } from './app/locations/locations.module';
import { InboxDevicesModule } from './app/inbox_devices/inbox_devices.module';
import { DevicesLocationsModule } from './app/devices_locations/devices_locations.module';
import { Device } from './app/entities/device.entity';
import { Attributes } from './app/entities/attributes.entity';
import { Context } from './app/entities/context.entity';
import { Ambiente } from './app/entities/ambiente.entity';
import { HomeAssistantModule } from './app/home_assistant/home_assistant.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Device, Attributes, Context, Ambiente],
      synchronize: true,
    }),
    // ScheduleModule.forRoot(),
    InboxDevicesModule,
    HomeAssistantModule,
    LocationsModule,
    DevicesLocationsModule,
  ],
})
export class AppModule {
  // Configuração middleware CORS
  configure(consumer: MiddlewareConsumer) {
    CorsMiddleware.configure({
      origin: true, //'http://localhost:3000'
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });
    consumer.apply(CorsMiddleware).forRoutes({
      path: '/*',
      method: RequestMethod.ALL,
    });
  }
}
