"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("./entity/product.entity");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("../categories/entity/category.entity");
const favorites_service_1 = require("../favorites/favorites.service");
let ProductsService = class ProductsService {
    constructor(productRepository, categoryRepository, favoriteService) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.favoriteService = favoriteService;
    }
    async create(createProductDto) {
        createProductDto['createdAt'] = new Date();
        return await this.productRepository.save(createProductDto);
    }
    async findOne(id) {
        return await this.productRepository.findOne({ where: { id } });
    }
    async findAll() {
        return this.productRepository.find({
            relations: ['category'],
        });
    }
    async findProducts(id) {
        const result = this.categoryRepository.findOne({
            relations: ['products'],
            where: { id, products: { active: true } },
        })
            .then((res) => {
            res.products = res.products.filter(item => item.type === 'product');
            return res;
        })
            .catch(err => {
            console.log("findServices Error!");
        });
        return result;
    }
    async filterProducts(filtterList) {
        const { category, lookfor, max, min } = filtterList;
        let productList = [];
        let result = [];
        switch (lookfor) {
            case 'popular':
                productList = await this.productRepository.find({
                    relations: ['category'],
                    where: { category: { id: category }, type: 'product' },
                    order: { 'score': 'DESC' }
                });
                break;
            case 'new':
                productList = await this.productRepository.find({
                    relations: ['category'],
                    where: { category: { id: category }, type: 'product' },
                    order: { 'createdAt': 'DESC' }
                });
                break;
            case 'old':
                productList = await this.productRepository.find({
                    relations: ['category'],
                    where: { category: { id: category }, type: 'product' },
                    order: { 'createdAt': 'ASC' }
                });
                break;
            case 'higher':
                productList = await this.productRepository.find({
                    relations: ['category'],
                    where: { category: { id: category }, type: 'product' },
                    order: { 'price': 'DESC' }
                });
                break;
            case 'lower':
                productList = await this.productRepository.find({
                    relations: ['category'],
                    where: { category: { id: category }, type: 'product' },
                    order: { 'price': 'ASC' }
                });
                break;
            default:
                break;
        }
        result = productList;
        if (min > 0)
            result = productList.filter((item) => item.price > min);
        if (max > 0)
            result = result.filter((item) => item.price < max);
        return result.filter(item => item.active === true);
    }
    async filterServices(filtterList) {
        const { category, lookfor, max, min } = filtterList;
        let productList = [];
        let result = [];
        switch (lookfor) {
            case 'popular':
                productList = await this.productRepository.find({
                    relations: ['category'],
                    where: { category: { id: category }, type: 'service' },
                    order: { 'score': 'DESC' }
                });
                break;
            case 'new':
                productList = await this.productRepository.find({
                    relations: ['category'],
                    where: { category: { id: category }, type: 'service' },
                    order: { 'createdAt': 'DESC' }
                });
                break;
            case 'old':
                productList = await this.productRepository.find({
                    relations: ['category'],
                    where: { category: { id: category }, type: 'service' },
                    order: { 'createdAt': 'ASC' }
                });
                break;
            case 'higher':
                productList = await this.productRepository.find({
                    relations: ['category'],
                    where: { category: { id: category }, type: 'service' },
                    order: { 'price': 'DESC' }
                });
                break;
            case 'lower':
                productList = await this.productRepository.find({
                    relations: ['category'],
                    where: { category: { id: category }, type: 'service' },
                    order: { 'price': 'ASC' }
                });
                break;
            default:
                break;
        }
        result = productList;
        console.log("product list: ", result);
        if (min > 0)
            result = productList.filter((item) => item.price > min);
        if (max > 0)
            result = result.filter((item) => item.price < max);
        return result.filter(item => item.active === true);
    }
    async findServices(id) {
        const result = this.categoryRepository.findOne({
            relations: ['products'],
            where: { id, products: { active: true } }
        })
            .then((res) => {
            res.products = res.products.filter(item => item.type === 'service');
            return res;
        })
            .catch(err => {
            console.log("findServices Error!");
        });
        return result;
    }
    async findProduct(id, userid) {
        const product = await this.productRepository.findOne({
            where: { id }
        });
        product['favorite'] = await this.favoriteService.getFavorite({ productid: id, userid });
        return product;
    }
    async featuredAll(type) {
        return this.productRepository.find({
            where: { featured: true, type }
        });
    }
    async update(id, data) {
        return await this.productRepository.update({ id }, data);
    }
    remove(id) {
        return this.productRepository.update(id, { active: false });
    }
};
ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        favorites_service_1.FavoritesService])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map