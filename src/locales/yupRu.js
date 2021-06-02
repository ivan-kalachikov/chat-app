import * as Yup from 'yup';

const buildYupLocale = (lng, t) => {
  console.log('setLocale', lng);
  Yup.setLocale({
    mixed: {
      required: t('errors.required'),
    },
    string: {
      min: ({ min }) => t('errors.min', { count: min }),
      max: ({ max }) => t('errors.max', { count: max }),
      oneOf: t('errors.equalPasswords'),
      notOneOf: t('errors.shouldBeUnique'),
    },
  });
};

export default buildYupLocale;
