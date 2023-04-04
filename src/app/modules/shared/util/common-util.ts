import * as _ from 'underscore';

export class CommonUtil {
  static getValueWithDefault(object: any, property: any, defaultValue: any) {
    if (object || _.isNumber(object) || _.isString(object)) {
      if (_.isNumber(object) || (_.isString(object) && !_.isEmpty(object))) {
        return object;
      } else if ((_.isString(object) && _.isEmpty(object))) {
        return defaultValue;
      }
      if (property.indexOf('.') !== -1) {
        const arrKey = property.split('.');
        let value;
        for (const iterator of arrKey) {
          if (value) {
            value = value[iterator];
          } else {
            value = object[iterator];
          }
        }
        return _.isUndefined(value) ? defaultValue : value;
      }
      return _.isUndefined(object[property]) ? defaultValue : object[property];
    }
    return defaultValue;
  }

  static getValueWithDefaultHyphen(object: any, property: string = '') {
    return this.getValueWithDefault(object, property, '-');
  }
}
