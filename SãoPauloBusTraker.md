# São Paulo Bus Traker 
 
São Paulo Bus Traker é uma dashboard que permite o monitoramento em tempo real da frota de ônibus da cidade de São Paulo.
# Features!
  - Busca e localização de linhas
  - Busca e localização de paradas
  - Localização de veículos
  - Previsão de chegada dos veículos
  - Atualização em tempo real
  - Informações sobre linhas, paradas e veículos
 
### Tecnologias Utilizadas
 
* SPTrans Olho Vivo - API do transporte público de São Paulo 
* React - Framework
* Typescript - Linguagem de programação
* SASS - Estilização
* Google Maps React Api - Biblioteca de geolocalização
* Materal UI - Bibliotecas de componentes
* node.js - Backend
 
### Instalação
 
Pré Requisitos
para o funcionamento adequado São Paulo Bus Traker requer [Node.js](https://nodejs.org/) v12+ alem de chaves de utilização do [Google Maps JavaScript API
](https://console.cloud.google.com/marketplace/product/google/maps-backend.googleapis.com?q=search&referrer=search&hl=pt_BR&project=sptransmaps) e [SPTrans Olho Vivo Api](http://www.sptrans.com.br/desenvolvedores)
 
 
Clonar o projeto
```sh
$ git clone https://github.com/renan905/programa-estagio
```
## front-end:
Instalar dependências. 
`yarn é recomendado como gerenciador de pacotes do front-end`
 
```sh
$ cd programa-estagio/app
$ yarn
```
#### back-end:
Instalar dependências. 
`npm é recomendado como gerenciador de pacotes do back-end`
```sh
$ cd programa-estagio/server
$ npm install
```
 
Configurar secret keys...
renomeie o arquivo `.env-sample` para `.env` (no front e back end), adicione as chaves do Google Maps JS API ao arquivo referente ao front-end e as chaves da SPTrans Olho Vivo API no back-end.
 
#### Inicializar o projeto
front-end
```app
$ yarn start
```
back-end
```server
$ npm run dev
```
 
 
License
----
 
MIT
 
 
 
