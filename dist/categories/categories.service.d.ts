import { Repository } from 'typeorm';
import { Category } from './entity/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
export declare class CategoriesService {
    private categoriesRepository;
    constructor(categoriesRepository: Repository<Category>);
    create(createCategoryDto: CreateCategoryDto): Promise<void | (CreateCategoryDto & Category)>;
    findOne(id: number): Promise<Category | undefined>;
    findCategories(): Promise<Category[]>;
    remove(id: number): Promise<Category>;
}
