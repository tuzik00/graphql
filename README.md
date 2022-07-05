Docker

docker build . -t graphql
docker run -it --name graphql -e PORT=4000 -p 127.0.0.1:4000:4000 graphql
