# Stage 1: Development
FROM node:20 AS development

# Set working directory
WORKDIR /app

# Install app dependencies by copying
# package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source
COPY . .

# Expose port 3001 for the application
EXPOSE 3001

# Start the app in development mode
CMD ["npm", "run", "start:dev"]

# Stage 2: Production
FROM node:20 AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

COPY . .

# Build the application
RUN npm run build

EXPOSE 3001

# Run the app
CMD ["node", "dist/main"]
