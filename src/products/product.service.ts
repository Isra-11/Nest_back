import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) {}

  async create(data: CreateProductDto) {
    return this.productModel.create(data);
  }

  async findAll() {
    return this.productModel.find().lean().exec();
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id).lean().exec();
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(id: string, body: Partial<CreateProductDto>, images?: string[]) {
    if (images?.length) {
      body.images = images;
    }

    const updated = await this.productModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updated) throw new NotFoundException('Product not found');

    return updated;
  }

  async remove(id: string) {
    const deleted = await this.productModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Product not found');
    return { message: 'Product deleted' };
  }
}
