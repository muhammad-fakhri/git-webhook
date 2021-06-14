# Auto Pull Git Webhook

## Description
This is a simple webhook to auto pull your repository in remote server when a push is made to your remote repository.  

This webhook work in public repository. For private repository webhook, check 'private' branch.

## How to Use
1. Set up at server
    * Clone this repo in your server
    * Create a secret and place it in webhook.js
    * Keep the secret because you will use it in next step
    * Run command `npm start webhook.js`
    * Access your webhook at port 8080

2. Add webhook
    * Go to Settings menu in your github repository page
    * Choose Webhooks menu
    * Click "Add webhook" button
    * Fill "Payload URL" with url for accessing your webhook and add query params "workdir"
    * Set query params "workdir" value with path to your repository folder in remote server. For example : "~/home/my-project"
    * Fill "Secret" with secret that you created before
    * Check "Active"
    * Click "Add webhook"
    * Done

## Developer
Made with passion by [Muhammad Fakhri](https://muhammadfakhri.my.id).
