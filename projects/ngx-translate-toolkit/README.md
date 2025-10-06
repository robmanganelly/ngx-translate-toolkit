# NGX Translate Toolkit

[![Documentation](https://img.shields.io/badge/docs-GitHub%20Pages-blue)](https://robmanganelly.github.io/ngx-translate-toolkit/)

Source Code: [GitHub Repository](https://github.com/robmanganelly/ngx-translate-toolkit)

An Angular library that extends `@ngx-translate/core` to help manage translations at scale in large Angular projects.

## Features

- **Type-safe translation keys**: Define and use translation keys with TypeScript type safety
- **Hierarchical organization**: Organize translations by project, type (components, services, etc.), and block
- **Multi-loader support**: Load translation files from multiple sources
- **JSON Schema validation**: Validate your translation files with the included JSON schema for IDE autocompletion and error detection

## Documentation

Explore the full documentation on [GitHub Pages](https://robmanganelly.github.io/ngx-translate-toolkit/).

## JSON Schema

The library includes a JSON schema for translation files. Reference it in your translation files to get IDE validation and autocompletion:

```json
{
  "$schema": "./node_modules/@robmanganelly/ngx-translate-toolkit/src/translation-file.schema.json",
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
