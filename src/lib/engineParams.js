export class EngineParams {
    constructor() {
        // Conjunto de grupos iniciales
        this.seeds = [];
        this.bound = 0;
        // Un 'pool' representa un conjunto de grupos
        // que comparten un solo id
        this.pool_list = [];
    }

    // Regresa una representación de los pools en forma de un  objeto
    // materia. 
    get subjects() {
        return this.pool_list.map((val) => ({
            name: val.grid_list[0].data.nombre,
            subject_id: val.pool_id
        }));
    }
    addPool(pool) {
        // Buscar pool_id en seeds, lanza excepción si ya se encuentra.
        // Idealmente, esto nunca debería de ser un mensaje que el usuario
        // final encuentra.
        for (const seed of this.seeds) {
            for (const poolId of pool.pool_id.id_list) {
                for (const seedId of seed.pool_id.id_list) {
                    if (poolId == seedId) {
                        throw new Error("La clave de materia ya se encuentra en los grupos fijados.");
                    }
                }
            }
        }
        this.pool_list.push(pool);
    }
    removePool(poolId) {
        let poolIdx = this.pool_list.findIndex(pool => pool.pool_id.id_list === poolId.id_list);
        if (poolIdx !== -1) {
            return this.pool_list.splice(poolIdx, 1).pop();
        } else {
            console.error("No se encontró la pool!");
        }
    }
    addSeed(seed) {
        // Buscar pool_id en pool_list, lanza excepción si ya se encuentra.
        // Idealmente, esto nunca debería de ser un mensaje que el usuario
        // final encuentra.
        for (const pool of this.pool_list) {
            for (const poolId of pool.pool_id.id_list) {
                for (const seedId of seed.pool_id.id_list) {
                    if (poolId == seedId) {
                        throw new Error("La clave de grupo ya se encuentra en las materias seleccionadas.");
                    }
                }
            }
        }
        this.seeds.push(seed);
    }
    removeSeed(group) {
        let seedIdx = this.seeds.findIndex(s => {
            for (const poolId of s.pool_id.id_list) {
                for (const seedId of group.pool_id.id_list) {
                    if (poolId === seedId) {
                        return true;
                    }
                }
            }
            return false;
        });
        if (seedIdx !== -1) {
            return this.seeds.splice(seedIdx, 1).pop();
        } else {
            console.error("No se encontró la seed!");
        }
    }
}
