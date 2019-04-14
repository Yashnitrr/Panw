def  VERSION = "v1"
def  PROJECT_ID= "palo-alto-networks-234507"
def  pyflaskimageTag = "gcr.io/${PROJECT_ID}/cicd/pyflask:${VERSION}"
def  graphqlimageTag = "gcr.io/${PROJECT_ID}/cicd/graphql:${VERSION}"
def  expressimageTag = "gcr.io/${PROJECT_ID}/cicd/express:${VERSION}"

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
              sh "PYTHONUNBUFFERED=1 sudo docker build ./microservices/pyflask -t ${pyflaskimageTag}"
              //Build graphql image
              sh "PYTHONUNBUFFERED=1 sudo docker build ./microservices/node-graphql -t ${graphqlimageTag}"
              //Build customer image
              sh "PYTHONUNBUFFERED=1 sudo docker build ./microservices/node-express -t ${expressimageTag}"
      }
    }
    stage('Push Docker Image to GCR'){
      steps {
              sh "PYTHONBUFFERED=1 sudo gcloud docker -- push ${pyflaskimageTag} "
              sh "PYTHONBUFFERED=1 sudo gcloud docker -- push ${graphqlimageTag}"
              sh "PYTHONBUFFERED=1 sudo gcloud docker -- push ${expressimageTag}"
       }
      }
    }
  }
