# ############################################################################################
# # the last version of the auth app docker code
# ############################################################################################

FROM node:alpine As development

WORKDIR /usr/src/app

COPY package.json ./
COPY tsconfig.json tsconfig.json
COPY apps/auth/package.json ./apps/auth/
COPY libs ./libs

RUN npm install
RUN cd apps/auth && npm install

COPY . .

RUN npm run build auth

FROM node:alpine As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY apps/auth/package.json ./apps/auth/
COPY libs ./libs

RUN npm install --prod
RUN cd apps/auth && npm install --prod

COPY --from=development /usr/src/app/dist ./dist

CMD [ "node", "dist/apps/auth/main" ]