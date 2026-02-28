import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OrderDocument = Order & Document;

export enum OrderStatus {
  REJECTED = 'rejetee',
  PENDING = 'en_attente',
  ATTEMPT1 = 'tentative1',
  CONFIRMED = 'confirmee',
  PACKED = 'emballee',
  DELIVERED = 'livree',
  RETURNED = 'retournee',
}

export enum RejectReason {
  NOT_AVAILABLE = 'not_available',
  EXPENSIVE = 'expensive',
  DIDNT_CLICK = 'didnt_click_buy',
  BETTER_PRICE = 'better_price',
  EXPENSIVE_DELIVERY = 'expensive_delivery',
  OTHER = 'other',
}

@Schema({ timestamps: true })
export class OrderItem {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  product: Types.ObjectId;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  price: number;
}

const OrderItemSchema = SchemaFactory.createForClass(OrderItem);

@Schema({ timestamps: true })
export class Order {
  @Prop({
    type: String,
    enum: Object.values(OrderStatus),
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @Prop({
    type: String,
    enum: Object.values(RejectReason),
  })
  rejectReason?: RejectReason;

  @Prop()
  deliveryCompany: string;

  @Prop()
  privateNote: string;

  @Prop({ default: false })
  exchange: boolean;

  // Client details
  @Prop({ required: true })
  customerName: string;

  @Prop({ required: true })
  phone: string;

  @Prop()
  address: string;

  @Prop()
  city: string;

  @Prop()
  email: string;

  @Prop()
  customerNote: string;

  @Prop({ type: [OrderItemSchema], default: [] })
  items: OrderItem[];

  @Prop({ default: 0 })
  total: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
