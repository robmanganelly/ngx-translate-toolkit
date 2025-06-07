---
layout: default
title: Overview
next_page: installation.html
next_page_label: Installation
---

## NGX Translate Toolkit

[![Documentation](https://img.shields.io/badge/docs-GitHub%20Pages-blue)](https://robmanganelly.github.io/ngx-translate-toolkit/)

## Overview

The NGX Translate Toolkit is an angular library designed to streamline the process of managing translations in projects involving several Angular applications and libraries. It provides a set of tools and utilities to help developers easily integrate and maintain translations, making it simpler to create multilingual applications.

> Even though the toolkit can work with any Angular project, it is particularly beneficial for large-scale applications or monorepos where multiple Angular applications and libraries share common translation files, especially on micro-frontends.

This library aims to extend the capabilities of `@ngx-translate/core` library by providing additional features and utilities that enhance the translation experience in Angular projects. **It is not meant to replace it** You will still need to install `@ngx-translate/core` in your project to use this toolkit.

## Design Principles

The NGX Translate Toolkit is designed with the following principles in mind:

- **Type safety**: The toolkit introduces type-safe translation keys, allowing developers to catch errors at compile time. You define your key once and use it many times.

- **Modularization**: The toolkit encourages a modular approach, allowing developers to organize translation keys hierarchically, improving maintainability.

- **Consistency**: The toolkit promotes a consistent approach to translation management across different parts of the application, reducing the risk of errors.

- **Ease of use**: The toolkit is designed to be easy to use and integrate into existing projects. You can migrate your translations incrementally without needing to overhaul your entire translation system at once.

## Pattern

The Toolkit follows a pattern that makes easier for developers to manage translations in Angular projects:

1. **Keys are unique to its context**: Each translation key is unique to the component or module it belongs to. **There are no shared keys**, preventing coupling between unrelated parts of the application because of them. This eases the process of refactoring and maintaining translations as the application evolves. _If you find yourself needing to share keys across components, that might be a sign that those components should be refactored into a shared module or component._

2. **Keys are defined in the class and used in the template**: Rather than having keys scattered throughout the template, we recommend defining them in the component class. This approach makes it easier to track and update keys as needed. It also leverages the typescript compiler to prevent mispelling errors.

3. **All translation files have the same structure**: Each translation file should have the same structure, so that developers can easily predict where to find a key. We recommend 1 file per project (application or library), and inside that file the following structure:

   - the root key is the project name (e.g. `my-app` or `my-lib`)
   - under the root key, you have one key for the type of the structure, example `components`, `services`, `directives`, `pipes`, etc.
   - under each type key, you have a key for each component or service, etc. that needs translations.
   - inside the individual component we encourage to have a flat structure, to make it easier for people to find the keys they need. for that case, we recommend using camelCase to compose the keys. (There are some exceptions, where you have dynamic keys that make more sense nested, see examples in [Usage](usage.html) section)

   ```json
   {
     "projectName": {
       "components": {
         "my-component": {
           "acceptButtonLabel": "Accept",
           "cancelButtonLabel": "Cancel",
           "acceptButtonTooltip": "Click to accept",
           "cancelButtonTooltip": "Click to cancel",
         },
         "another-component": {
           "title": "Another Component Title",
           "description": "Description for another component"
         }
       },
       "services": {
         "my-service": {
           "error": "An error occurred in My Service",
           "success": "Operation completed successfully"
         }
       },
       "..."
     }
   }
   ```
