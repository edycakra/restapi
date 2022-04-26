# ecommerce-server

BaseUrl: http://localhost:3000

## **Register**

Return json access token after user register

- **URL**

  /register

- **Method:**

  `POST`

- **URL Params**

  None

- **Data Params**

  **Required:**

  `username=[string]`\
   `password=[string]`\

- **Success Response:**

  - **Code:** 201 <br />
    **Content:**
    ```json
    {
      "message": "Register Success!",
      "username": "...",
      "access_token": "...",
      "createdAt": "..."
    }
    ```

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:**
    ```json
    {
        "status": 400,
        "message": "Bad Request,
        "errors": [
            "user already exists"
        ]
    }
    ```
  - **Code:** 400 BAD REQUEST <br />
    **Content:**
    ```json
    {
        "status": 400,
        "message": "Bad Request,
        "errors": [
            "minimum password length is 6"
        ]
    }
    ```

## **Login**

Return json access token after user login

- **URL**

  /login

- **Method:**

  `POST`

- **URL Params**

  None

- **Data Params**

  **Required:**

  `email=[string]`\
   `password=[string]`\

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "message": "Login Success!",
      "username": "...",
      "access_token": "..."
    }
    ```

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:**
    ```json
    {
      "status": 400,
      "message": "Login Failed",
      "errors": ["invalid username/password!"]
    }
    ```
  - **Code:** 400 BAD REQUEST <br />
    **Content:**
    ```json
    {
      "status": 400,
      "message": "Login Failed",
      "errors": ["user does not exists"]
    }
    ```

## **Edit Username/Password**

- **URL**

  /:id

- **Method:**

  `POST`

- **URL Params**

  `id=[string]`

- **Data Params**

  **Required:**

  `username=[string]`\
   `password=[string]`\

- **Success Response:**

  - **Code:** 201 <br />
    **Content:**

    ```json
    {
      "message": "Change successful",
      "updatedAt": "..."
    }
    ```

    ```

    ```

## **Delete User**

- **Success Response:**

  - **Code:** 204 <br />
    **Content:**

    ```json
    {
      "message": "User is deleted"
    }
    ```

    ```

    ```

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:**

    ```json
    {
      "message": "Username does not exists"
    }
    ```

    ```

    ```
