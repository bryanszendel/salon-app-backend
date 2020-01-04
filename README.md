# Salon App Backend

- Node.js, Express, MongoDB


# API Documentation

## `Clients`
### GET  /api/clients

Returns an array of client objects:
```json
[
  {
    "_id": 1,
    "name": "A Node.js backend",
    "content": "Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.",
    "created_at": null,
    "updated_at": null
  },
  {
    "_id": 2,
    "name": "Express.js endpoints",
    "content": "Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.",
    "created_at": null,
    "updated_at": null
  }
]
```

### GET  /api/clients/:id

Receives an existing ID as a request parameter.

Returns a single client object:
```json
{
  "_id": 1,
  "name": "A Node.js backend",
  "content": "Node.js® is a JavaScript runtime built on Chrome's V8 		JavaScript engine.",
  "created_at": null,
  "updated_at": null
}
```

### POST  /api/clients

Receives a request body:
```json
{
  "name": "sample name",
  "content": "sample description",
}
```

Returns the created client object:
```json
{
  "_id": 1,
  "name": "A Node.js backend",
  "content": "Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.",
  "created_at": null,
  "updated_at": null
}
```

### PUT  /api/clients/:id

Receives an existing request parameter ID and a request body:
```json
{
  "name": "sample name UPDATE",
  "content": "sample description UPDATE"
}
```

Returns the updated client object:
```json
{
  "_id": 1,
  "name": "sample name UPDATE",
  "content": "sample description UPDATE",
  "created_at": null,
  "updated_at": null
}
```

### DELETE  /api/clients/:id

Receives an existing request parameter

Returns a success message:
```json
{
  "message": "Client deleted successfully!"
}
```