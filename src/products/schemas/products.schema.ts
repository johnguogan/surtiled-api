import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductsDocument = Products & Document;
@Schema()
export class Products {
  @Prop()
  names: string;

  @Prop()
  description: string;

  @Prop()
  imageUrl: string;

  @Prop()
  category: string;
  
  @Prop()
  lookfor: string;

  @Prop()
  price: number;

  @Prop()
  balance: number;

  @Prop()
  featured: boolean;

  @Prop()
  review: number;

  @Prop()
  reviewNumber: number;
  
  @Prop()
  relatedKey: string[];

}

export const ProductsSchema = SchemaFactory.createForClass(Products);
