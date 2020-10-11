# São Paulo Bus Traker 

São Paulo Bus Traker é uma dashboard que permite o monitoramento em tempo real da frota de ônibus da cidade de São Paulo.
# Features!
  - Busca e localização de linhas
  - Busca e localização de paradas
  - Localização de veiculos
  - Previsão de chegada dos veiculos
  - Atualização em tempo real
  - Informações sobre linhas, paradas e veiculos

### Tecnologias Utilizadas

* SPTrans Olho Vivo - API do transporte publico de São Paulo 
* React - Framework
* Typescript - Linguagem de programação
* SASS - Estilização
* Google Maps React Api - Biblioteca de geolocalização
* Materal UI - Bibliotecas de componentes
* node.js - Backend

### Instalação

Pre Requisitos
para o funcionamento adequado São Paulo Bus Traker requer [Node.js](https://nodejs.org/) v12+ alem de chaves de utilização do [Google Maps JavaScript API
](https://console.cloud.google.com/marketplace/product/google/maps-backend.googleapis.com?q=search&referrer=search&hl=pt_BR&project=sptransmaps) e [SPTrans Olho Vivo Api](http://www.sptrans.com.br/desenvolvedores)


Clonar o projeto
```sh
$ git clone https://github.com/renan905/programa-estagio
```
## front-end:
Instalar dependencias. 
`yarn é recomendado como gerenciador de pacotes do front-end`

```sh
$ cd programa-estagio/app
$ yarn
```
#### back-end:
Instalar dependencias. 
`npm é recomendado como gerenciador de pacotes do back-end`
```sh
$ cd programa-estagio/server
$ npm install
```

Configurar secret keys...
renomei o arquivo `.env-sample` para `.env` (no front e back end), adicione as chaves do Google Maps JS API ao arquivo referente ao front-end e as chaves da SPTrans Olho Vivo API no back-end.

#### Inicialiar o projeto
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


