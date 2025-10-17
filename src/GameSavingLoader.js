import read from './reader.js';
import json from './parser.js';

export default class GameSavingLoader {
  static load() {
    return read()
      .then((data) => json(data))
      .then((value) => value)
      .catch((error) => {
        throw error;
      });
  }
}
