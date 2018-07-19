pipeline {
  environment {
    HIP_CHAT_USER_TOKEN = credentials('ATT_HipChat_API_token')
    BUILD_RESULT_FN = 'coverage/build-result'
    BUILD_COMMIT= sh (
      script: "git log -1 | sed -n '1!p' | sed -n '3!p'",
      returnStdout: true
    ).trim()
    PROJECT_NAME = sh (
      script: "git remote -v | head -n1",
      returnStdout: true
    ).trim()

  }

  agent {
    docker {
      image 'node:carbon-wheezy'
    }
  }

  stages {
    stage('Build') {
      steps {
        script {
          withCredentials([file(credentialsId: 'oit-att-npmrc', variable: 'NPMRC')]) {
            sh 'cp -f ${NPMRC} .npmrc'
            sh 'rm package-lock.json || echo " Attempted to remove package-lock"'
            sh 'npm_config_cache=npm-cache npm install'
          }
        }
      }
    }

    stage('Test') {
      steps {
        script {
          sh 'npm run test:ci'
          sh 'npm run eslint:ci'
          sh 'npm_config_cache=npm-cache npm install nsp'
          sh 'node node_modules/nsp/bin/nsp check > coverage/nsp_check_result.txt || echo "ok nsp check"'
          sh 'npm run reports:ci'
          def buldResult = readFile(env.BUILD_RESULT_FN)
          currentBuild.result = buldResult
        }
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'coverage/*', fingerprint: true
    }
  }
}
