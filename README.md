<p align="center">
  <img src="https://img.shields.io/static/v1?label=NestJS&message=10.3&color=red&style=for-the-badge&logo=nestjs"/>
  <img src="http://img.shields.io/static/v1?label=Typescript&message=5.4&color=blue&style=for-the-badge&logo=typescript"/>
  <img src="http://img.shields.io/static/v1?label=Node&message=20.10.0&color=5fa04e&style=for-the-badge&logo=nodedotjs"/>
  <img src="http://img.shields.io/static/v1?label=Draw.io&message=24.6.4&color=f08705&style=for-the-badge&logo=diagramsdotnet"/>
  <img src="http://img.shields.io/static/v1?label=Workbench MySQL&message=8.0.38&color=4479a1&style=for-the-badge&logo=mysql&logoColor=f5f5f5"/>
  <img src="http://img.shields.io/static/v1?label=PostgreSQL&message=16&color=4169e1&style=for-the-badge&logo=postgresql&logoColor=f5f5f5"/>
  <img src="http://img.shields.io/static/v1?label=TypeORM&message=0.3.20&color=2d3748&style=for-the-badge&logo=typeorm"/>
  <img src="http://img.shields.io/static/v1?label=Postman&message=11&color=orange&style=for-the-badge&logo=postman"/>
  <img src="http://img.shields.io/static/v1?label=Git&message=2.45.2&color=f05032&style=for-the-badge&logo=git"/>
  <img src="http://img.shields.io/static/v1?label=GitHub&message=2024&color=181717&style=for-the-badge&logo=github"/>
  <img src="http://img.shields.io/static/v1?label=STATUS&message=CONCLUIDO&color=green&style=for-the-badge"/>
  <img src="http://img.shields.io/static/v1?label=License&message=MIT&color=green&style=for-the-badge"/>
</p>



## Installation

```bash
$ npm install
```

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


... 

## Linguagens, tecnologias, dependências e libs utilizadas :hammer_and_wrench: :gear: :books:

- [NestJS](https://docs.nestjs.com/)
- [Typescript](https://www.typescriptlang.org/download/)
- [Node](https://nodejs.org/en/download/)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Workbench MySQL](https://dev.mysql.com/downloads/workbench/)
- [Draw.io](https://www.drawio.com/)
- [TypeORM](https://typeorm.io/)
- [Postman](https://www.postman.com/downloads/)
- [Git](https://git-scm.com/downloads)
- [GitHub](https://github.com/)

...


## ENDPOINT’S DISPONÍVEIS PARA O FRONTEND ACESSAR A API HOME ASSISTANT - APLICAÇÃO BACK YSH

### INBOX-DEVICES    
1.	GET 
/inbox

`OBS: O Inbox é a tela “inicial” que mostra (retorna) os dispositivos que estão emparelhados com home asistant e disponíveis para serem cadastrados no BD.`
 
2.	GET
/devices

`OBS: Mostra todos os dispositivos cadastrados no BD.`

3.	GET
/devices/{id_device}

`OBS: Mostra um dispositivo específico cadastrado no BD.`
	
4.	POST
/devices

`OBS: Cadastra um dispositivo no BD.`

5.	PUT
/devices/{id_device}/properties

`OBS: Atualiza as propriedades de um dispositivo específico no BD.`

6.	DELETE
/devices/{id_device}

`OBS: Delete um dispositivo específico que estava cadastrado no BD.`

7.	GET
/devices_id_name/{searchTerm}

`OBS: Pesquisa um dispositivo específico pelo id ou nome no BD, onde searchTerm representa o id_device ou nome_device do dispositivo a ser pesquisado.`

8.	PUT
/devices/{id_device}/replace

`OBS: Substitui um dispositivo específico, transferindo a configuração de id_device, name_device, e ambiente (id_ambiente, nome e tipo)do dispositivo anterior para o novo dispositivo.`

### LOCATIONS 
1.	GET 
/locations

`OBS: Mostra todos os ambientes cadastrados no BD.`

2.	GET
/locations/location-types

`OBS: Mostra os tipos de ambientes.`
 	
3.	POST
/locations

`OBS: Cadastra um ambiente no BD.`

4.	PUT
/locations/{id_ambiente}

`OBS: Atualiza um ambiente específico no BD.`

5.	DELETE
/locations/{id_ambiente}

`OBS: Delete um ambiente específico que estava cadastrado no BD.`

6.	GET
/locations/{id_ambiente}

`OBS: Mostra um ambiente específico cadastrado no BD.`

### DEVICES-LOCATIONS 
1.	GET 
/locations/{id_ambiente}/devices

`OBS: Mostra os dispositivos vinculados a um ambiente específico.`

2.	PUT
/locations/{id_ambiente}/devices

`OBS: Adiciona dispositivo a um ambiente específico.`
