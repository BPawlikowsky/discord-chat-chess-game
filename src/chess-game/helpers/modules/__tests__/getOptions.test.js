const { describe, test, expect } = require('@jest/globals');
const { getOptions } = require('../getOptions');

describe('getOptions', () => {
	test('valid "start" string returns one option', () => {
		const input = 'start';
		expect(getOptions(input)).toHaveLength(1);
	});
	test('valid "move a2 a3" string returns three options', () => {
		const input = 'move a2 a3';
		expect(getOptions(input)).toHaveLength(3);
	});
});