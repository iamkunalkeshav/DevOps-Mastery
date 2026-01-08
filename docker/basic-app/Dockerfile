# Multi-stage Dockerfile for Node.js Express Application
# Stage 1: Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including dev dependencies for building)
RUN npm ci --only=production

# Stage 2: Runtime stage
FROM node:18-alpine

# Add labels for metadata
LABEL maintainer="Kunal Keshav <kunalkeshav2002@gmail.com>"
LABEL description="DevOps Docker App - A containerized Node.js Express application"
LABEL version="1.0.0"

# Set working directory
WORKDIR /app

# Create a non-root user for security
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001

# Copy node_modules from builder
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules

# Copy application files
COPY --chown=nodejs:nodejs app.js .
COPY --chown=nodejs:nodejs package*.json .

# Create .env file (can be overridden at runtime)
RUN echo "NODE_ENV=production" > .env

# Expose the application port
EXPOSE 3000

# Switch to non-root user
USER nodejs

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start the application
CMD ["node", "app.js"]
