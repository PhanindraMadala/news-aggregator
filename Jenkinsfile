pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/PhanindraMadala/news-aggregator.git'
            }
        }

        stage('Build and Run Containers') {
            steps {
                bat '''
                  docker-compose down || exit 0
                  docker-compose up --build -d
                '''
            }
        }

        stage('Check Running Services') {
            steps {
                bat 'docker ps -a'
            }
        }
    }
}
