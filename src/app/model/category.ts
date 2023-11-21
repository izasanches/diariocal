export class Category {
    id!:string;
    description?:string;

    constructor(description: string) {
        this.id = String(Math.round(Math.random() * 1000));
        this.description = description;
    }

    /**
    * Transforma um objeto pego da API para a versão salva no WebStorage
    * @param category
    * @returns
    */
   /* public static toWS(category: Category) {
        let c: Category = new Category(category.description);
        c.description = category.description;
        return c;
    }*/
}