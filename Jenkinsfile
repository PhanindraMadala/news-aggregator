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
                  docker-compose down
                  docker-compose up --build -d
                  timeout /t 10
                '''
            }
        }

        stage('Check Running Services') {
            steps {
                bat 'docker ps -a'
            }
        }

        stage('Health Check') {
            steps {
                bat '''
                  echo Checking Backend...
                  powershell -Command "try { Invoke-WebRequest http://localhost:8085/ -UseBasicParsing; Write-Host 'Backend is up' } catch { Write-Host 'Backend failed'; exit 1 }"

                  echo Checking Frontend...
                  powershell -Command "try { Invoke-WebRequest http://localhost:3005/ -UseBasicParsing; Write-Host 'Frontend is up' } catch { Write-Host 'Frontend failed'; exit 1 }"
                '''
            }
        }
    }
}
