export class Food {
    public id!:number;
    public description:string;
    public quantityCal:number;
    public unit: string;
    public isFresh: boolean;

    constructor(description: string, quantityCal: number, unit: string, isFresh:boolean) {
        this.id = Math.round(Math.random() * 1000);
        this.description = description;
        this.quantityCal = quantityCal;
        this.unit = unit;
        this.isFresh = isFresh;
    }

    public static clone(food: Food) {
        let f: Food = new Food(food.description, food.quantityCal, food.unit, food.isFresh);
        f.description = food.description;
        f.quantityCal = food.quantityCal;
        f.unit = food.unit;
        f.isFresh = food.isFresh;
        return f;
    }

}