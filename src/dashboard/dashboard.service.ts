import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  async summary() {
    // placeholder: بعدين تربطها بالorders/products
    return {
      today: { ordersCount: 0, revenue: 0 },
      totals: { orders: 0, products: 0 },
    };
  }
}
