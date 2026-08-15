-- Seed data for the Analytics Dashboard.
-- Matches the frontend mock in src/utils/mockData.ts.

USE analytics_dashboard;

INSERT INTO categories (name, slug) VALUES
  ('Electrónica', 'electronica'),
  ('Ropa', 'ropa'),
  ('Hogar', 'hogar'),
  ('Deportes', 'deportes');

INSERT INTO customers (name, email, country) VALUES
  ('María García', 'maria.garcia@example.com', 'España'),
  ('Joan Puig', 'joan.puig@example.com', 'España'),
  ('Lucía Fernández', 'lucia.fernandez@example.com', 'España'),
  ('Carlos Ruiz', 'carlos.ruiz@example.com', 'España');

INSERT INTO products (category_id, name, price, stock) VALUES
  (1, 'Auriculares inalámbricos', 89.99, 120),
  (1, 'Smartphone X', 699.00, 45),
  (2, 'Camiseta básica', 19.99, 300),
  (2, 'Chaqueta de invierno', 89.50, 80),
  (3, 'Lámpara de escritorio', 34.99, 60),
  (3, 'Juego de sábanas', 45.00, 90),
  (4, 'Zapatillas running', 79.95, 50),
  (4, 'Botella térmica', 24.99, 150);

INSERT INTO orders (customer_id, ordered_at, status) VALUES
  (1, '2026-07-01 10:00:00', 'Paid'),
  (2, '2026-07-05 15:30:00', 'Paid'),
  (3, '2026-07-12 09:15:00', 'Shipped'),
  (1, '2026-07-20 18:45:00', 'Paid'),
  (4, '2026-08-01 11:20:00', 'Pending');

INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES
  (1, 1, 2, 89.99),
  (1, 3, 1, 19.99),
  (2, 2, 1, 699.00),
  (3, 7, 1, 79.95),
  (3, 8, 2, 24.99),
  (4, 4, 1, 89.50),
  (5, 5, 1, 34.99);
