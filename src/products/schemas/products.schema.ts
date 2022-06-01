import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Categories } from 'src/categories/schemas/categories.schema';

export type ProductsDocument = Products & Document;
@Schema()
export class Products {
  @Prop()
  name: string;

  @Prop()
  code: number;
  // @Prop()
  // characteristic: string;

  // @Prop()
  // imageUrl: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category'})
  category: Categories;
  
  // @Prop()
  // lookfor: string;

  @Prop()
  price: number;

  @Prop()
  balance: number;

  @Prop()
  featured: boolean;

  // @Prop()
  // review: number;

  // @Prop()
  // reviewNumber: number;
  
  // @Prop()
  // relatedKey: string[];

}

export const ProductsSchema = SchemaFactory.createForClass(Products);
