#!bin/bash 

PROXY=$1
COMMIT=$2 

heroku create $PROXY
heroku git:remote -a $PROXY
git add -A 
git commit -m "$COMMIT"
git push heroku master

