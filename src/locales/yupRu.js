import * as Yup from 'yup';

const buildYupLocale = (lng, t) => {
  Yup.setLocale({
    mixed: {
      required: t('errors.required'),
      notOneOf: t('errors.shouldBeUnique'),
    },
    string: {
      min: ({ min }) => t('errors.min', { count: min }),
      max: ({ max }) => t('errors.max', { count: max }),
      oneOf: t('errors.equalPasswords'),
    },
  });
};

export default buildYupLocale;
