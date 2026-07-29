module.exports = {
  apps: [
    {
      name: 'fundao-backend',
      script: './backend/server.js',
      node_args: '--experimental-modules',
      env: {
        NODE_ENV: 'production',
        PORT: 4000,
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '256M',
    },
    {
      name: 'fundao-frontend',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3000',
      env: {
        NODE_ENV: 'production',
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
    },
  ],
};
