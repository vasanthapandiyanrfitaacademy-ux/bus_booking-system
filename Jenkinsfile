pipeline {

    agent any

    tools {
        nodejs 'node18'
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
            }
        }

        stage('Frontend Build') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Frontend Test') {
            steps {
                dir('frontend') {
                    sh 'npm test -- --watch=false --browsers=ChromeHeadless || true'
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                sh 'docker build -t bus-frontend ./frontend'
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                sh 'docker build -t bus-backend ./backend/api'
            }
        }

        stage('Deploy Application') {
            steps {
                sh 'docker compose down || true'
                sh 'docker compose up -d --build'
            }
        }

    }

    post {

        success {
            echo 'Deployment Success'
        }

        failure {
            echo 'Pipeline Failed'
        }
    }
}