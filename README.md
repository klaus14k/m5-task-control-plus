Autenticação para API de controle de tarefas

1 Introdução:

Nesta entrega, colocaremos em prática nossos os conhecimentos aprendidos em aula, desenvolvendo uma autenticação para nossa API de gerenciamento de tarefas. Serão necessárias algumas mudanças nas regras de negócio, para se adequar as mudanças.

2 Testes automáticos:

Para esta fase do projeto, será necessário um novo conjunto de testes automáticos, por isso, substitua a pasta de testes em seu projeto, pela pasta contida neste repositório.
Tenha em mente que os testes também dependerão do jsonwebtoken para funcionar, por isso, será necessário instalar este pacote em seu projeto, bem como, configurar uma variável de ambiente JWT_SECRET.

3 Banco de dados:

Com os testes atualizados, o primeiro passo, será atualizar as tabelas do banco de dados. Desta vez, será sua tarefa criar o novo modelo, bem como os relacionamentos.

3.1 User:

Crie um novo modelo User em schema.prisma, este deverá conter as seguintes colunas:

id - inteiro, chave primária e autoincrementado.
name - texto, obrigatório.
email - texto, obrigatório e único.
password - texto, obrigatório.

3.2 Relacionamentos:

Com o modelo User criado, estabeleça os relacionamentos conforme as especificações abaixo:
1 usuário poderá ter muitas tarefas, caso o usuário seja excluído as tarefas serão excluídas em cascata.
1 usuário poderá ter muitas categorias, caso o usuário seja excluído as categorias serão excluídas em cascata.

3.3 Migração:

Com todas as alterações completas, realize a migração para alterar as tabelas no banco de dados. Lembre-se, existe um comando de migração para testes e outro para desenvolvimento (atualize ambos).
Caso haja alguma restrição, exclua a pasta migrations em Prisma. E, ao tentar novamente, aceite reiniciar o banco de dados.

4 Rotas e rotinas de usuário:

Um dos objetivos principais nesta entrega, é a criação do conjunto de rotas de usuário. Confira a tabela abaixo listando cada uma delas:

Endereço - Método - Descrição
/users - POST - Rota de cadastro de usuários.
/users/login - POST - Rota de login de usuários.
/users/profile - GET - Rota de autologin (recuperação do perfil via token).

4.1 Cadastro de usuário POST /users:

Padrão de corpo

{
    "name": "John Doe",
    "email": "johndoe@email.com",
    "password": "12345678"
}

Padrão de resposta (STATUS 201)

{
    "id": 1,
    "name": "John Doe",
    "email": "johndoe@email.com"
}⁠

Possíveis erros:
STATUS (409) - E-mail já cadastrado

{ "message": "This email is already registered" }

STATUS (400) quando o corpo não é compatível com o padrão

Utilize o Zod para fazer a validação correta do corpo de requisição.

4.2 Login de usuário POST /user/login:

Padrão de corpo

{
    "email": "johndoe@email.com",
    "password": "12345678"
}

Padrão de resposta (200)

{
	"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAxMjcwMjk2LCJleHAiOjE3MDEzMTM0OTZ9.Ebru139GF02sx9EFR0PouLrErYyYIcFJgLa6vIfsktA",
	"user": {
		"id": 1,
		"name": "John Doe",
		"email": "johndoe@email.com"
	}
}⁠

Possíveis erros:
STATUS (404) - Usuário não existente

{ "messsage": "User not exists" }

STATUS (401) - E-mail e senha não correspondem

{ "messsage": "Email and password doesn't match" }

STATUS (409) quando o corpo não é compatível com o padrão

Utilize o Zod para fazer a validação correta do corpo de requisição.

4.3 Recuperação de usuário /users/profile (Precisa de autorização):

Padrão de resposta (200)

{
    "id": 1,
    "name": "John Doe",
    "email": "johndoe@email.com"
}⁠

5 Gerenciamento de token:

O gerenciamento do JSON Web Token deverá ser criado com base nos exemplos apresentados em aula.

Deverá ser gerado um token no serviço da rota de login, este token deverá armazenar no "payload" o identificador do usuário.
Será necessário a criação de um "middleware" para proteção de rotas. Este middleware deverá decodificar a token e armazenar em res.locals, caso a mesma seja válida.
Os erros emitidos pelo jsonwebtoken deverão ser tratados no middleware de erro já existente na aplicação.
Possíveis erros na validação de Token:
STATUS (401) - O token é obrigatório

{ "messsage": "Token is required" }

STATUS (401) - Token inválido. Mensagem de erro será gerada pelo próprio JSON Web Token.

6 Alterações nas regras de negócio existentes:

Todas as rotas de tarefa e categorias precisarão de autorização para serem acessadas.

6.1 Rotas de tarefas:

Rota

Alteração

POST /tasks

Na criação da tarefa será fornecido, além dos dados presentes no corpo da requisição, o identificador vindo da token.

GET /tasks

Deverá trazer somente as tarefas criadas pelo usuário logado. Em caso de filtragem por categoria, a categoria filtrada deverá pertencer ao usuário.

GET /tasks/:id

Só será possível ler a tarefa caso a mesma pertença ao usuário logado.

PATCH /tasks/:id

Só será possível atualizar a tarefa caso a mesma pertença ao usuário logado.

DELETE /tasks/:id

Só será possível deletar a tarefa caso a mesma pertença ao usuário logado.

Padrão de erro para caso a tarefa não pertencer ao usuário
STATUS (403) - Tarefa não pertence ao usuário

{ "message": "This user is not the task owner" }

6.2 Rotas de categoria:

Rota

Alteração

POST /categories

Na criação da categoria será fornecido, além dos dados presentes no corpo da requisição, o identificador vindo da token.

DELETE /categories/:id

Só será possível deletar a categoria caso a mesma pertença ao usuário logado.

Padrão de erro para caso a categoria não pertencer ao usuário
STATUS (403) - Categoria não pertence ao usuário

{ "message": "This user is not the category owner" }

7 Requisitos gerais:

O projeto deverá seguir os padrões de arquitetura apresentados nas aulas.
A senha deverá ser criptografada utilizando o bcrypt.

8 Desafio:

Conforme demonstrado nas aulas, realize o "deploy" da sua aplicação no render.

9 Finalização:

Com a entrega completa, e todos os teste em sucedidos, basta enviar para correção! Não esqueça de compartilhar o repositório com o time das correções.
