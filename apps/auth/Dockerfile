FROM node:alpine As development

WORKDIR /usr/src/app

# Copy everything for the whole repo
COPY . .

# Install root-level dependencies first
RUN npm install

# Now install dependencies inside apps/auth specifically
WORKDIR /usr/src/app/apps/auth
RUN npm install

# Back to root
WORKDIR /usr/src/app

# Build only the auth app
RUN npx nest build auth

# -------------------

FROM node:alpine As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

# Install production root dependencies
RUN npm install --production

# Install production dependencies for auth app
WORKDIR /usr/src/app/apps/auth
RUN npm install --production

WORKDIR /usr/src/app

# Copy built app and node_modules from development stage
COPY --from=development /usr/src/app/dist ./dist
COPY --from=development /usr/src/app/node_modules ./node_modules
COPY --from=development /usr/src/app/apps/auth/node_modules ./apps/auth/node_modules

CMD [ "node", "dist/apps/auth/main.js" ]


# # ############################################################################################
# # # the last version of the auth app docker code
# # ############################################################################################

# FROM node:alpine As development

# WORKDIR /usr/src/app

# COPY package.json ./
# COPY tsconfig.json tsconfig.json
# COPY apps/auth/package.json ./apps/auth/
# COPY libs ./libs

# RUN npm install
# RUN cd apps/auth && npm install

# COPY . .

# RUN npm run build auth

# FROM node:alpine As production

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# WORKDIR /usr/src/app

# COPY package.json ./
# COPY apps/auth/package.json ./apps/auth/
# COPY libs ./libs

# RUN npm install --prod
# RUN cd apps/auth && npm install --prod

# COPY --from=development /usr/src/app/dist ./dist

# CMD [ "node", "dist/apps/auth/main.js" ]