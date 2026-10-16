
# Shortly — URL Shortener

A URL shortener built with Node.js, Express, MongoDB, HTML, CSS, and JavaScript.

## Features

- Shorten long URLs into compact links
- Store URLs and short codes in MongoDB
- Redirect short links to their original destinations
- Validate submitted URLs
- Detect duplicate URLs
- Copy shortened links to the clipboard
- Responsive frontend interface

## Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- HTML
- CSS
- JavaScript

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/devbysavage/CodeAlpha_URLShortener.git
cd CodeAlpha_URLShortener
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root and add the environment variables required by `server.js`.

Never upload your `.env` file or database credentials to GitHub.

### 4. Start the server

```bash
npm start
```

Open http://localhost:3000 in your browser.

## API Endpoint

### Shorten a URL

`POST /api/shorten`

Example request body:

```json
{
  "url": "https://example.com"
}
```

## Author

[devbysavage](https://github.com/devbysavage)
