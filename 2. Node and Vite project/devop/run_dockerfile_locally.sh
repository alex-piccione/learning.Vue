# move where Dockerfile and source code is
cd ..
docker build -t poc.vue.expenses .

docker run -p 8080:80 poc.vue.expenses:latest

# open http://localhost:8080
