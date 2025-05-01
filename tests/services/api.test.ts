import apiClient, { fetchAllUsers } from '../../src/services/api';


describe('fetchAllUsers', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('returns data on successful response', async () => {
        const mockData = [{ id: '1', fullName: 'John Doe' }];
        jest.spyOn(apiClient, 'get').mockResolvedValueOnce({ data: mockData });

        const result = await fetchAllUsers();
        expect(result).toEqual(mockData);
        expect(apiClient.get).toHaveBeenCalledWith('/fef86b13-9e2f-4e2d-b3ff-965db5e46c53');
    });

    test('throws error and logs it on failure', async () => {
        const mockError = new Error('Network error');
        jest.spyOn(apiClient, 'get').mockRejectedValueOnce(mockError);
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

        await expect(fetchAllUsers()).rejects.toThrow(mockError);
        expect(consoleSpy).toHaveBeenCalledWith('Error fetching users:', mockError);
        expect(apiClient.get).toHaveBeenCalledWith('/fef86b13-9e2f-4e2d-b3ff-965db5e46c53');

        consoleSpy.mockRestore();
    });
});