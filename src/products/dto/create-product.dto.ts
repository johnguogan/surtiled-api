export class CreateProductDto {
    readonly names: string;
    readonly description: string;
    readonly imageUrl: string;
    readonly category: string;
    readonly lookfor: string;
    readonly price: number;
    readonly balance: number;
    readonly featured: boolean;
    readonly review: number;
    readonly  reviewNumber: number;
    readonly relatedKey: string[];
}
  