const { saveGameFile } = require('../saveGameFile');

const fs = require('fs/promises');
const writeFileMock = jest.spyOn(fs, 'writeFile');
jest.mock('fs/promises',() => ({
    writeFile: jest.fn().mockResolvedValueOnce({
            data: "test"
        }),
}));

describe('createWriteFile', () => {
	test('create file - resolved', async () => {
		await saveGameFile('{ "data": "test" }');
		expect(writeFileMock).toHaveBeenCalledTimes(1);
	});
	test('create file - rejected', async () => {
        const err = "test error message";
        writeFileMock.mockRejectedValueOnce(err);
		await saveGameFile('{ "data": "test" }');
		expect(writeFileMock).toHaveBeenCalledTimes(2);
        writeFileMock.mock.results[1].value.catch((error) => expect(error).toEqual(err));
	});
});
