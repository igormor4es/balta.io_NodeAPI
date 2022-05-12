# balta.io_NodeAPI - Criando APIs com NodeJs

### LINK PARA OS VÍDEOS
Você pode assistir os vídeos deste curso no site http://balta.io.

http://player.balta.io/#/courses/1972

### Sumário
Neste curso vamos unir a popularidade das APIs com a popularidade do JavaScript criando uma API completa com NodeJs, passando pelos principais pontos que você precisa conhecer para colocar seu projeto em produção.

### Conteúdo Programático
* Instalação Node, NPM e VS Code
* npm init e instalação dos pacotes
* Criando um servidor Web
* Normalizando a porta
* Gerenciando Erros do Servidor
* Iniciando o Debug
* Separando o Servidor
* Configurando o NPM Start
* Nodemon
* CRUD REST
* Rotas
* Controllers
* MongoDb Setup
* Mongooose
* Models
* Criando um Produto
* Listando os Produtos
* Listando um Produto pelo slug
* Listando um Produto pelo Id
* Listando os Produtos de uma tag
* Atualizando um produto
* Excluindo um produto
* Validações
* Repositórios
* Async/Await
* Revisitando os Models: Customer
* Revisitando os Models: Order
* Revisitando os Models: OrderItems
* Revisitando os Controllers: Customer
* Revisitando os Controllers: Order
* Arquivo de Configurações
* Enviando E-mail de Boas Vindas
* Upload da Imagem do Produto
* Autenticação
* Autorização
* Habilitando CORS
* Publicando a API

### Conexão MongoDB
* Criar um arquivo .env na raiz com a string de conexão do banco.
* MONGODB_URI="AQUI VAI A STRING DE CONEXÃO"

### Conexão SendGrid
* Criar uma conta em https://sendgrid.com/ para o envio de email's gratuitos.
* Com o arquivo .env já criado, adicionar: SENDGRID_KEY='AQUI VAI SUA KEY'

### Conexão AzureBlob
* Criar uma conta em https://azure.microsoft.com/pt-br/services/storage/blobs/ para o armazenamento de imagens.
* Com o arquivo .env já criado, adicionar: AZURE_BLOB_URI='AQUI VAI A STRING DE CONEXÃO'
* OBS: Deixei desativado no código, pois não quis criar a conta, preferi armazenar a base64 da imagem direto no banco.
