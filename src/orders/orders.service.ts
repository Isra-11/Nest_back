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
      (sum, item) =>
        sum + item.price * item.quantity + (item.deleveryFree || 0),
      0,
    );

    const order = await this.orderModel.create({
      ...data,
      status: 'en_attente',
      total,
      history: [
        {
          status: 'en_attente',
          changedBy: data.email || data.customerName,
          note: 'Commande créée',
          date: new Date(),
        },
      ],
    });

    return order;
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

  async update(id: string, data: UpdateOrderDto, adminEmail: string) {
    const order = await this.orderModel.findById(id);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (data.status && data.status !== order.status) {
      order.history.push({
        status: data.status,
        changedBy: adminEmail,
        note: 'Statut modifié',
        date: new Date(),
      });

      order.status = data.status;
    }

    if (data.items) {
      order.total = data.items.reduce(
        (sum, item) =>
          sum + item.price * item.quantity + (item.deleveryFree || 0),
        0,
      );
    }

    Object.assign(order, data);

    return order.save();
  }

  async remove(id: string) {
    const deleted = await this.orderModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Order not found');

    return { message: 'Order deleted' };
  }
}
