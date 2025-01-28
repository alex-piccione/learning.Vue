# move where Dockerfile and source code is
cd ..
VERSION=test-0.1.0
docker build -t poc.vue.expenses --build-arg VERSION=$VERSION .

docker run -p 8080:80 poc.vue.expenses:latest

# open http://localhost:8080
