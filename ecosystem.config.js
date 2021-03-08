module.exports = {
  apps: [
    {
      name: 'URL_Shortener-' + process.env.NODE_ENV || 'dev',
      script: 'server.js',
      node_args: '--max_old_space_size=4096',
      watch: [
        'app/**/*.js', 'config', 'server.js', 'app.js'
      ],
      ignore_watch: [],
      env: {
        'NODE_PATH': '.',
      },
    },
  ],
  deploy: {
    prod: {
      user: "root",
      host: [
        {
          host: "13.231.192.73",
          port: "3002"
        }
      ],
      ref: "origin/master",
      repo: "git@github.com:w987852/shortenUrl.git",
      path: "/var/app/URL_Shortener/prod",
      "post-deploy": "npm install DEBUG=COM:* NODE_ENV=prod pm2 startOrRestart ecosystem.config.json"
    },
  }
}
