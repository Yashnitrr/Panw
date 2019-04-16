def  VERSION = "v2"
def  PROJECT_ID= "palo-alto-networks-234507"
def  pyflaskimageTag = "gcr.io/${PROJECT_ID}/cicd/pyflask:${VERSION}"
def  graphqlimageTag = "gcr.io/${PROJECT_ID}/cicd/graphql:${VERSION}"
def  expressimageTag = "gcr.io/${PROJECT_ID}/cicd/express:${VERSION}"
def  namespace = "palo-alto-demo"

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
    stage('Deploy on GKE'){
      steps {
              sh "sudo su"
              sh "PYTHONBUFFERED=1 sudo openssl req -new -newkey rsa:4096 -x509 -sha256 -days 365 -nodes -out /etc/tls.crt -keyout /etc/tls.key -subj '/C=US/ST=California/L=San Francisco/O=Global Security/OU=IT Department/CN=agrawaly@google.com'"
              sh "PYTHONBUFFERED=1 sudo gcloud container clusters get-credentials cicd-panw --zone us-west1-b --project palo-alto-networks-234507"
              //sh "PYTHONBUFFERED=1 sudo kubectl create clusterrolebinding cluster-admin-binding --clusterrole=cluster-admin"
              sh "PYTHONBUFFERED=1 sudo kubectl delete namespace palo-alto-demo"
              sh "PYTHONBUFFERED=1 sudo kubectl create namespace palo-alto-demo"
              sh "PYTHONBUFFERED=1 sudo kubectl create -n palo-alto-demo secret tls istio-ingressgateway-certs --key /etc/tls.key --cert /etc/tls.crt"
              //sh "PYTHONBUFFERED=1 sudo kubectl label namespace default istio-injection=enabled"
              //sh "PYTHONBUFFERED=1 sudo kubectl label namespace palo-alto-demo istio-injection=enabled"
              sh "PYTHONBUFFERED=1 sudo kubectl apply -f <(istioctl kube-inject -f deployment.yaml)"
        }
      }
    }
  }
