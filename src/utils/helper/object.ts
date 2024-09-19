import _ from 'lodash';

export const omitEmptyString = (obj: Record<string, any>) => {
  return _.omitBy(obj, (value) => value === '' || _.isNil(value));
};
