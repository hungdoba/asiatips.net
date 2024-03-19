module.exports = {
  debug: false,
  i18n: {
    defaultLocale: 'vi',
    locales: ['ja', 'vi'],
  },
  localePath:
    typeof window === 'undefined'
      ? require('path').resolve('./public/locales')
      : '/locales',

  reloadOnPrerender: false,
};
