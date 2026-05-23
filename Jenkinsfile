pipeline {

    agent any

    tools {
        nodejs 'node18'
    }

    stages {

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

        stage('Rebuild Docker Images') {
            steps {

                sh '''
                sudo docker compose build --no-cache
                '''
            }
        }

        stage('Remove Old Containers') {
            steps {

                sh '''
                sudo docker compose down
                '''
            }
        }

        stage('Deploy New Containers') {
            steps {

                sh '''
                sudo docker compose up -d --force-recreate
                '''
            }
        }

    }

    post {

        success {

            echo 'All Images Rebuilt and Containers Recreated Successfully'
        }

        failure {

            echo 'Pipeline Failed'
        }
    }
}