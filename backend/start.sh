#!/bin/bash

# if there is no pocketbase binary then download it
if [ ! -f pocketbase ]; then

  PB_VERSION="0.22.2"

  # download and unzip PocketBase
  curl -L -o /tmp/pb.zip https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip
  unzip /tmp/pb.zip -d .

fi

# start PocketBase
./pocketbase migrate
./pocketbase serve --dev
