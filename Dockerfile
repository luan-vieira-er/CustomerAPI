FROM node:22

WORKDIR /src/app

COPY package*.json ./
RUN npm install

COPY . .

# Run the build step to generate the 'dist' directory
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
