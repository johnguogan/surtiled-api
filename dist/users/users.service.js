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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const user_entity_1 = require("./entity/user.entity");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async create(createUserDto) {
        const data = Object.assign(Object.assign({}, createUserDto), { createdAt: new Date(), updatedAt: new Date() });
        return await this.usersRepository.save(data);
    }
    async findOne(userid) {
        const result = await this.usersRepository.findOne({ where: { userid } });
        return result;
    }
    async findOneById(id) {
        const result = await this.usersRepository.findOne({ where: { id } });
        return result;
    }
    async findOneByToken(access_token) {
        const result = await this.usersRepository.findOne({ where: { access_token } });
        return result;
    }
    async findUsers() {
        return await this.usersRepository.find();
    }
    async addUser(data) {
        data['password'] = await bcrypt.hash(data['password'], 10);
        data['createdAt'] = new Date();
        return await this.usersRepository.save(data);
    }
    async updateUser(data) {
        if (data['password'])
            data['password'] = await bcrypt.hash(data['password'], 10);
        data['updatedAt'] = new Date();
        return await this.usersRepository.update(data.id, data);
    }
    async removeUser(id) {
        return this.usersRepository.delete(id);
    }
    async updateUserToken(id, access_token) {
        return await this.usersRepository.update(id, { access_token });
    }
    async remove(id) {
        await this.usersRepository.delete(id);
    }
    async getUserByRole(role) {
        const result = await this.usersRepository.find({
            where: { role },
            select: {
                id: true,
                names: true,
                surnames: true,
                imageLink: true,
                role: true,
                socketId: true,
            }
        });
        return result;
    }
    async disableUserSocket(socketId) {
        const user = await this.usersRepository.findOne({ where: { socketId } });
        let result;
        if (user)
            result = await this.usersRepository.update(user.id, { socketId: '' });
        return user;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map