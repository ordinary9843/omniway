import DummyDataService from '../service';

describe('DummyDataService', () => {
  describe('getDummyData', () => {
    it('should return an array of dummy data', async () => {
      const expectedResult = [
        { id: 1, name: 'Product A', price: 50.0, category: 'Electronics' },
        { id: 2, name: 'Product B', price: 30.0, category: 'Clothing' },
        { id: 3, name: 'Product C', price: 100.0, category: 'Home & Kitchen' },
      ];
      expect(await DummyDataService.getDummyData()).toEqual(expectedResult);
    });
  });
});
