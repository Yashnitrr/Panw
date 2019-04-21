const sonarqubeScanner = require('sonarqube-scanner');
sonarqubeScanner({
  serverUrl: 'http://104.196.201.144:9000',
  options : {
  'sonar.sources': '.',
  'sonar.inclusions': '.',
  'sonar.exclusions': 'node_modules/*,coverage/*',
  'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
  'sonar.language': 'js',
  'sonar.sourceEncoding': 'UTF-8',
  'sonar.projectKey': 'node-graphql',
  'sonar.projectVersion': '1.0'
  }
}, () => {});
