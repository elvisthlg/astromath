#!/bin/bash
set -e

APP_NAME="math-tape-diagrams"
PORT=9876

echo "Deploying $APP_NAME..."

# Check if running inside the project directory
if [ ! -f Dockerfile ]; then
    echo "Error: Dockerfile not found. Please run this script from the project root."
    exit 1
fi

# Build image
echo "Building Docker image..."
sudo docker build -t $APP_NAME .

# Stop existing container if running
if [ "$(sudo docker ps -q -f name=$APP_NAME)" ]; then
    echo "Stopping existing container..."
    sudo docker stop $APP_NAME
    sudo docker rm $APP_NAME
fi

# Run new container
echo "Starting new container on port $PORT..."
sudo docker run -d --restart unless-stopped -p $PORT:80 --name $APP_NAME $APP_NAME

echo "Deployment complete! Application running on port $PORT."
