FROM node:alpine AS development

WORKDIR /usr/src/app

# Copy everything for the whole repo
COPY . .

# Install root-level dependencies first
RUN npm install

# Now install dependencies inside apps/payments specifically
WORKDIR /usr/src/app/apps/payments
RUN npm install

# Back to root
WORKDIR /usr/src/app

# Build only the payments app
RUN npx nest build payments

# -------------------

FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

# Install production root dependencies
RUN npm install --production

# Install production dependencies for payments app
WORKDIR /usr/src/app/apps/payments
RUN npm install --production

WORKDIR /usr/src/app

# Copy built app and node_modules from development stage
COPY --from=development /usr/src/app/dist ./dist
COPY --from=development /usr/src/app/node_modules ./node_modules
COPY --from=development /usr/src/app/apps/payments/node_modules ./apps/payments/node_modules

CMD ["node", "dist/apps/payments/main.js"]
