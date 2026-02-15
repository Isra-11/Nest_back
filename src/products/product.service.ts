import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product, ProductDocument } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(dto: CreateProductDto) {
    return this.productModel.create(dto);
  }

  async findAll() {
    return this.productModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string) {
    return this.productModel.findById(new Types.ObjectId(id)).exec();
  }

  async update(id: string, dto: Partial<CreateProductDto>) {
    return this.productModel
      .findByIdAndUpdate(new Types.ObjectId(id), dto, { new: true })
      .exec();
  }

  async delete(id: string) {
    return this.productModel.findByIdAndDelete(new Types.ObjectId(id)).exec();
  }
}
