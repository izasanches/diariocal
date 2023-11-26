import { Constants } from 'src/app/util/constants';
import { Category } from '../model/category';

export class Shared {
    public static initializeWebStorage(): void {
        if (localStorage.getItem(Constants.DESCRIPTION_KEY) != null) {
            return;
        }

        let category = new Category(Constants.DESCRIPTION_KEY);
        localStorage.setItem(Constants.DESCRIPTION_KEY, JSON.stringify(category));
    }
}