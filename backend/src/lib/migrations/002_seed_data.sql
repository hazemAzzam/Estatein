-- Migration: 002_seed_data.sql
-- Description: Seed data for real estate application
-- Created: 2024-01-01

-- Insert sample users for testing
INSERT INTO users (username, email, password_hash, first_name, last_name, user_type, is_verified) VALUES
('admin', 'admin@realestate.com', '$2b$10$example_hash', 'Admin', 'User', 'admin', true),
('agent1', 'agent1@realestate.com', '$2b$10$example_hash', 'John', 'Agent', 'agent', true),
('buyer1', 'buyer1@example.com', '$2b$10$example_hash', 'Jane', 'Buyer', 'buyer', true)
ON CONFLICT (username) DO NOTHING;

-- Insert sample properties
INSERT INTO properties (owner_id, agent_id, title, description, property_type, status, address, city, state, zip_code, price, bedrooms, bathrooms, square_feet) VALUES
(
    (SELECT id FROM users WHERE username = 'buyer1'),
    (SELECT id FROM users WHERE username = 'agent1'),
    'Beautiful 3-Bedroom House',
    'Spacious family home with modern amenities, updated kitchen, and large backyard. Perfect for families looking for comfort and style.',
    'house',
    'for_sale',
    '123 Main St',
    'New York',
    'NY',
    '10001',
    750000.00,
    3,
    2.5,
    2000
),
(
    (SELECT id FROM users WHERE username = 'buyer1'),
    (SELECT id FROM users WHERE username = 'agent1'),
    'Modern Downtown Apartment',
    'Luxurious 2-bedroom apartment in the heart of downtown. Features include floor-to-ceiling windows, modern appliances, and access to building amenities.',
    'apartment',
    'for_rent',
    '456 Downtown Ave',
    'New York',
    'NY',
    '10002',
    3500.00,
    2,
    2.0,
    1200
),
(
    (SELECT id FROM users WHERE username = 'buyer1'),
    (SELECT id FROM users WHERE username = 'agent1'),
    'Cozy Townhouse',
    'Charming 3-story townhouse with private garden. Recently renovated with high-end finishes and smart home features.',
    'townhouse',
    'for_sale',
    '789 Garden Lane',
    'Brooklyn',
    'NY',
    '11201',
    950000.00,
    4,
    3.5,
    2800
)
ON CONFLICT DO NOTHING;

-- Insert sample property images
INSERT INTO property_images (property_id, image_url, image_order, is_primary) VALUES
(
    (SELECT id FROM properties WHERE title = 'Beautiful 3-Bedroom House' LIMIT 1),
    'https://example.com/images/house1_main.jpg',
    0,
    true
),
(
    (SELECT id FROM properties WHERE title = 'Beautiful 3-Bedroom House' LIMIT 1),
    'https://example.com/images/house1_kitchen.jpg',
    1,
    false
),
(
    (SELECT id FROM properties WHERE title = 'Modern Downtown Apartment' LIMIT 1),
    'https://example.com/images/apt1_main.jpg',
    0,
    true
),
(
    (SELECT id FROM properties WHERE title = 'Cozy Townhouse' LIMIT 1),
    'https://example.com/images/townhouse1_main.jpg',
    0,
    true
)
ON CONFLICT DO NOTHING;

-- Insert sample favorites
INSERT INTO favorites (user_id, property_id) VALUES
(
    (SELECT id FROM users WHERE username = 'buyer1'),
    (SELECT id FROM properties WHERE title = 'Beautiful 3-Bedroom House' LIMIT 1)
),
(
    (SELECT id FROM users WHERE username = 'buyer1'),
    (SELECT id FROM properties WHERE title = 'Modern Downtown Apartment' LIMIT 1)
)
ON CONFLICT (user_id, property_id) DO NOTHING;

-- Insert sample inquiries
INSERT INTO inquiries (property_id, from_user_id, to_user_id, message, inquiry_type, status) VALUES
(
    (SELECT id FROM properties WHERE title = 'Beautiful 3-Bedroom House' LIMIT 1),
    (SELECT id FROM users WHERE username = 'buyer1'),
    (SELECT id FROM users WHERE username = 'agent1'),
    'Hi, I am interested in this property. Can I schedule a viewing this weekend?',
    'viewing_request',
    'pending'
),
(
    (SELECT id FROM properties WHERE title = 'Modern Downtown Apartment' LIMIT 1),
    (SELECT id FROM users WHERE username = 'buyer1'),
    (SELECT id FROM users WHERE username = 'agent1'),
    'Is this apartment still available? What are the lease terms?',
    'question',
    'pending'
)
ON CONFLICT DO NOTHING;

-- Insert sample saved searches
INSERT INTO saved_searches (user_id, name, search_criteria) VALUES
(
    (SELECT id FROM users WHERE username = 'buyer1'),
    'NYC Houses Under 800k',
    '{"city": "New York", "state": "NY", "property_type": "house", "max_price": 800000, "min_bedrooms": 3}'
),
(
    (SELECT id FROM users WHERE username = 'buyer1'),
    'Downtown Apartments',
    '{"city": "New York", "state": "NY", "property_type": "apartment", "max_rent": 4000, "min_bedrooms": 2}'
)
ON CONFLICT DO NOTHING;
