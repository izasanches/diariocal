export class Category {
    id!:string;
    description:string;

    constructor(description: string) {
        this.id = String(Math.round(Math.random() * 1000));
        this.description = description;
    }

    public static clone(category: Category) {
        let categ: Category = new Category(category.description);
        categ.description = category.description;
        return categ;
    }

}