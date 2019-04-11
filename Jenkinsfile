def  VERSION = "0.0.env.${ghprbPullId}"
def  pyflaskimageTag = "gcr.io/env.${PROJECT_ID}/apache:${VERSION}"
def  graphqlimageTag = "gcr.io/env.${PROJECT_ID}/catalog:${VERSION}"
def  expressimageTag = "gcr.io/env.${PROJECT_ID}/customer:${VERSION}"

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

