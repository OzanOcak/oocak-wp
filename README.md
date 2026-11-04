# Oocak Headless WordPress LMS API

A headless WordPress LMS integration built with WordPress, Node.js, TypeScript, Express, and Docker.

The project explores using WordPress as a content management system for LMS data while exposing application-facing endpoints through a separate Node.js API.

## Architecture

```text
                   WordPress Admin
                         |
                         v
                  WordPress CMS
                    (PHP/MySQL)
                         |
                    WordPress REST API
                         |
                         v
                 Node.js / Express
                    (TypeScript)
                         |
                  Application API
                         |
                         v
                   API Consumers
```

### Responsibilities

- **WordPress:** Manages LMS content and provides the administrative interface.
- **MySQL:** Stores WordPress content and configuration.
- **WordPress REST API:** Exposes CMS content to external services.
- **Node.js / Express:** Provides an application-facing API and integration layer.
- **Auth0:** Planned authentication and authorization for protected API endpoints.
- **Docker Compose:** Runs the development environment.
- **Vitest:** Planned automated testing.
- **GitHub Actions:** Planned CI workflow.

## Technology Stack

| Technology     | Purpose                      |
| -------------- | ---------------------------- |
| WordPress      | Headless CMS                 |
| PHP            | WordPress plugin development |
| MySQL 8        | Database                     |
| Node.js 22     | API runtime                  |
| TypeScript     | API development              |
| Express        | HTTP API framework           |
| Docker         | Containerization             |
| Docker Compose | Local orchestration          |
| Auth0          | API authentication           |
| Vitest         | Testing                      |
| GitHub Actions | CI/CD                        |

## Project Structure

```text
oocak-wp/
├── .github/
│   └── workflows/
│       └── ci.yml
├── wordpress/
│   └── wp-content/
│       └── plugins/
│           └── oocak-lms-api/
│               ├── oocak-lms-api.php
│               └── includes/
│                   ├── post-types.php
│                   ├── rest-api.php
│                   └── permissions.php
├── api/
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   ├── vitest.config.ts
│   ├── src/
│   │   ├── server.ts
│   │   ├── app.ts
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middleware/
│   │   ├── types/
│   │   └── config/
│   └── tests/
├── .env.example
├── .gitignore
└── docker-compose.yml
```

## Getting Started

### Prerequisites

- Docker Desktop
- Docker Compose
- Node.js 22+ and npm (for local API development)

### 1. Clone the repository

```bash
git clone https://github.com/OzanOcak/oocak-wp.git
cd oocak-wp
```

### 2. Configure environment variables

Create your local environment file:

```bash
cp .env.example .env
```

Update the database credentials and Auth0 configuration as needed.

Never commit `.env` or production secrets.

### 3. Start the containers

```bash
docker compose up --build -d
```

### 4. Access the services

| Service          | URL                          |
| ---------------- | ---------------------------- |
| WordPress        | http://localhost:8080        |
| Node.js API      | http://localhost:3000        |
| API health check | http://localhost:3000/health |

Complete the WordPress installation through the browser.

### 5. View container logs

```bash
docker compose logs -f
```

View a specific service:

```bash
docker compose logs -f api
docker compose logs -f wordpress
docker compose logs -f database
```

### 6. Stop the environment

```bash
docker compose down
```

To remove containers and persisted volumes:

```bash
docker compose down -v
```

**Warning:** The `-v` option deletes the local WordPress and MySQL data.

## Development

The API runs inside Docker and uses the WordPress service name for internal communication.

```text
WORDPRESS_API_URL=http://wordpress/wp-json/wp/v2
```

Docker Compose provides an internal network, allowing services to communicate using their service names rather than host machine addresses.

The Node.js API is exposed on port `3000` for local access.

## Planned Features

- [ ] Register LMS course content types in WordPress.
- [ ] Expose course content through the WordPress REST API.
- [ ] Implement Node.js course endpoints.
- [ ] Add WordPress API client and error handling.
- [ ] Integrate Auth0 JWT validation.
- [ ] Implement authorization using API permissions/scopes.
- [ ] Add Vitest and Supertest coverage.
- [ ] Configure GitHub Actions CI pipeline.
- [ ] Improve production Docker configuration and deployment documentation.

## Security Considerations

- Keep environment variables and credentials out of source control.
- Validate access tokens on protected API endpoints.
- Distinguish authentication from authorization.
- Validate and sanitize incoming API data.
- Apply appropriate access controls to WordPress content.
- Avoid exposing WordPress database credentials to API consumers.

## License

This project is currently intended for educational and portfolio purposes.
