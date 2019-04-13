def  VERSION = "0.0"
def  pyflaskimageTag = "gcr.io/palo-alto-networks-234507/apache:${VERSION}"
def  graphqlimageTag = "gcr.io/palo-alto-networks-234507/catalog:${VERSION}"
def  expressimageTag = "gcr.io/palo-alto-networks-234507/customer:${VERSION}"

pipeline {
    agent any
    stages {
    stage('Setup') {
      steps {
      // checkout code from scm i.e. commits related to the PR
      checkout scm
      }
    }
    stage('Build Docker Images') {
      steps {
              //Build python flask application image
              sh "PYTHONUNBUFFERED=1 docker build ./microservices/pyflask -t ${pyflaskimageTag}"
              //Build graphql image
              sh "PYTHONUNBUFFERED=1 docker build ./microservices/node-graphql -t ${graphqlimageTag}"
              //Build customer image
              sh "PYTHONUNBUFFERED=1 docker build ./microservices/node-express -t ${expressimageTag}"
      }
    }
  }
}

