const { isGameFile } = require('../isGameFile');

const fs = require('fs/promises');
const accessMock = jest.spyOn(fs, 'access');
jest.mock('fs/promises');

describe('createWriteFile', () => {
	test('create file - resolved', async () => {
        accessMock.mockResolvedValueOnce(true);
        expect(await isGameFile()).toBeTruthy();
		expect(accessMock).toHaveBeenCalledTimes(1);
	});
	test('create file - rejected', async () => {
        accessMock.mockRejectedValueOnce(false);
        expect(await isGameFile()).toBeFalsy();
		expect(accessMock).toHaveBeenCalledTimes(2);
	});
});
