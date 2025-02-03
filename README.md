# URL Shortening Service

https://roadmap.sh/projects/url-shortening-service

A simple RESTful API for shortening long URLs.

## Features

- Create a short URL from a long URL
- Retrieve the original URL using the short code
- Update an existing short URL
- Delete a short URL
- Get statistics on short URL usage

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Maxrosoft/url-shortening-service.git
   cd url-shortening-service
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables in a `.env` file:
   ```sh
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/url-shortener
   ```

4. Start the server:
   ```sh
   npm start
   ```

## API Endpoints

### Create a Short URL
**POST** `/shorten`  
Request body:
```json
{
  "url": "https://www.example.com/some/long/url"
}
```
Response:
```json
{
  "id": "1",
  "url": "https://www.example.com/some/long/url",
  "shortCode": "abc123",
  "createdAt": "2021-09-01T12:00:00Z",
  "updatedAt": "2021-09-01T12:00:00Z"
}
```

### Retrieve Original URL
**GET** `/shorten/:shortCode`  
Response:
```json
{
  "id": "1",
  "url": "https://www.example.com/some/long/url",
  "shortCode": "abc123",
  "createdAt": "2021-09-01T12:00:00Z",
  "updatedAt": "2021-09-01T12:00:00Z"
}
```

### Update a Short URL
**PUT** `/shorten/:shortCode`  
Request body:
```json
{
  "url": "https://www.example.com/some/updated/url"
}
```
Response:
```json
{
  "id": "1",
  "url": "https://www.example.com/some/updated/url",
  "shortCode": "abc123",
  "createdAt": "2021-09-01T12:00:00Z",
  "updatedAt": "2021-09-01T12:30:00Z"
}
```

### Delete a Short URL
**DELETE** `/shorten/:shortCode`  
Response: `204 No Content`

### Get URL Statistics
**GET** `/shorten/:shortCode/stats`  
Response:
```json
{
  "id": "1",
  "url": "https://www.example.com/some/long/url",
  "shortCode": "abc123",
  "createdAt": "2021-09-01T12:00:00Z",
  "updatedAt": "2021-09-01T12:00:00Z",
  "accessCount": 10
}
```

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose

## License

This project is licensed under the MIT License.
