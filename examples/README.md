# Translation File Examples

This directory contains example translation files demonstrating the proper structure and usage of the NGX Translate Toolkit schema.

## Files

### translation-example.json

A comprehensive example showing:
- How to reference the JSON schema for IDE validation and autocompletion
- Required metadata fields (`projectType`, `projectName`)
- The camelCase root project key
- Multiple type categories (components, services, guards)
- Nested translation keys within blocks
- Proper naming conventions (camelCase for all keys)

## Using the Schema

All translation files should reference the schema to ensure they follow the correct structure:

```json
{
  "$schema": "../projects/ngx-translate-toolkit/src/translation-file.schema.json",
  "projectType": "library",
  "projectName": "my-project",
  "myProject": {
    "components": {
      "myComponent": {
        "title": "Hello World"
      }
    }
  }
}
```

## Validation

You can validate your translation files against the schema using tools like:

- **IDE Support**: Most modern IDEs (VS Code, WebStorm) automatically validate JSON files with schema references
- **CLI Validation**: Use `ajv-cli` or similar JSON schema validators
- **Pre-commit Hooks**: Add schema validation to your CI/CD pipeline

## Structure Requirements

- **projectType**: Must be either "application" or "library"
- **projectName**: Required, should not have leading/trailing whitespace
- **Root Key**: Must be in camelCase and match the project (e.g., "myProject")
- **Type Keys**: Can include: components, services, directives, pipes, resolvers, guards, stores, routes, pages, utils
- **Block Keys**: Must be in camelCase, typically match the file name
- **Translation Keys**: Must be in camelCase and contain the actual translation strings

For more information, see the [usage documentation](https://robmanganelly.github.io/ngx-translate-toolkit/usage.html).
