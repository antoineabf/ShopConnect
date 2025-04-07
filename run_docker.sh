docker run --name bconnect_db -e MYSQL_ROOT_PASSWORD=PASSWORD -d mysql
docker build -t auth-microservice ./bconnect_be/Microservices/AuthMicroservice
docker build -t user-microservice ./bconnect_be/Microservices/UserMicroservice
docker build -t product-microservice ./bconnect_be/Microservices/ProductMicroservice
docker build -t frontend-app ./bconnect_fe
