import internal from "stream";

export class CreateProductDto {
    readonly name: string;
    readonly code: number;
    // readonly characteristic: string;
    readonly imageName: string;
    readonly price: number;
    readonly balance: number;
    readonly color: string;
    readonly featured: boolean;
    categoryId: number;
    // readonly review: number;
    // readonly  reviewNumber: number;
    // readonly relatedKey: string[];
}
