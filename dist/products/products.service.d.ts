import { Product } from './entity/product.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/entity/category.entity';
import { FavoritesService } from 'src/favorites/favorites.service';
export declare class ProductsService {
    private productRepository;
    private categoryRepository;
    private favoriteService;
    constructor(productRepository: Repository<Product>, categoryRepository: Repository<Category>, favoriteService: FavoritesService);
    create(createProductDto: any): Promise<any>;
    findOne(id: number): Promise<Product | undefined>;
    findAll(): Promise<Product[]>;
    findProducts(id: number): Promise<any>;
    filterProducts(filtterList: any): Promise<any>;
    filterServices(filtterList: any): Promise<any>;
    findServices(id: number): Promise<any>;
    findProduct(id: number, userid: number): Promise<any>;
    featuredAll(type: any): Promise<Product[]>;
    update(id: number, data: any): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").UpdateResult>;
}
