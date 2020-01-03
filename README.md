# slidebox

> Creating a simple slideshow using Vue with markdown.

## Getting started

### 1. Install dependencies

```sh
npm install
```

### 2. Setup presentation

```sh
cp src/assets/meta.json.sample src/assets/meta.json
```

And setup your title and topics

### 3. The Content

- Store your markdown files in `/markdown`
- If you need assets, name the folder equal to your markdown file
- The `generate-content` script split the file with headline 1, 2 and 3
  and store the new files in `/src/assets/content/`

### 4. Start presentation

```sh
npm run start
```

- Run the application on http://localhost:8080/
- Watch for changes in `scr/`
- Watch for changes in `markdown/`
