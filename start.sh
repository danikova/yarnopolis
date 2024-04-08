#!/bin/sh

/app/pocketbase migrate
/app/pocketbase --http=0.0.0.0:8080 serve
