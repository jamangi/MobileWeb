#!/usr/bin/env bash
# https://docs.docker.com/install/linux/docker-ce/ubuntu/#os-requirements
# for ubuntu:trusty and ubuntu:xenial
sudo apt-get remove docker docker-engine docker.io
sudo apt-get update
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo apt-key fingerprint 0EBFCD88
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
sudo apt-get update
sudo apt-get install docker-ce -y
#sudo apt-get update -y && sudo apt-get install -y linux-image-extra-$(uname -r)
#sudo apt-get install docker-engine -y #obsolete
#sudo service docker start
#sudo docker run hello-world

