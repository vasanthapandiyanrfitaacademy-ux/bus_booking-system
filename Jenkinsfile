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

                sh 'docker compose down || true'
            }
        }

        stage('Remove Old Images') {
            steps {

                sh 'docker rmi bus-frontend || true'

                sh 'docker rmi bus-backend || true'
            }
        }

        stage('Rebuild Docker Images') {
            steps {

                sh 'docker compose build --no-cache'
            }
        }

        stage('Deploy Application') {pipeline {

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

        stage('Stop Old Containers') {
            steps {

                sh 'docker compose down || true'
            }
        }

        stage('Remove Old Images') {
            steps {

                sh 'docker rmi bus-frontend || true'

                sh 'docker rmi bus-backend || true'
            }
        }

        stage('Rebuild Docker Images') {
            steps {

                sh 'docker compose build --no-cache'
            }
        }

        stage('Deploy Application') {
            steps {

                sh 'docker compose up -d --force-recreate'
            }
        }

        stage('Check Running Containers') {
            steps {

                sh 'docker ps'
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
}}

        stage('Check Running Containers') {
            steps {

                sh 'docker ps'
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