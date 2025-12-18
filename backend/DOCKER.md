# Docker Development Setup

This guide explains how to run the University Aggregator backend using Docker Compose for local development.

## Prerequisites

- Docker Desktop (or Docker Engine + Docker Compose)
- Anthropic API key (required for AI features)
- Context7 API key (optional, for enhanced AI memory)

## Quick Start

1. **Clone the repository and navigate to backend**
```bash
git clone <repository-url>
cd ai-project/backend
```

2. **Configure environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add your API keys:
```env
ANTHROPIC_API_KEY=your_anthropic_api_key_here
CONTEXT7_API_KEY=your_context7_api_key_here  # Optional
CONTEXT7_BASE_URL=https://api.context7.io
```

3. **Start services**
```bash
docker-compose up -d
```

This will start:
- MongoDB on port `27017`
- Mongo Express (DB Admin UI) on port `8081`
- Backend API on port `8000`

4. **Check logs**
```bash
# All services
docker-compose logs -f

# Backend only
docker-compose logs -f backend

# MongoDB only
docker-compose logs -f mongodb
```

5. **Access the services**
- API: http://localhost:8000
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc
- Mongo Express: http://localhost:8081 (login: admin/admin123)

## Services

### MongoDB
- **Port**: 27017
- **Username**: admin
- **Password**: admin123
- **Database**: university_catalog
- **Volume**: `mongodb_data` (persistent storage)

### Mongo Express
- **Port**: 8081
- **Username**: admin
- **Password**: admin123
- **Purpose**: Web-based MongoDB admin interface for viewing and managing data
- **URL**: http://localhost:8081

### Backend (FastAPI)
- **Port**: 8000
- **Hot reload**: Enabled (changes in `./backend` reflect immediately)
- **Volume**: `.` mounted to `/app` in container

## Common Commands

### Start services
```bash
docker-compose up -d
```

### Stop services
```bash
docker-compose down
```

### Stop and remove volumes (clean slate)
```bash
docker-compose down -v
```

### Rebuild containers
```bash
docker-compose up -d --build
```

### View logs
```bash
docker-compose logs -f [service_name]
```

### Execute commands in containers
```bash
# Backend shell
docker-compose exec backend bash

# MongoDB shell
docker-compose exec mongodb mongosh -u admin -p admin123
```

### Install new Python dependencies
```bash
# 1. Add package to requirements.txt
# 2. Rebuild backend container
docker-compose up -d --build backend
```

## Development Workflow

1. Make changes to code in the current directory
2. Changes are automatically reloaded (hot reload enabled)
3. View logs: `docker-compose logs -f backend`
4. Test API: http://localhost:8000/docs
5. View database: http://localhost:8081 (Mongo Express)

## MongoDB Connection

### From Host Machine
```
mongodb://admin:admin123@localhost:27017
```

### From Backend Container
```
mongodb://admin:admin123@mongodb:27017
```

### Using MongoDB Compass
- Connection string: `mongodb://admin:admin123@localhost:27017`
- Database: `university_catalog`

### Using Mongo Express (Web UI)
- URL: http://localhost:8081
- Username: admin
- Password: admin123
- Already configured and running with Docker Compose

## Troubleshooting

### Port already in use
If ports 8000, 8081, or 27017 are already in use:

1. **Option 1**: Stop services using those ports
2. **Option 2**: Change ports in `docker-compose.yml`:
```yaml
ports:
  - "8001:8000"   # Backend
  - "8082:8081"   # Mongo Express
  - "27018:27017" # MongoDB
```

### Container won't start
```bash
# View logs
docker-compose logs backend

# Rebuild from scratch
docker-compose down -v
docker-compose up -d --build
```

### MongoDB connection issues
```bash
# Check MongoDB health
docker-compose exec mongodb mongosh -u admin -p admin123 --eval "db.adminCommand('ping')"

# View MongoDB logs
docker-compose logs mongodb
```

### Permission issues on Linux
```bash
# Fix volume permissions
sudo chown -R $USER:$USER ./backend
```

## Production Deployment

For production deployment:

1. Change MongoDB credentials in `docker-compose.yml`
2. Use external MongoDB service (MongoDB Atlas, etc.)
3. Set `restart: always` for services
4. Remove `--reload` flag from backend command
5. Use proper secrets management (Docker secrets, Kubernetes secrets, etc.)
6. Enable HTTPS with reverse proxy (nginx, Traefik, etc.)
7. Set up monitoring and logging

## Clean Up

### Remove all containers, volumes, and networks
```bash
docker-compose down -v --remove-orphans
```

### Remove images
```bash
docker rmi university-backend:latest mongo:7.0
```

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [MongoDB Docker Image](https://hub.docker.com/_/mongo)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
