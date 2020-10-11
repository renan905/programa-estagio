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
 
# Explicando algumas de decisões

#### Google Maps vs Leaflet
Ambas ferramentas são apropriadas para o proposto pelo teste, como as duas possuem suporte para o framework de desenvolvimento que escolhi decidi realizar alguns teste para saber qual utilizar. O Google Maps possui excelente suporte e documentação, já o Leaflet conta com amplo detalhamento no seus mapas que para uma ferramenta de geolocalização é muito importante. Pensando nisso (e pelo fato de ser open source) comecei utilizando Leaflet, entretanto logo que iniciei a implementação das primeiras funcionalidades que exigiam o plot de muitos pontos no mapa notei que o desempenho no mapa reduzia vertiginosamente, nesse momento testei as mesma funções utilizando o Google Maps e percebi que ele conseguia “aguentar” uma maior carga de informações sem quedas de desempenho. Dessa forma optei pelo Google Maps por seu desempenho.


#### Por que não utilizei o Google Routers?
Um dos pontos listado como extra para o teste de front-end é o cálculo de rotas. Tendo escolhido o Google Maps como plataforma de mapas o Leaflet Routing Machine era uma escolha descartada, o que acabou me deixando o Google Maps Routes com opção. Um ótima opção, provavelmente a mais utilizada pelo mercado, o problema é que a API fornece resultado como base em “Travel modes”, onde o “Travel Mode” mais próximo ao de uma ônibus é o “driving” que é destinado a carros/motos. São Paulo é uma cidade que possui faixas especiais para ônibus, onde o acesso a algumas paradas é exclusiva para ônibus, para muitas paradas isso é irrelevante porém quando se trata de dashboard é voltada para transporte público, alguns paradas ficariam inacessíveis devido a API não possuir um “Travel mode” destinado a veículos de transporte público (observação: o Google Maps Routers possui um “Travel mode” chamado “transit”, que visa traçar trajetos para pessoas que vão utilizar o transporte público, entretanto tais trajetos não se aplicam ao caso). Pensando nesse fato planejei utilizar as informações de trajeto contidas no GTFS disponibilizado na seção de desenvolvedores da SPTrans. Devido ao grande tempo de resposta entre o front-end e back-end causado pelo tamanho dos arquivos decidi abandonar esse plano, que para funcionar bem exigiria um pouco mais de trabalho no back-end.


License
----
 
MIT
 
 
 
