FROM node:alpine AS development

WORKDIR /usr/src/app

# Copy the entire monorepo
COPY . .

# Install all dependencies (only once at the root level)
RUN npm install

# Build only the reservations app
RUN npx nest build reservations

# -------------------

FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm install --production

# Copy built output and node_modules from development stage
COPY --from=development /usr/src/app/dist ./dist
COPY --from=development /usr/src/app/node_modules ./node_modules

# Run the reservations app
CMD ["node", "dist/apps/reservations/main.js"]





# ################################################# Code ######################################

# FROM node:alpine As development

# WORKDIR /usr/src/app

# # Only copy package files first for better caching
# COPY package.json package-lock.json ./
# COPY tsconfig.json nest-cli.json ./

# # Install dependencies
# RUN npm install

# # Copy only the source files, not node_modules
# COPY apps/reservations/src ./apps/reservations/src
# COPY apps/reservations/tsconfig.app.json ./apps/reservations/
# COPY libs ./libs

# # Build the application
# RUN npm run build

# # Verify build output exists
# RUN ls -la dist/apps/reservations || echo "Build output not found!"

# FROM node:alpine As production

# WORKDIR /usr/src/app

# # Copy only the necessary files for production
# COPY package.json package-lock.json ./
# RUN npm install --only=production

# # Copy build artifacts
# COPY --from=development /usr/src/app/dist ./dist

# # Create a simple test file to verify paths
# RUN echo "console.log('Starting application...');" > dist/test.js

# # Verify the main.js file exists
# RUN ls -la dist/apps/reservations || echo "Main.js not found in production image!"

# # Use the test file if main.js doesn't exist, otherwise use main.js
# CMD ["sh", "-c", "if [ -f dist/apps/reservations/main.js ]; then node dist/apps/reservations/main.js; else echo 'Main file not found!' && node dist/test.js; fi"]

