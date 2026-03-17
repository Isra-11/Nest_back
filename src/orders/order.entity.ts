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

/* ---------------- ORDER ITEM ---------------- */

@Schema()
export class OrderItem {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  product: Types.ObjectId;

  @Prop()
  quantity: number;

  @Prop()
  price: number;
  @Prop()
  deleveryFree: number;
}

const OrderItemSchema = SchemaFactory.createForClass(OrderItem);

/* ---------------- ORDER HISTORY ---------------- */

@Schema()
export class OrderHistory {
  @Prop()
  status: OrderStatus;

  @Prop()
  changedBy: string; // email admin ou client

  @Prop()
  note: string;

  @Prop({ default: Date.now })
  date: Date;
}

const OrderHistorySchema = SchemaFactory.createForClass(OrderHistory);

/* ---------------- ORDER ---------------- */

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

  /* CLIENT */

  @Prop()
  customerName: string;

  @Prop()
  phone: string;

  @Prop()
  address: string;

  @Prop()
  city: string;

  @Prop()
  email: string;

  @Prop()
  customerNote: string;

  /* PRODUCTS */

  @Prop({ type: [OrderItemSchema], default: [] })
  items: OrderItem[];

  @Prop({ default: 0 })
  total: number;

  /* HISTORY */

  @Prop({ type: [OrderHistorySchema], default: [] })
  history: OrderHistory[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
