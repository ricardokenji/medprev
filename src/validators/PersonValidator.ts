import { AddressRequest, PersonRequest } from "../controllers/PersonController";
import { cpf, cnpj } from 'cpf-cnpj-validator'; 
import { sanitizer } from "../lib/framework";

export default class PersonValidator {
    private errors: Array<string> = []
    
    validateRequest(input: PersonRequest): Array<string> {
        this.checkRequiredString("nome", input.nome)
        this.checkTipo(input)
        this.checkEndereco(input.enderecos)

        return this.errors
    }

    checkRequiredString(field: string, value: string) {
        if (value == null || value == undefined || value.trim().length == 0) {
            this.errors.push(field + " é obrigatório")
        }
    }

    checkTipo(input: PersonRequest) {
        this.checkRequiredString("tipo", input.tipo)

        if (input.tipo == "PF") {
            this.checkDocumentCPF(input.cpf)
            this.checkRequiredString("nome", input.sexo)
            this.checkRequiredString("nome", input.dataNascimento)
        } else if (input.tipo == "PJ") {
            this.checkDocumentCNPJ(input.cnpj)
            this.checkRequiredString("nome", input.razaoSocial)
        } else {
            this.errors.push("Tipo de pessoa deve ser CPF ou CNPJ")
        }
    }

    checkDocumentCPF(value: string) {
        this.checkRequiredString("cpf", value)
        if (!cpf.isValid(sanitizer.documentNumber(value))) {
            this.errors.push("CPF inválido")
        }
    }

    checkDocumentCNPJ(value: string) {
        this.checkRequiredString("cnpj", value)
        if (!cnpj.isValid(sanitizer.documentNumber(value))) {
            this.errors.push("CNPJ inválido")
        }
    }

    checkEndereco(value: AddressRequest[]) {
        if (value == null || value == undefined || value.length == 0) {
            this.errors.push("Endereço é obrigatório")
        }

        value.forEach( address => {
            this.checkRequiredString("rua", address.rua)
            this.checkRequiredString("numero", address.numero)
            this.checkRequiredString("cidade", address.cidade)
            this.checkRequiredString("estado", address.estado)
            this.checkRequiredString("cep", address.cep)
        })
    }
    
}