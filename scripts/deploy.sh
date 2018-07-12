source .env

rsync -r --delete-after --quiet --filter=':- .gitignore' . ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_LOCATION}

ssh ${DEPLOY_USER}@${DEPLOY_HOST} 'cd ${DEPLOY_LOCATION} && npm run start'