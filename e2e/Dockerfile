FROM node:alpine

WORKDIR /usr/src/app

# Copy package files and install
COPY package*.json ./
RUN npm install

# Copy all project files (including jest.config.js, tsconfig.json, specs/)
COPY . .

# Optional: Type-check TypeScript
RUN npx tsc --noEmit

CMD ["npm", "test"]
# Uncomment the following lines if you want to use a different base image or modify the working directory
# From node:alpine

# WORKDIR usr/src/app

# COPY . .

# RUN npm install

# CMD ["npm","test"]