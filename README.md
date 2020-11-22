# Auto Pull Git Webhook

## Description
This is a simple webhook to auto pull your repository in remote server when a push is made to your remote repository.  

This webhook work in private repository. For public repository webhook, check 'master' branch.

## How to Use
1. Set up at server
    * Clone this repo in your server
    * Create a secret and place it in webhook.js
    * Keep the secret because you will use it in next step
    * Run command `npm start webhook.js`
    * Access your webhook at port 8080

2. Create a Personal Access Token and provide scope to grant repository access

3. Add webhook
    * Go to Settings menu in your github repository page
    * Choose Webhooks menu
    * Click "Add webhook" button
    * Fill "Payload URL" with url for accessing your webhook and add these query params :
        * username  : your github username
        * token     : your Personal Access Token
        * repo      : your repository name
        * branch    : your desired branch
        * workdir   : path to your repository folder at remote server. For example : `~/home/my-project`
        * command   : optional command. For example : `npm run build`
    * Fill "Secret" with secret that you created before
    * Check "Active"
    * Click "Add webhook"
    * Done

## Developer
Made with passion by [Muhammad Fakhri](https://muhammadfakhri.my.id "Muhammad Fakhri's Portfolio Site").