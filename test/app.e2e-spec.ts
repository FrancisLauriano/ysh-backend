import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('app (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  // DEVICES LOCATIONS
  it('/GET locations/:location_id/devices', async () => {
    const locationId = 1;

    const response = await request(app.getHttpServer())
      .get(`/locations/${locationId}/devices`)
      .expect(HttpStatus.OK);
    expect(response.body).toMatchObject({});
  });

  it('/PUT locations/:location_id/devices', async () => {
    const locationId = 1;

    const response = await request(app.getHttpServer())
      .put(`/locations/${locationId}/devices`)
      .send({ deviceData: [1, 2, 3, 4, 5] })
      .set('Content-Type', 'application/json')
      .expect(HttpStatus.OK);
    expect(response.body).toMatchObject({});
  });

  // INBOX DEVICES
  it('/GET inbox', async () => {
    const response = await request(app.getHttpServer())
      .get(`/inbox`)
      .expect(HttpStatus.OK);
    expect(response.body).toMatchObject({});
  });

  it('/GET inbox/scan', async () => {
    const response = await request(app.getHttpServer())
      .get(`/inbox/scan`)
      .expect(HttpStatus.OK);
    expect(response.body).toMatchObject({});
  });

  it('/GET devices', async () => {
    const response = await request(app.getHttpServer())
      .get(`/devices`)
      .expect(HttpStatus.OK);
    expect(response.body).toMatchObject({});
  });

  it('/GET devices/:id', async () => {
    const devicesId = 1;

    const response = await request(app.getHttpServer())
      .get(`/devices/${devicesId}`)
      .expect(HttpStatus.OK);
    expect(response.body).toMatchObject({});
  });

  it('/POST devices', async () => {
    const response = await request(app.getHttpServer())
      .post(`/devices`)
      .send({
        label: 'lãmpada',
        openhab_uid: 'tuya:tuyaDevice:ebae0d2627f876236ccpge',
      })
      .set('Content-Type', 'application/json')
      .expect(HttpStatus.CREATED);
    expect(response.body).toMatchObject({});
  });

  it('/PUT devices/:id/replace', async () => {
    const devicesId = 1;

    const response = await request(app.getHttpServer())
      .put(`/devices/${devicesId}/replace`)
      .send({
        device_id: 1,
        openhab_uid: 'tuya:tuyaDevice:ebae0d2627f876236ccpge',
      })
      .set('Content-Type', 'application/json')
      .expect(HttpStatus.OK);
    expect(response.body).toMatchObject({});
  });

  it('/PUT devices/:id/properties', async () => {
    const devicesId = 1;

    const response = await request(app.getHttpServer())
      .put(`/devices/${devicesId}/properties`)
      .send({
        name: 'toggle',
        data: { toggle_on: false },
      })
      .set('Content-Type', 'application/json')
      .expect(HttpStatus.OK);
    expect(response.body).toMatchObject({});
  });

  // LOCATIONS
  it('/GET locations', async () => {
    const response = await request(app.getHttpServer())
      .get(`/locations`)
      .expect(HttpStatus.OK);
    expect(response.body).toMatchObject({});
  });

  it('/GET locations/location-types', async () => {
    const response = await request(app.getHttpServer())
      .get(`/locations/location-types`)
      .expect(HttpStatus.OK);
    expect(response.body).toMatchObject({});
  });

  it('/POST locations', async () => {
    const response = await request(app.getHttpServer())
      .post(`/locations`)
      .send({
        label: 'Yolo',
        location_type: 'BUILDING',
        parent_location_id: null,
      })
      .set('Content-Type', 'application/json')
      .expect(HttpStatus.CREATED);
    expect(response.body).toMatchObject({});
  });

  it('/PUT locations/:id', async () => {
    const locationsId = 1;

    const response = await request(app.getHttpServer())
      .put(`/locations/${locationsId}`)
      .send({
        label: 'Prédio Boa Viagem',
        location_type: 'BUILDING',
        parent_location_id: null,
      })
      .set('Content-Type', 'application/json')
      .expect(HttpStatus.OK);
    expect(response.body).toMatchObject({});
  });

  it('/DELETE locations/:id', async () => {
    const locationsId = 1;

    const response = await request(app.getHttpServer())
      .delete(`/locations/${locationsId}`)
      .expect(HttpStatus.OK);
    expect(response.body).toMatchObject({});
  });
});
