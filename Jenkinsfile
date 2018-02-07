pipeline {
  agent {
    docker {
      image 'maven:3-alpine'
      args '-v /root/.m2:/root/.m2'
    }
  }
  stages {
    stage('Build') {
      steps {
        echo "Building"
        sh 'mvn compile -f project/spoiled-tomatillos-team41/pom.xml'
        sh 'mvn package -f project/spoiled-tomatillos-team41/pom.xml'
      }
    }
    stage('Test'){
      steps {
        echo "Testing"
        sh 'mvn test -f project/spoiled-tomatillos-team41/pom.xml'
      }
    }
    stage('Deploy') {
      steps {
        echo "Deploy"
      }
    }
  }
}
