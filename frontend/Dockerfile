# Stage 1: Development
FROM node:20 AS development

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
COPY . .

EXPOSE 3000

CMD ["npm", "start"]

# Production stage (example, not to be used directly for development purposes)
# Uncomment and adjust for production as needed
# FROM nginx:stable-alpine as production

# COPY --from=build /app/build /usr/share/nginx/html
# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]
