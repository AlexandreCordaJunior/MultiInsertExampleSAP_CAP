using {com.ale.schema as schema} from '../db/schema.cds';

@path: '/backend/service'
service Service {
    entity funcionario as projection on schema.Funcionario;
    action insereMultiplosFuncionarios(funcionarios : array of funcionario);
}
