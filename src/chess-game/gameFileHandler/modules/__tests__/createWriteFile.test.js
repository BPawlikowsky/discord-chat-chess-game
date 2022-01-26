const { createWriteFile } = require('../createWriteFile');

const fs = require('fs/promises');
const writeFileMock = jest.spyOn(fs, 'writeFile');
jest.mock('fs/promises',() => ({
    writeFile: jest.fn().mockResolvedValueOnce({
            data: "test"
        }),
}));

describe('createWriteFile', () => {
	test('create file - resolved', async () => {
		await createWriteFile('{ "data": "test" }');
		expect(writeFileMock).toHaveBeenCalledTimes(1);
	});
	test('create file - rejected', async () => {
        const err = "test error message";
        writeFileMock.mockRejectedValueOnce(err);
		await createWriteFile('{ "data": "test" }');
		expect(writeFileMock).toHaveBeenCalledTimes(2);
        writeFileMock.mock.results[1].value.catch((error) => expect(error).toEqual(err));
	});
});
