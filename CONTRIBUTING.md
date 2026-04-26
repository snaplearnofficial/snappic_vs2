# 🤝 Contributing to Snappic v2

Thank you for your interest in contributing to Snappic! This document provides guidelines and instructions for contributing.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Feature Requests](#feature-requests)

---

## 📜 Code of Conduct

By contributing, you agree to maintain a respectful and inclusive environment:

- Be respectful to all contributors
- Provide constructive feedback
- Welcome diverse perspectives
- Help others learn and grow

---

## 🚀 Getting Started

### 1. Fork the Repository
```bash
# Click the "Fork" button on GitHub
```

### 2. Clone Your Fork
```bash
git clone https://github.com/YOUR_USERNAME/snappic-v2.git
cd snappic-v2
```

### 3. Add Upstream Remote
```bash
git remote add upstream https://github.com/ORIGINAL_OWNER/snappic-v2.git
```

### 4. Install Dependencies
```bash
npm install
```

### 5. Create a Branch
```bash
git checkout -b feature/your-feature-name
```

---

## 💻 Development Workflow

### Setup Development Environment

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your MongoDB URI
nano .env

# Start development server with auto-reload
npm run dev
```

### Testing Your Changes

```bash
# Test API endpoints
curl -X GET http://localhost:3000/api/interests/list

# Test authentication
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"pass123"}'

# Use Postman or Insomnia for comprehensive API testing
```

### Running in Production Mode

```bash
npm start
```

---

## 📝 Coding Standards

### Style Guide

**JavaScript/Node.js:**
- Use ES6+ syntax
- Use `const` by default, `let` if needed, avoid `var`
- Use meaningful variable names
- Keep functions small and focused
- Add comments for complex logic

**Example:**
```javascript
// Good ✅
const calculateScore = (points, bonus) => {
  const total = points + bonus;
  return total * MULTIPLIER; // Apply global multiplier
};

// Bad ❌
const calc = (p, b) => p + b;
```

### File Organization

```
snappic-v2/
├── server.js          # Main server file
├── package.json       # Dependencies
├── .env.example       # Environment template
├── README.md          # Main documentation
├── API_DOCUMENTATION.md
├── SOCKET_IO_EVENTS.md
└── DATABASE_SCHEMA.md
```

### Comment Standards

```javascript
// Use for single-line comments
// Explain the "why", not just the "what"

/*
 * Use for multi-line comments
 * Especially before complex functions
 */

/**
 * Use JSDoc for functions
 * @param {String} userId - The user's ID
 * @returns {Promise<User>} User object
 */
const getUser = async (userId) => {
  // implementation
};
```

---

## 📌 Commit Messages

Follow conventional commits format:

```
type(scope): subject

body

footer
```

### Types
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, semicolons, etc.)
- `refactor` - Code refactoring without changing functionality
- `perf` - Performance improvements
- `test` - Adding or updating tests
- `chore` - Build process, dependencies, etc.

### Examples

```bash
# Good commit messages ✅
git commit -m "feat(classroom): add screen sharing functionality"
git commit -m "fix(auth): resolve JWT token expiration issue"
git commit -m "docs(api): update endpoint documentation"
git commit -m "refactor(socket): optimize WebRTC signaling"

# Bad commit messages ❌
git commit -m "fixed stuff"
git commit -m "update"
git commit -m "work in progress"
```

---

## 🔄 Pull Request Process

### Before Creating PR

1. **Update your branch with latest changes**
```bash
git fetch upstream
git rebase upstream/main
```

2. **Run tests and verification**
```bash
npm run dev
# Manual testing of your changes
```

3. **Check code formatting**
```bash
# Review your code for style issues
```

### Creating PR

1. **Push your branch**
```bash
git push origin feature/your-feature-name
```

2. **Create Pull Request on GitHub**
   - Clear title describing the change
   - Detailed description of changes
   - Link related issues (#123)
   - Screenshot/video if applicable

3. **PR Template**
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Closes #(issue number)

## Testing
Describe how you tested the changes

## Screenshots (if applicable)
[Add screenshots or GIFs]

## Checklist
- [ ] Code follows style guidelines
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No breaking changes
- [ ] Tested locally
```

### PR Review Process

- At least 1 maintainer review required
- All feedback must be addressed
- Changes must not break existing functionality
- All conversations must be resolved

---

## 🐛 Reporting Bugs

### Bug Report Template

**Title:** Brief description of the bug

**Description:**
- What you were trying to do
- What happened
- What you expected to happen

**Reproduction Steps:**
1. Step 1
2. Step 2
3. Step 3

**Environment:**
- Node.js version
- MongoDB version
- Operating system

**Logs/Screenshots:**
```
Paste error messages and logs here
```

**Possible Solution:**
Optional - if you have an idea for fixing it

---

## ✨ Feature Requests

### Feature Request Template

**Title:** Brief description of the feature

**Use Case:**
Describe the use case or problem this solves

**Proposed Solution:**
How should this feature work?

**Alternative Solutions:**
Any alternative approaches?

**Additional Context:**
Any other relevant information

---

## 📚 Documentation

When contributing code changes, please update documentation:

1. **Update README.md** if adding/removing major features
2. **Update API_DOCUMENTATION.md** if changing/adding API endpoints
3. **Update SOCKET_IO_EVENTS.md** if changing Socket events
4. **Update DATABASE_SCHEMA.md** if changing database collections
5. **Add code comments** for complex logic

---

## 🔒 Security

### Security Considerations

- Never commit `.env` files
- Don't hardcode secrets in code
- Validate all user inputs
- Use parameterized queries
- Keep dependencies updated

### Reporting Security Issues

**DO NOT** open a public issue for security vulnerabilities.

Please email: security@snappic.dev with:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Your name/handle

---

## 📦 Version Management

Snappic v2 uses semantic versioning: `MAJOR.MINOR.PATCH`

- `MAJOR` - Breaking changes
- `MINOR` - New features (backward compatible)
- `PATCH` - Bug fixes

---

## 🎯 Development Priorities

Current focus areas (in order):
1. WebRTC video stability
2. Performance optimization
3. Mobile responsiveness
4. Real-time synchronization
5. Additional features

---

## 📞 Getting Help

- **Questions:** Open a Discussion on GitHub
- **Issues:** Check existing issues before creating new one
- **Discord:** Join our community server
- **Email:** team@snappic.dev

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

## 🎉 Thank You!

Your contributions help make Snappic better for everyone. We appreciate your time and effort!

---

## Additional Resources

- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Socket.io Documentation](https://socket.io/docs/)

