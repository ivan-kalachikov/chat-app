/* eslint-disable functional/no-this-expression */
import * as Yup from 'yup';

const buildYupLocale = (lng, t) => {
  Yup.setLocale({
    mixed: {
      required: t('errors.required'),
      oneOf: t('errors.equalPasswords'),
      notOneOf: t('errors.shouldBeUnique'),
    },
    string: {
      min: ({ min }) => t('errors.min', { count: min }),
      max: ({ max }) => t('errors.max', { count: max }),
    },
  });

  Yup.addMethod(Yup.string, 'minmax', function cb(min, max, message) {
    const validationFunction = (value) => {
      const isValid = value ? value.length >= min && value.length <= max : true;
      return isValid;
    };
    return this.test({
      name: 'minmax',
      params: { min, max },
      message: message || t('errors.minmax', { min, max }),
      test: validationFunction,
    });
  });

  Yup.addMethod(Yup.string, 'equalPasswords', function cb(password, message) {
    function validationFunction(value) {
      const isValid = this.resolve(password) === value;
      return isValid;
    }
    return this.test({
      name: 'equalPasswords',
      message: message || t('errors.equalPasswords'),
      test: validationFunction,
    });
  });
};

export default buildYupLocale;
