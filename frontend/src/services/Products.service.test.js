import ProductsService from './Products.service';

describe('ProductsService', () => {
    jest.spyOn(global, 'fetch');

    describe('fetchProducts', () => {
        it('fetchs products data', async () => {
            // Mocking fetch for unit testing
            fetch.mockResolvedValueOnce({ json: () => [] });

            // call static method
            expect(await ProductsService.fetchProducts()).toEqual([]);

            // Check if fetch has been called correctly
            expect(fetch).toBeCalledTimes(1);
            expect(fetch).toBeCalledWith('http://localhost:8080/products.json');
        });
    });
});