# Medprev

## Tecnologias
nodeJS, Typescript e mongo

## como executar
* docker compose up
* npm run dev

## endpoints 
### Criar
POST http://localhost:3000/person
````
{
    "tipo" : "PJ",
    "nome" :  "Teste",
    "razaoSocial" :  "Teste",
    "cnpj" :  "61172553000116",
    "email" :  "test@testemail.test",
    "telefone":  "123123",
    "celular":  "234234",
    "foto":  "https://localhost/person.gif",
    "enderecos": [
			{
				"rua": "saff",
				"numero": "fasdf",
				"complemento": "fass",
				"bairro": "fsa",
				"cidade": "sf",
				"estado": "afsd",
				"cep": "213123"
			}
		]
}
````
### Atualizar
PUT http://localhost:3000/person/{id}
````
{
    "tipo" : "PJ",
    "nome" :  "Test",
    "razaoSocial" :  "Test",
    "cnpj" :  "61172553000116",
    "email" :  "test@testemail.test",
    "telefone":  "123123",
    "celular":  "234234",
    "foto":  "https://localhost/person.gif",
    "enderecos": [
			{
				"rua": "saff",
				"numero": "fasdf",
				"complemento": "fass",
				"bairro": "fsa",
				"cidade": "sf",
				"estado": "afsd",
				"cep": "213123"
			}
		]
}
````
### Deleter
DELETE http://localhost:3000/person/{id}
### Visualizar
GET http://localhost:3000/person/{id}
### Listar 
GET http://localhost:3000/person

## TODO
* SimpleRoute - ok : Roteador simples utilizando padrão de projeto Strategy para tratar resposta de acordo com o tipo json ou texto
* Container - ok : Container de injeção de dependencias simples
* Auth - todo : Authenticação para acessar os endpoints  
* Middleware - todo : Middleware simples utilizando padrão de projeto chain of resnponsibility para executar tarefas antes da execução do request
* Testes unitários - todo : testes unitários utilizando jest
* Validador - incompleto : valida documentos(ok) , email(todo) e data(todo)