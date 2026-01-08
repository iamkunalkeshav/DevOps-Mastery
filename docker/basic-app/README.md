# 📋 Docker Basic App - Complete Guide

A production-ready Node.js Express application containerized with Docker. This project demonstrates Docker best practices including multi-stage builds, security hardening, health checks, and optimization techniques.

## 📚 Project Overview

- **Application**: Node.js Express REST API
- **Docker Image**: Multi-stage optimized build
- **Base Image**: Alpine Linux (lightweight)
- **Port**: 3000
- **Security**: Non-root user, minimal attack surface

## 📦 Project Structure

```
docker/basic-app/
├── Dockerfile           # Multi-stage Dockerfile with best practices
├── .dockerignore       # Files to exclude from Docker context
├── package.json        # Node.js dependencies
├── app.js              # Express application server
└── README.md           # This file
```

## 📑 Prerequisites

- Docker Engine (v20.10+)
- Docker Compose (v1.29+) [optional]
- Node.js 18+ [for local development]

## 🚀 Building the Docker Image

### Build the image:

```bash
# Navigate to the project directory
cd docker/basic-app

# Build the Docker image
docker build -t devops-docker-app:1.0.0 .

# Alternative: Build with custom tag
docker build -t devops-docker-app:latest .
```

### View built images:

```bash
docker images | grep devops-docker-app
```

## 🚀 Running the Container

### Run the container:

```bash
# Basic run
docker run -p 3000:3000 devops-docker-app:latest

# Run with environment variables
docker run -p 3000:3000 -e NODE_ENV=production devops-docker-app:latest

# Run in detached mode
docker run -d -p 3000:3000 --name my-app devops-docker-app:latest

# Run with resource limits
docker run -p 3000:3000 --memory="512m" --cpus="1" devops-docker-app:latest
```

## 🖥️ Testing the Application

### Health Check:

```bash
curl http://localhost:3000/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Application is running",
  "timestamp": "2026-01-09T10:00:00.000Z",
  "uptime": 123.456
}
```

### Home Endpoint:

```bash
curl http://localhost:3000/
```

### API Status:

```bash
curl http://localhost:3000/api/status
```

### App Info:

```bash
curl http://localhost:3000/info
```

## 📄 Dockerfile Explanation

The Dockerfile uses **multi-stage builds** for optimization:

### Stage 1: Builder
- Uses `node:18-alpine` for smaller footprint
- Installs production dependencies only
- Reduces final image size

### Stage 2: Runtime
- Fresh Alpine image (smaller base)
- Copies dependencies from builder
- Creates non-root user (nodejs) for security
- Includes health check endpoint
- Optimized for production use

## 🗑️ Key Best Practices Implemented

✅ **Multi-stage builds** - Reduces image size by ~60%
✅ **Alpine base image** - Only ~160MB vs 1GB+ for Ubuntu
✅ **Non-root user** - Runs as 'nodejs' user, not root
✅ **Health checks** - Docker monitors application health
✅ **Labels** - Metadata for tracking and organization
✅ **Security hardening** - Minimal attack surface
✅ **Efficient caching** - Leverages Docker layer caching
✅ **Environment variables** - Configurable at runtime

## 📃 Docker Commands

### Image Management:

```bash
# List all images
docker images

# Inspect image details
docker inspect devops-docker-app:latest

# Remove image
docker rmi devops-docker-app:latest

# Tag image
docker tag devops-docker-app:latest devops-docker-app:v1
```

### Container Management:

```bash
# List running containers
docker ps

# List all containers
docker ps -a

# Stop container
docker stop <container-id>

# Remove container
docker rm <container-id>

# View logs
docker logs <container-id>

# Stream logs
docker logs -f <container-id>

# Execute command in container
docker exec -it <container-id> /bin/sh
```

## 🔒 Security Notes

1. **Non-root user**: Prevents privilege escalation
2. **Minimal dependencies**: Only production dependencies included
3. **Health checks**: Enables Docker to monitor container health
4. **No hardcoded credentials**: Uses environment variables
5. **Alpine Linux**: Smaller attack surface, fewer vulnerabilities

## 📈 Image Size Optimization

### Before optimization: ~1.2GB
- Using full Node.js image
- Including dev dependencies
- Multiple layers

### After optimization: ~200MB
- Alpine base image
- Production dependencies only
- Multi-stage build

## 🚁 Troubleshooting

### Container exits immediately:
```bash
# Check logs
docker logs <container-id>

# Run with interactive terminal
docker run -it devops-docker-app:latest /bin/sh
```

### Port already in use:
```bash
# Use different port
docker run -p 8080:3000 devops-docker-app:latest
```

### Permission denied:
```bash
# Use sudo
sudo docker run -p 3000:3000 devops-docker-app:latest
```

## 📃 Next Steps

1. **Docker Compose**: Use for multi-container applications
2. **Docker Registry**: Push to Docker Hub or private registry
3. **Kubernetes**: Orchestrate containers in production
4. **CI/CD Integration**: Build and push automatically

## 📂 Resources

- [Docker Official Docs](https://docs.docker.com/)
- [Node.js Docker Best Practices](https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md)
- [Alpine Linux](https://hub.docker.com/_/alpine/)

## 💻 Author

Kunal Keshav
- Email: kunalkeshav2002@gmail.com
- GitHub: [@iamkunalkeshav](https://github.com/iamkunalkeshav)
- LinkedIn: [Kunal Keshav](https://www.linkedin.com/in/kunalkeshav/)

## 📄 License

MIT License - Feel free to use this project for learning and development!
