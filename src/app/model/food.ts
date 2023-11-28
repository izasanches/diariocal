export class Food {
    public id!:string;
    public description:string;
    public quantityCal:number;
    public unit: string;
    public isFresh: boolean;
    public categoryId: number;

    constructor(description: string, quantityCal: number, unit: string, isFresh:boolean, categoryId: number) {
        this.id = String(Math.round(Math.random() * 1000));
        this.description = description;
        this.quantityCal = quantityCal;
        this.unit = unit;
        this.isFresh = isFresh;
        this.categoryId = categoryId;
    }

    public static clone(food: Food) {
        let f: Food = new Food(food.description, food.quantityCal, food.unit, food.isFresh, food.categoryId);
        f.description = food.description;
        f.quantityCal = food.quantityCal;
        f.unit = food.unit;
        f.isFresh = food.isFresh;
        f.categoryId = food.categoryId;
        return f;
    }

}