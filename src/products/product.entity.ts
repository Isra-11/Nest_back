import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  price: number;

  @Prop({ default: 0 })
  deliveryPrice: number;

  @Prop({ default: 0 })
  stock: number;

  @Prop({ default: 'ACTIVE' }) 
  status: string;

  @Prop({ type: [String], default: [] })
  adsLinks: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
