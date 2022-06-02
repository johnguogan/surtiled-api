export class CreateUserDto {
    readonly userid: string;
    readonly names: string;
    readonly surnames: string;
    readonly typeId: string;
    readonly idNumber: number;
    readonly cell: number;
    readonly conventional: string;
    readonly residence: string;
    readonly email: string;
    password: string;
    readonly role: string;
}
