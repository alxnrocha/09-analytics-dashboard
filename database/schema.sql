-- Analytics Dashboard - database schema (theoretical model for project 09)
-- Target: MySQL 8.4 LTS
-- Charset: utf8mb4

CREATE DATABASE IF NOT EXISTS analytics_dashboard
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_0900_ai_ci;

USE analytics_dashboard;

-- Product categories (e.g. Electronica, Ropa, Hogar).
CREATE TABLE categories (
  id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name       VARCHAR(120)    NOT NULL,
  slug       VARCHAR(120)    NOT NULL,
  created_at TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_categories_name (name),
  UNIQUE KEY uq_categories_slug (slug)
) ENGINE=InnoDB;

-- Customers who place orders.
CREATE TABLE customers (
  id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name       VARCHAR(120)    NOT NULL,
  email      VARCHAR(255)    NOT NULL,
  country    VARCHAR(60)     NOT NULL,
  created_at TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_customers_email (email)
) ENGINE=InnoDB;

-- Products sold in the store.
CREATE TABLE products (
  id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  category_id BIGINT UNSIGNED NOT NULL,
  name        VARCHAR(200)    NOT NULL,
  price       DECIMAL(12,2)   NOT NULL,
  stock       INT UNSIGNED    NOT NULL DEFAULT 0,
  created_at  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_products_category (category_id),
  KEY idx_products_price (price),
  CONSTRAINT fk_products_category FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE RESTRICT,
  CONSTRAINT chk_products_price CHECK (price >= 0)
) ENGINE=InnoDB;

-- Orders placed by customers.
CREATE TABLE orders (
  id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  customer_id BIGINT UNSIGNED NOT NULL,
  ordered_at  DATETIME        NOT NULL,
  status      ENUM('Pending','Paid','Shipped','Cancelled') NOT NULL DEFAULT 'Pending',
  created_at  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_orders_customer (customer_id),
  KEY idx_orders_ordered_at (ordered_at),
  CONSTRAINT fk_orders_customer FOREIGN KEY (customer_id) REFERENCES customers (id) ON DELETE RESTRICT
) ENGINE=InnoDB;

-- Line items of each order.
CREATE TABLE order_items (
  id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  order_id   BIGINT UNSIGNED NOT NULL,
  product_id BIGINT UNSIGNED NOT NULL,
  quantity   INT UNSIGNED    NOT NULL,
  unit_price DECIMAL(12,2)   NOT NULL,
  created_at TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_order_items_order (order_id),
  KEY idx_order_items_product (product_id),
  CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE,
  CONSTRAINT fk_order_items_product FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE RESTRICT,
  CONSTRAINT chk_order_items_quantity CHECK (quantity > 0)
) ENGINE=InnoDB;
