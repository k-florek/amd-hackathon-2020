FROM node:12.18-alpine

# metadata
LABEL base.image="node:12.18-alpine"
LABEL version="1.0.0"
LABEL software="amd-hackathon"
LABEL software.version="1.0.0"
LABEL description="AMD Hackathon Website"
LABEL maintainer="Kelsey Florek"
LABEL maintainer.email="kelsey.florek@slh.wisc.edu"

WORKDIR /usr/app
COPY package.json .
RUN npm install --quite
COPY . .
