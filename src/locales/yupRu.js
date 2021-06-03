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
};

export default buildYupLocale;
