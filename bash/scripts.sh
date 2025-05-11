#!/bin/bash

# Updating packages
sudo apt-get update

# Installing node.js
curl -fsSL https://deb.nodesource.com/setup_23.x | sudo -E bash -
sudo apt-get install -y nodejs build-essential

# Installing nginx
sudo apt-get install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx

# Installing pnpm
sudo npm install -g pnpm

# Installing pm2
sudo npm install -g pm2