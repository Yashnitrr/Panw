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
    stage('Build Images') {
      steps {
          container('gcloud') {
              //Build python flask application image
              sh "PYTHONUNBUFFERED=1 gcloud builds submit -t ${pyflaskimageTag} ./microservices/pyflask"
              //Build graphql image
              sh "PYTHONUNBUFFERED=1 gcloud builds submit -t ${graphqlimageTag} ./microservices/node-graphql"
              //Build customer image
              sh "PYTHONUNBUFFERED=1 gcloud builds submit -t ${expressimageTag} ./microservices/node-express"
          }
      }
    }
  }
}

