import GameSavingLoader from '../src/app.js';
import read from '../src/reader.js';
import json from '../src/parser.js';

jest.mock('../src/reader.js');
jest.mock('../src/parser.js');

describe('GameSavingLoader', () => {
  const mockBuffer = new ArrayBuffer(10);
  const mockResult = {
    id: 9,
    created: 1546300800,
    userInfo: { id: 1, name: 'Hitman', level: 10, points: 2000 }
  };

  beforeEach(() => {
    read.mockResolvedValue(mockBuffer);
    json.mockResolvedValue(JSON.stringify(mockResult));
  });

  test('load() возвращает объект сохранения', () => {
    return GameSavingLoader.load().then((result) => {
      expect(JSON.parse(result)).toEqual(mockResult);
    });
  });

  test('load() вызывает read и json', () => {
    return GameSavingLoader.load().then(() => {
      expect(read).toHaveBeenCalled();
      expect(json).toHaveBeenCalledWith(mockBuffer);
    });
  });

  test('load() корректно обрабатывает ошибки', () => {
    read.mockRejectedValueOnce(new Error('fail'));
    return GameSavingLoader.load().catch((err) => {
      expect(err.message).toBe('fail');
    });
  });
});
