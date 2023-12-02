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
      host: '18.182.10.40',
      ref: 'origin/main',
      repo: 'git@github.com:hungdoba/asiatips.git',
      path: '/home/ubuntu',
      'pre-deploy-local': '',
      'post-deploy':
        'source ~/.nvm/nvm.sh && yarn install && yarn build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
    },
  },
};
