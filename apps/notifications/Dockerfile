FROM node:alpine As development

WORKDIR /usr/src/app

# Copy everything for the whole repo
COPY . .

# Install root-level dependencies first
RUN npm install

# Now install dependencies inside apps/notifications specifically
WORKDIR /usr/src/app/apps/notifications
RUN npm install

# Back to root
WORKDIR /usr/src/app

# Build only the notifications app
RUN npx nest build notifications

# -------------------

FROM node:alpine As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

# Install production root dependencies
RUN npm install --production

# Install production dependencies for notifications app
WORKDIR /usr/src/app/apps/notifications
RUN npm install --production

WORKDIR /usr/src/app

# Copy built app and node_modules from development stage
COPY --from=development /usr/src/app/dist ./dist
COPY --from=development /usr/src/app/node_modules ./node_modules
COPY --from=development /usr/src/app/apps/notifications/node_modules ./apps/notifications/node_modules

CMD [ "node", "dist/apps/notifications/main.js" ]