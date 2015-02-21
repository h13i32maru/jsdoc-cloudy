import path from 'path';

export default class StaticFileBuilder {
  exec(callback) {
    callback(path.resolve(__dirname, './template/css'), './css');
    callback(path.resolve(__dirname, './template/script'), './script');
  }
}
