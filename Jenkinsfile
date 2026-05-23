pipeline {

    agent any

    tools {
        nodejs 'node18'
    }

    environment {
        COMPOSE_PROJECT_NAME = "bus_booking_pipeline"
    }

    stages {

        stage('Clone Code') {
            steps {
                git branch: 'main',
                url: 'https://github.com/vasanthapandiyanrfitaacademy-ux/bus_booking-system.git'
            }
        }

        stage('Check Tools') {
            steps {
                sh 'node -v'
                sh 'npm -v'
                sh 'docker -v'
                sh 'docker compose version'
            }
        }

        stage('Frontend Build') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build -- --configuration production'
                }
            }
        }

        stage('Clean Old Containers') {
            steps {
                sh '''
                docker compose down -v --remove-orphans || true
                docker container prune -f || true
                docker network prune -f || true
                '''
            }
        }

        stage('Build Images') {
            steps {
                sh 'docker compose build --no-cache'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker compose up -d --force-recreate'
            }
        }

        stage('Verify') {
            steps {
                sh 'docker ps'
            }
        }
    }

    post {
        success {
            echo 'Deployment SUCCESS'
        }

        failure {
            echo 'Deployment FAILED'
        }
    }
}