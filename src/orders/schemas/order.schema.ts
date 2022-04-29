import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrdersDocument = Orders & Document;
@Schema()
export class Orders {
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

export const OrdersSchema = SchemaFactory.createForClass(Orders);
