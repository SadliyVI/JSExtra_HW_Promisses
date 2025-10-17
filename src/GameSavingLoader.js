import read from './reader.js';
import json from './parser.js';
import GameSaving from './GameSaving.js';

export default class GameSavingLoader {
  static async load() {
    try {
      const data = await read();
      const jsonString = await json(data);
      const parsedData = JSON.parse(jsonString);
      return new GameSaving(parsedData);
    } catch (error) {
      throw new Error(`Ошибка загрузки сохранения: ${error.message}`);
    }
  }
}
