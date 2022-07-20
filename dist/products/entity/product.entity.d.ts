import { Category } from 'src/categories/entity/category.entity';
import { OrderList } from 'src/orders/entity/orderlist.entity';
export declare class Product {
    id: number;
    name: string;
    code: number;
    imageName: string;
    price: number;
    balance: number;
    color: string;
    featured: boolean;
    type: string;
    score: number;
    reviewNumber: number;
    active: boolean;
    createdAt: Date;
    category: Category;
    orderList: OrderList[];
}
