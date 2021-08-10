#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

# get permission, you need to get ssh key from github setting before use this script
ssh-agent bash

# push and deploy
ssh-add ~/.ssh/key && git init && git add -A && git commit -m 'deploy' && git push -f git@github.com:Ureimu/manual-screeps-ui.git master:gh-pages
# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:Ureimu/manual-screeps-ui.git master:gh-pages

cd -
