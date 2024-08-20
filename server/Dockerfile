FROM node:20.16-alpine3.19 AS base

# Set the working directory for the server
WORKDIR /app

# Set the NODE_ENV to production
ENV NODE_ENV=production

# Copy the server package.json and package-lock.json
COPY package*.json ./

# Install production dependencies and clean the cache
RUN npm ci --omit=dev && npm cache clean --force

# Copy the server build output and necessary files
COPY dist ./dist
COPY public ./public
COPY .env ./.env

# Expose the application port
EXPOSE 3000

CMD ["node", "dist/index.js"]