import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { CorsMiddleware } from '@nest-middlewares/cors';
import { DevicesLocationsModule } from './app/locations/locations.module';
import { InboxDevicesModule } from './app/inbox_devices/inbox_devices.module';
import { LocationsModule } from './app/devices_locations/devices_locations.module';

@Module({
  imports: [DevicesLocationsModule, InboxDevicesModule, LocationsModule],
})
export class AppModule {
  // Configura middleware CORS
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
