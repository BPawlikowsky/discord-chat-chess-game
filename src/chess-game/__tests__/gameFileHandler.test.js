import { describe, test, expect } from '@jest/globals';
import { writeFile } from 'fs/promises';
import { createGameFile } from '../gameFileHandler';

jest.mock('fs/promises', () => ({
	writeFile: () => jest.fn(),
}));

describe('gameFileHandler', () => {
	test('', async () => {
		writeFile.mockResolvedValueOnce();

		await createGameFile();
		expect(writeFile).toHaveBeenCalledTimes(1);

	});
});