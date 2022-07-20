import { Product } from 'src/products/entity/product.entity';
export declare class Category {
    id: number;
    label: string;
    categoryId: number;
    imgUrl: string;
    type: string;
    products: Product[];
}
