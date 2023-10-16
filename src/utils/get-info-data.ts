import * as _ from 'lodash';

export function getInfoData({ fields, object }: { fields: string[]; object: any }) {
  return _.pick(object, fields);
}
