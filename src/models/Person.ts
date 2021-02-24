
export interface Person {
    personId: String
    tipo: PersonType
    nome: string
    razaoSocial: string
    cpf: string
    cnpj: string
    sexo: string
    dataNascimento: string
    email: string
    telefone: string
    celular: string
    foto: string
    enderecos: Array<Address>
}

export interface Address {
    rua: string
    numero: string
    complemento: string
    bairro: string
    cidade: string
    estado: string
    cep: string
}

export enum PersonType {
    PF = "PF",
    PJ = "PJ"
}