# Auto Pull Git Webhook

## Description
This is a simple webhook to git pull your repository in remote server.

This webhook work in public/private repository. For webhook that does not use express js, refer to 'master' or 'private' branch. 

## How to Use
1. Set up your secret at index.js

2. Create request with these specification:
    * Request URL: http://{your server IP}:6789/webhook
    * Request Method: POST
    * Payload :
        * username  : your github username
	    * password  : your github password
	    * name      : repository owner's name
        * repository: repository name
        * branch    : your production branch
        * workdir   : path to project folder in your server
        * secret    : your secret

3. To test your Git Webhook, make GET request to http://{your server IP}:6789

## Developer
Made with passion by [Muhammad Fakhri](https://muhammadfakhri.my.id "Muhammad Fakhri's Portfolio Site").