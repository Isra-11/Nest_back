/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  // CREATE
  @Post()
  @UseInterceptors(FilesInterceptor('images', 10))
  create(
    @Body() body: CreateProductDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const imagePaths = files?.map((file) => `/uploads/${file.filename}`) || [];
    return this.productsService.create({ ...body, images: imagePaths });
  }

  // GET ALL
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  // GET ONE
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  // UPDATE
  @Patch(':id')
  @UseInterceptors(FilesInterceptor('images', 10))
  update(
    @Param('id') id: string,
    @Body() body: Partial<CreateProductDto>,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const imagePaths = files?.map((file) => `/uploads/${file.filename}`);
    return this.productsService.update(id, body, imagePaths);
  }

  // DELETE
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
