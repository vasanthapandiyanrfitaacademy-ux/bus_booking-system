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

                    sh 'npm run build -- --configuration production'
                }
            }
        }

        stage('Stop Old Containers') {
            steps {

                sh 'sudo docker compose down || true'
            }
        }

        stage('Remove Old Images') {
            steps {

                sh 'sudo docker rmi bus-frontend || true'

                sh 'sudo docker rmi bus-backend || true'
            }
        }

        stage('Rebuild Docker Images') {
            steps {

                sh 'sudo docker compose build --no-cache'
            }
        }

        stage('Deploy Application') {
            steps {

                sh 'sudo docker compose up -d --force-recreate'
            }
        }

        stage('Check Running Containers') {
            steps {

                sh 'sudo docker ps'
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