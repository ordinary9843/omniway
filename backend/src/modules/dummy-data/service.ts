import { GetDummyDataResult } from './type';

class DummyDataService {
  async getDummyData(): Promise<GetDummyDataResult> {
    return [
      { id: 1, name: 'Product A', price: 50.0, category: 'Electronics' },
      { id: 2, name: 'Product B', price: 30.0, category: 'Clothing' },
      { id: 3, name: 'Product C', price: 100.0, category: 'Home & Kitchen' },
    ];
  }
}

export default new DummyDataService();
