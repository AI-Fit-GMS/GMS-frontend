# Contributing to GymPro Frontend

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing.

## Development Workflow

### Branch Strategy

We follow **Git Flow** with the following branches:

- **`main`** - Production-ready code
- **`develop`** - Integration branch for features
- **`feature/*`** - New features
- **`fix/*`** - Bug fixes
- **`hotfix/*`** - Critical production fixes
- **`release/*`** - Release preparation

### Creating a Feature Branch

```bash
# Start from develop
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/your-feature-name

# Make your changes and commit
git add .
git commit -m "feat(module): description of changes"

# Push to remote
git push origin feature/your-feature-name
```

### Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (formatting)
- `refactor`: Code refactoring
- `test`: Tests
- `chore`: Maintenance

**Examples:**
```
feat(auth): add Google OAuth login
fix(ui): resolve modal z-index issue
docs: update README with setup instructions
```

### Pull Request Process

1. **Create Feature Branch** from `develop`
2. **Make Changes** and commit with clear messages
3. **Push Branch** to GitHub
4. **Create Pull Request** to `develop` branch
5. **Code Review** - Address feedback
6. **Merge** after approval

### PR Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests added/updated
- [ ] All tests pass

## Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Follow configured rules
- **Formatting**: Use Prettier (if configured)
- **Components**: Functional components with hooks
- **Naming**: PascalCase for components, camelCase for functions

## Testing

- Write unit tests for utilities
- Test components with React Testing Library
- Ensure all tests pass before PR

## Questions?

Open an issue or contact the maintainers.

