---
layout: default
title: Installation
next_page: usage.html
next_page_label: Usage
previous_page: index.html
previous_page_label: Overview
---

## Installation

This sections assumes that you already have an Angular project set up. If you don't, please refer to the [Angular documentation](https://angular.dev) for instructions on how to create one.

Depending on your package manager, you can install the NGX Translate Toolkit with one of the following commands.

### Bun

```bash
bun add @ngx-translate/core @robmanganelly/ngx-translate-toolkit
```

### npm

```bash
npm install @ngx-translate/core @robmanganelly/ngx-translate-toolkit
```

> This library is compatible with `@ngx-translate/core` version 15.x and above, and `@angular/core` version 20.x and above. Make sure to check your project dependencies to ensure compatibility. I've been using a private version since angular 17, and the internal API has not changed too much between major versions, but I recommend treating with caution if you force it to work with older versions.
