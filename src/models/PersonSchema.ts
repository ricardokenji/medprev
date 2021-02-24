import mongoose, { Connection } from 'mongoose'

const PersonSchema = new mongoose.Schema({
    personId: {
        type: 'String',
        required: true,
        index: true  
    },
    tipo: {
        type: 'String',
        enum: ['PF', 'PJ'],
        required: true
    },
    nome: {
        type: 'String',
        required: true
    },
    razaoSocial: {
        type: 'String'
    },
    cpf: {
        type: 'String'
    },
    cnpj: {
        type: 'String'
    },
    sexo: {
        type: 'String'
    },
    dataNascimento: {
        type: 'String'
    },
    email: {
        type: 'String'
    },
    telefone: {
        type: 'String'
    },
    celular: {
        type: 'String'
    },
    foto: {
        type: 'String'
    },
    enderecos: [
        {
            rua: {
                type: 'String',
                required: true
            },
            numero: {
                type: 'String',
                required: true
            },
            complemento: {
                type: 'String'
            },
            bairro: {
                type: 'String'
            },
            cidade: {
                type: 'String',
                required: true
            },
            estado: {
                type: 'String',
                required: true
            },
            cep: {
                type: 'String',
                required: true
            },
        },
    ],
});

export default mongoose.model('Person', PersonSchema);
