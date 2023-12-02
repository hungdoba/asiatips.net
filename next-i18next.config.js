module.exports = {
  debug: false, // process.env.NODE_ENV === 'development',
  i18n: {
    defaultLocale: 'vi',
    locales: ['ja', 'vi'],
  },
  localePath:
    typeof window === 'undefined'
      ? require('path').resolve('./public/locales')
      : '/locales',

  reloadOnPrerender: false, // process.env.NODE_ENV === 'development',
};
