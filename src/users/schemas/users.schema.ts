import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsersDocument = Users & Document;
@Schema()
export class Users {
  @Prop()
  userid: string;

  @Prop()
  names: string;

  @Prop()
  surnames: string;
  
  @Prop()
  typeId: string;
  
  @Prop()
  idNumber: number;

  @Prop()
  cell: number;

  @Prop()
  conventional: string;

  @Prop()
  residence: string;

  @Prop()
  email: string;
  
  @Prop()
  password: string;

  @Prop()
  role: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
