# Stage 1: Build the js frontend
FROM node:18 AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Build the final image
FROM alpine:latest
ARG PB_VERSION="0.22.2"

WORKDIR /app/

RUN apk add --no-cache \
    unzip \
    ca-certificates

ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d .

COPY ./start.sh .
COPY backend/* .
COPY --from=frontend-builder /app/frontend/dist ./pb_public/

EXPOSE 8080

CMD ["sh", "./start.sh"]
