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
