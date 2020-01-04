# Salon App Backend

- Node.js, Express, MongoDB


# API Documentation

## GET  /api/items

Returns an array of item objects:
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

## GET  /api/items/:id

Receives an existing ID as a request parameter.

Returns a single item object:
```json
{
  "_id": 1,
  "name": "A Node.js backend",
  "content": "Node.js® is a JavaScript runtime built on Chrome's V8 		JavaScript engine.",
  "created_at": null,
  "updated_at": null
}
```

## POST  /api/items

Receives a request body:
```json
{
  "name": "sample name",
  "content": "sample description",
}
```

Returns the created item object:
```json
{
  "_id": 1,
  "name": "A Node.js backend",
  "content": "Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.",
  "created_at": null,
  "updated_at": null
}
```

## PUT  /api/items/:id

Receives an existing request parameter ID and a request body:
```json
{
  "name": "sample name UPDATE",
  "content": "sample description UPDATE"
}
```

Returns the updated item object:
```json
{
  "_id": 1,
  "name": "sample name UPDATE",
  "content": "sample description UPDATE",
  "created_at": null,
  "updated_at": null
}
```

## DELETE  /api/items/:id

Receives an existing request parameter

Returns a success message:
```json
{
  "message": "Item deleted successfully!"
}
```