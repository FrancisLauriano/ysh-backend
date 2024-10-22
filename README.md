<h1>Yolo Smart Home</h1> 

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

> Status do Projeto: :heavy_check_mark: (concluido) | :warning: (em desenvolvimento) | :x: (não iniciada)

### Tópicos 

:small_blue_diamond: [Descrição do projeto](#descrição-do-projeto-writing_hand) :heavy_check_mark:

:small_blue_diamond: [Objetivos do projeto](#objetivos-do-projeto-dart) :heavy_check_mark:

:small_blue_diamond: [Funcionalidades](#funcionalidades-video_game) :heavy_check_mark:

:small_blue_diamond: [Rotas - EndPoints](#Rotas---EndPoints-arrows_clockwise) :heavy_check_mark:

:small_blue_diamond: [Instação das depedências](#instação-das-depedências-arrow_down_small) 

:small_blue_diamond: [Executar app](#executar-app-arrow_forward) 

:small_blue_diamond: [Linguagens, tecnologias, dependências e libs utilizadas](#linguagens-tecnologias-dependências-e-libs-utilizadas-hammer_and_wrench-gear-books)
... 


## Descrição do projeto :writing_hand:

<p align="justify">
  O Yolo Smart Home (YSH) é uma solução voltada para a gestão e automação de dispositivos IoT em unidades residenciais e habitacionais. Integrando-se com a plataforma **Home Assistant**, o YSH permite que tanto operadores quanto usuários possam monitorar, cadastrar, e controlar dispositivos inteligentes, promovendo ambientes conectados e eficientes. A aplicação oferece um controle abrangente dos ambientes e dispositivos, possibilitando fácil configuração e gerenciamento por meio de uma interface web intuitiva desenvolvida em **TypeScript**. Com isso, o YSH busca facilitar a experiência do usuário, melhorar a eficiência da gestão residencial e otimizar o uso de tecnologias IoT. O Yolo Smart Home (YSH) é uma aplicação web desenvolvida em TypeScript, voltada tanto para operadores (administradores) quanto para usuários residenciais e hóspedes. Essa aplicação permite acesso e controle de dispositivos IoT integrados via Home Assistant, oferecendo uma interface prática para monitorar e configurar ambientes inteligentes.
</p>


## Objetivos do projeto :dart:

<p align="justify">

**1. Facilitar o Controle e Monitoramento de Dispositivos IoT:**
- Permitir que operadores e usuários tenham acesso rápido e centralizado aos dispositivos conectados, com status em tempo real.
  
**2. Simplificar a Integração com a Plataforma Home Assistant:**
- Automatizar a identificação e emparelhamento de dispositivos disponíveis via Home Assistant, agilizando o processo de cadastro e configuração.

**3. Otimizar a Gestão de Ambientes Inteligentes:**
- Organizar e monitorar dispositivos por ambiente, facilitando o controle e a alocação de recursos em cada local da residência.

**4. Promover uma Experiência Personalizada para Usuários e Hóspedes:**
- Permitir que residentes e hóspedes possam interagir com dispositivos de forma intuitiva e controlada, garantindo uma experiência conectada e segura.

**5. Facilitar a Substituição e Configuração de Dispositivos:**
- Agilizar o processo de troca e manutenção de dispositivos, preservando as configurações e a estrutura dos ambientes associados.

**6. Garantir Segurança e Controle de Acesso:**
- Implementar autenticação segura com JWT para garantir que apenas usuários autorizados possam acessar e gerenciar dispositivos.

**7. Aumentar a Eficiência Operacional:**
- Reduzir o tempo necessário para cadastrar e configurar dispositivos, utilizando automação e uma interface web eficiente para operadores e administradores.

**8. Monitorar e Gerenciar o Histórico de Dispositivos e Ambientes:**
- Manter registros detalhados das configurações e atualizações realizadas, permitindo um acompanhamento histórico de cada dispositivo e ambiente.
</p>


## Funcionalidades :video_game:

**1. Gerenciamento de Dispositivos (Acesso para Operadores)**
- Descrição: Operadores podem visualizar, cadastrar, atualizar, deletar e substituir dispositivos IoT.
- Ações Disponíveis:
  - Visualizar Inbox: Mostrar dispositivos emparelhados com o Home Assistant para cadastro.
  - Listar Dispositivos: Exibir todos os dispositivos cadastrados no banco de dados.
  - Buscar Dispositivos: Localizar dispositivos por ID ou nome.
  - Cadastrar Novo Dispositivo: Adicionar um dispositivo ao banco de dados.
  - Atualizar Propriedades: Alterar configurações ou status dos dispositivos.
  - Substituir Dispositivo: Transferir configurações para um novo dispositivo.
  - Deletar Dispositivo: Remover dispositivos obsoletos ou fora de uso.

**2. Gerenciamento de Ambientes (Acesso para Operadores)**
- Descrição: Os operadores podem criar, editar, visualizar e remover ambientes para organizar dispositivos.
- Ações Disponíveis:
  - Listar Ambientes: Exibir todos os ambientes cadastrados.
  - Visualizar Tipos de Ambientes: Mostrar categorias de ambientes (quarto, sala, cozinha, etc.).
  - Cadastrar Novo Ambiente: Adicionar novos ambientes à plataforma.
  - Atualizar Ambiente: Modificar nome, tipo ou configurações de um ambiente.
  - Remover Ambiente: Excluir ambientes que não estão mais em uso.

**3. Gestão de Dispositivos por Ambiente**
- Descrição: Vincular dispositivos IoT a ambientes específicos e visualizar os dispositivos associados.
- Ações Disponíveis:
  - Visualizar Dispositivos de um Ambiente: Mostrar todos os dispositivos vinculados a um ambiente específico.
  - Adicionar Dispositivo a um Ambiente: Associar dispositivos recém-cadastrados a locais apropriados.

**4. Integração com API Home Assistant**
- Descrição: Comunicação contínua e sincronização dos dispositivos IoT com o Home Assistant.
- Funcionalidades:
  - Receber dispositivos emparelhados automaticamente via GET /inbox.
  - Sincronizar atualizações de status e propriedades de dispositivos em tempo real.
  - Garantir que substituições e atualizações de dispositivos sejam refletidas instantaneamente.


## Rotas - EndPoints :arrows_clockwise:

**INBOX-DEVICES:** Gerencia dispositivos emparelhados e cadastrados no banco de dados.

**1. GET /inbox**
- Descrição: Retorna dispositivos emparelhados com o Home Assistant que ainda não foram cadastrados no banco de dados.
- Resposta:
```
json
[
  {
    "id": "device-1",
    "name": "Smart Light",
    "type": "light",
    "status": "available"
  }
]
```

**2. GET /devices**
- Descrição: Retorna todos os dispositivos cadastrados no banco de dados.
- Resposta:
```
json
[
  {
    "id": "device-1",
    "name": "Smart Light",
    "location": "Living Room"
  }
]
```

**3. GET /devices/{id_device}**
- Descrição: Retorna as informações de um dispositivo específico.
- Parâmetro:
  - id_device: Identificador único do dispositivo.
  - Resposta:
```
json
{
  "id": "device-1",
  "name": "Smart Light",
  "properties": {
    "status": "on",
    "brightness": 75
  }
}
```

**4. POST /devices**
- Descrição: Cadastra um novo dispositivo no banco de dados.
- Body:
```
json
{
  "id": "device-2",
  "name": "Smart Thermostat",
  "location": "Bedroom"
}
```

**4. PUT /devices/{id_device}/properties**
- Descrição: Atualiza as propriedades de um dispositivo específico.
- Parâmetro:
  - id_device: Identificador do dispositivo.
  - Body:
```
json
{
  "status": "off",
  "brightness": 50
}
```

**5. DELETE /devices/{id_device}**
- Descrição: Remove um dispositivo específico do banco de dados.
- Parâmetro:
  - id_device: Identificador do dispositivo.
  
**6. GET /devices_id_name/{searchTerm}**
- Descrição: Pesquisa um dispositivo por ID ou nome no banco de dados.
- Parâmetro:
  - searchTerm: ID ou nome do dispositivo.

**7. PUT /devices/{id_device}/replace**
- Descrição: Substitui um dispositivo por outro, mantendo a configuração do anterior.
- Parâmetro:
  - id_device: Identificador do dispositivo atual.
  - Body:
```
json
{
  "new_device_id": "device-3",
  "name": "Smart Light v2",
  "location": "Living Room"
}
```

**LOCATIONS:** Gerencia os ambientes onde os dispositivos estão alocados.

**1. GET /locations**
- Descrição: Retorna todos os ambientes cadastrados no banco de dados.
- Resposta:
```
json
[
  {
    "id": "location-1",
    "name": "Living Room",
    "type": "room"
  }
]
```

**2. GET /locations/location-types**
- Descrição: Exibe os tipos de ambientes disponíveis.
- Resposta:
```
json
["room", "kitchen", "bathroom", "office"]
```

**3. POST /locations**
- Descrição: Cadastra um novo ambiente no banco de dados.
- Body:
```
json
{
  "id": "location-2",
  "name": "Kitchen",
  "type": "kitchen"
}
```

**4. PUT /locations/{id_ambiente}**
- Descrição: Atualiza as informações de um ambiente específico.
- Parâmetro:
  - id_ambiente: Identificador do ambiente.
  - Body:
```
json
{
  "name": "Main Kitchen",
  "type": "kitchen"
}
```

**5. DELETE /locations/{id_ambiente}**
- Descrição: Remove um ambiente do banco de dados.
- Parâmetro:
  - id_ambiente: Identificador do ambiente.

**6. GET /locations/{id_ambiente}**
- Descrição: Retorna os detalhes de um ambiente específico.
- Parâmetro:
  - id_ambiente: Identificador do ambiente.
  - Resposta:
```
json
{
  "id": "location-2",
  "name": "Kitchen",
  "type": "kitchen",
  "devices": []
}
```

**DEVICES-LOCATIONS:** Gerencia a vinculação de dispositivos a ambientes.

**1. GET /locations/{id_ambiente}/devices**
- Descrição: Retorna todos os dispositivos vinculados a um ambiente específico.
- Parâmetro:
  - id_ambiente: Identificador do ambiente.
  - Resposta:
```
json
[
  {
    "id": "device-1",
    "name": "Smart Light",
    "status": "on"
  }
]
```

**2. PUT /locations/{id_ambiente}/devices**
- Descrição: Adiciona um dispositivo a um ambiente específico.
- Parâmetro:
  - id_ambiente: Identificador do ambiente.
  - Body:
```
json
{
  "id_device": "device-2"
}
```


## Instação das depedências

```bash
$ npm install
```


## Executar app :arrow_forward:

**development:**
```bash
$ npm run start
```

```bash
Running on http://localhost:3000/
```

**watch mode:**
```bash
$ npm run start:dev
```

**production mode:**
```bash
$ npm run start:prod
```


## Test

**unit tests:**
```bash
$ npm run test
```

**e2e tests:**
```bash
$ npm run test:e2e
```

**test coverage:**
```bash
$ npm run test:cov
```

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

