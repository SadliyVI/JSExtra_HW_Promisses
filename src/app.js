import read from './reader.js';
import json from './parser.js';

export default class GameSavingLoader {
  static load() {
    return read()
      .then((buffer) => json(buffer))
      .then((data) => data)
      .catch((err) => {
        throw err;
      });
  }
}
