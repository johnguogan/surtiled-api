import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<{
        createdAt: Date;
        updatedAt: Date;
        userid: string;
        imageName?: string;
        names: string;
        surnames?: string;
        typeId?: string;
        idNumber?: string;
        cell?: string;
        conventional?: string;
        residence?: string;
        email?: string;
        password?: string;
        role: string;
    } & User>;
    findOne(userid: string): Promise<User>;
    findOneById(id: number): Promise<User>;
    findOneByToken(access_token: string): Promise<User>;
    findUsers(): Promise<User[]>;
    addUser(data: any): Promise<any>;
    updateUser(data: any): Promise<UpdateResult>;
    removeUser(id: number): Promise<DeleteResult>;
    updateUserToken(id: any, access_token: any): Promise<UpdateResult>;
    remove(id: number): Promise<void>;
    getUserByRole(role: string): Promise<User[]>;
    disableUserSocket(socketId: string): Promise<User>;
}
