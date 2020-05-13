const dotenv = require('dotenv');

const REACT_APP = /^REACT_APP_/i;

function configureEnvironmentVariables() {
  const env = dotenv.config().parsed;

  // format environment variables for how interpolate html plugin expects them
  const interpolateHtmlEnvFormat = Object.keys(env)
    .filter((key) => REACT_APP.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key];
        return env;
      },
      {
        NODE_ENV: process.env.NODE_ENV || 'development',
        PUBLIC_URL: ''
      }
    );

  // format environment variables for how webpack define plugin expects them
  const definePluginEnvFormat = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  // return both formats so they can be used accordingly
  return {
    interpolateHtmlEnvFormat,
    definePluginEnvFormat
  };
}

module.exports = configureEnvironmentVariables();
