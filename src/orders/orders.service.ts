import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>,
  ) {}

  async create(data: CreateOrderDto) {
    const total = data.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    return this.orderModel.create({ ...data, total });
  }

  findAll() {
    return this.orderModel.find().populate('items.product').lean().exec();
  }

  async findOne(id: string) {
    const order = await this.orderModel
      .findById(id)
      .populate('items.product')
      .lean()
      .exec();

    if (!order) throw new NotFoundException('Order not found');

    return order;
  }

  async update(id: string, data: UpdateOrderDto) {
    if (data.items) {
      data['total'] = data.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
    }

    const updated = await this.orderModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updated) throw new NotFoundException('Order not found');

    return updated;
  }

  async remove(id: string) {
    const deleted = await this.orderModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Order not found');

    return { message: 'Order deleted' };
  }
}
