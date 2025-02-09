# 🍊 Nectarine

**A YAML-driven API and Database Schema Library**  

Nectarine is a structured, **YAML-based library** designed to simplify **API and database schema management**. It provides a declarative approach for defining RESTful API routes, database queries, and schemas in a structured and human-readable format.  

## 🚀 Features  

- **YAML-Based API Definition** – Easily define API endpoints using YAML.  
- **Structured Query Definitions** – Write database queries in a declarative YAML format.  
- **Database Schema Management** – Define table structures, relationships, and constraints in YAML.  
- **Stack-Agnostic** – Supports various backends, including Node.js, Express, PostgreSQL, and more.  
- **Plug-and-Play** – Designed for seamless integration into projects.  

---

## 📁 Project Structure  

```text
nectarine/
├── api/              # API route definitions
│   ├── userAPI.yml   # API endpoints for user-related operations
│   ├── orderAPI.yml  # (Example) API endpoints for orders
│   └── ...          
├── queries/          # Database queries in YAML format
│   ├── user.yml      # User queries
│   ├── order.yml     # (Example) Order queries
│   └── ...          
├── schemas/          # Database schema definitions
│   ├── userSchema.yml  # User table schema
│   ├── orderSchema.yml # (Example) Order table schema
│   └── ...          
├── server.js         # Main server file (Node.js/Express)
└── README.md         # Documentation
```

---

## 🔧 API Endpoints  

The `userAPI.yml` file defines REST API endpoints for user operations:  

### **GET Requests**

- **Retrieve all users**: `GET /users`  
- **Find user by ID**: `GET /users/:id`  
- **Find user by email**: `GET /users/:email`  
- **Find users by city**: `GET /users/:city`  
- **Find users by city & state**: `GET /users/:state/:city`  

### **POST Requests**

- **Create a new user**: `POST /users`  

### **PUT Requests**

- **Update user by ID**: `PUT /users/:id`  

### **DELETE Requests**

- **Delete user by ID**: `DELETE /users/:id`  

(See `userAPI.yml` for more details)  

---

## 🛢️ Database Queries  

The `user.yml` file contains structured database queries:  

- **Get users by age**:  

  ```yaml
  userByAge:
    type: SELECT
    fields:
      - id
      - name
    action: FROM
    table: users
    conditions:
      condition: 'WHERE'
      column: age
      operator: '>'
      value: $1
  ```  

- **Retrieve all users**:  

  ```yaml
  AllUsers:
    type: SELECT
    table: users
    fields: '*'
  ```  

- **Update user details by ID**:  

  ```yaml
  update:
    userById:
      type: UPDATE
      table: users
      updates:
        column: name, age
        value: $1, $2
      conditions:
        condition: 'WHERE'
        column: id
        operator: '='
        value: $3
  ```

(See `user.yml` for more details)  

---

## 🏗️ Database Schema  

The `userSchema.yml` defines table structures:  

```yaml
users:
  columns:
    - name: id
      type: SERIAL
      primary: true
    - name: name
      type: varchar(255)
      nullable: false
    - name: email
      type: varchar(255)
      unique: true
    - name: age
      type: INT
    - name: address
      type: varchar(255)
      nullable: false
    - name: city
      type: varchar(50)
      nullable: false
    - name: state
      type: varchar(50)
      nullable: false
    - name: zipcode
      type: INT
      nullable: false
    - name: phone
      type: INT
      nullable: true
```

(See `userSchema.yml` for more details)  

---

## 🏗️ Installation & Usage  

### **Prerequisites**

- Node.js `>= 16.x`
- PostgreSQL (or compatible database)

### **Install Dependencies**

```sh
npm install
```

### **Run the Server**

```sh
node server.js
```

---

## 🏗️ Future Roadmap  

- Add **GraphQL support**  
- Expand **multi-database support** (MySQL, MongoDB)  
- Implement **API validation & authentication**  
- Develop **admin dashboard** for schema management  

---

## 👥 Contributing  

We welcome contributions! Feel free to submit **issues** or **pull requests**.  

---

## 📝 License  

**Nectarine** is open-source under the **MIT License**.  

---

Let me know if you need modifications or additions! 🚀
