## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## No modo de desenvolvimento o servidor será executado localmente:

[http://localhost:3000](http://localhost:3000)


## ENDPOINT’S DISPONÍVEIS PARA O FRONTEND ACESSAR A API YOLO:

1.	GET 
/inbox

`OBS: O Inbox é a tela “inicial” que mostra (retorna) os devices (dispositivos) disponíveis.`

2.	GET
/inbox/scan

`OBS: O inbox scan permite que um device (dispositivo) “entre” no inbox depois de “escaneado”.`
 
3.	GET
/devices

`OBS: Mostra todos os devices (dispositivos) cadastrados.`

4.	GET
/devices/{device_id}

`OBS: Mostra um device (dispositivo) cadastrado especifico.`
	
5.	POST
/devices

`OBS: Cadastra um device (dispositivo).`

6.	PUT
/devices/{device_id}/replace

`OBS: Atualiza / Substitui um device (dispositivo) especifico.`

7.	PUT
/devices/{device_id}/properties

`OBS: Atualizar / “Adicionar” propriedades de um device (dispositivo) específico.`

8.	GET
/locations

`OBS: Mostra informações sobre dispositivos e suas operações disponíveis dentro do local.`

9.	GET
/locations/location_types

`OBS: Mostra informações sobre os tipos de localizações.`

10.	POST	
/locations

`OBS: Cadastra uma localização.`

11.	PUT
/locations/{location_id}

`OBS: Atualiza uma localização especifica.` 
	
12.	DELETE
/locations/{location_id}

`OBS: Exclui uma localização especifica.`

13.	GET
/locations/{location_id}/devices

`OBS: Mostra dispositivos disponíveis numa localização especifica.`

14.	PUT
/locations/{location_id}/devices

`OBS: Adicionar devices (dispositivos) numa localização especifica.`


## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).


<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->
