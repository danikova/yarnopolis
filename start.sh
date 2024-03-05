#!/bin/sh

/app/pocketbase migrate
/app/pocketbase serve --http=0.0.0.0:8080
