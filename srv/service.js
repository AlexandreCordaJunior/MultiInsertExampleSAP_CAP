const cds = require("@sap/cds");
const { Funcionario } = cds.entities("com.ale.schema");

module.exports = class Service extends cds.ApplicationService {
    async init() {
        await super.init();

        this.on("insereMultiplosFuncionarios", this._insereMultiplosFuncionarios);
    }

    async _insereMultiplosFuncionarios(req) {
        const { funcionarios } = req.data;

        const tx = cds.tx(req);
        const aPromise = [];

        funcionarios.forEach(funcionario => {
            aPromise.push(this._insereUmFuncionario(tx, funcionario));
        });

        try {
            await Promise.all(aPromise);
            await tx.commit();
        }
        catch (e) {
            await tx.rollback();
            return req.error({
                message: "Não foi possível inserir os funcionários",
                status: 500
            });
        }
    }

    async _insereUmFuncionario(tx, funcionario) {
        return tx.run(
            INSERT.into(Funcionario).entries(funcionario)
        )
    }
}