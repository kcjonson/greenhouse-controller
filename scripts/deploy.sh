source .env

rsync -r --delete-after --quiet --filter=':- .gitignore' . ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_LOCATION}

