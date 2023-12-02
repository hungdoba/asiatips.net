// pm2 deploy production setup
// pm2 deploy production

module.exports = {
  apps: [
    {
      script: 'yarn start',
    },
  ],

  deploy: {
    production: {
      key: 'tokyo.pem',
      user: 'ubuntu',
      host: '35.78.175.119',
      ref: 'origin/main',
      repo: 'git@github.com:hungdoba/asiatips-private.git',
      path: '/home/ubuntu',
      'pre-deploy-local': '',
      'post-deploy':
        'source ~/.nvm/nvm.sh && yarn install && yarn build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
    },
  },
};
