-- Migration: 001_initial_schema.sql
-- Description: Initial database schema for real estate application
-- Created: 2024-01-01

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create ENUM types
DO $$ BEGIN
    CREATE TYPE user_type_enum AS ENUM ('buyer', 'seller', 'agent', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE property_type_enum AS ENUM ('house', 'apartment', 'condo', 'townhouse', 'land', 'commercial');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE property_status_enum AS ENUM ('for_sale', 'for_rent', 'sold', 'rented', 'pending');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE inquiry_type_enum AS ENUM ('question', 'viewing_request', 'offer', 'general');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE inquiry_status_enum AS ENUM ('pending', 'responded', 'closed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    user_type user_type_enum DEFAULT 'buyer',
    profile_image_url VARCHAR(500),
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Properties Table
CREATE TABLE IF NOT EXISTS properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID REFERENCES users(id) ON DELETE SET NULL,
    agent_id UUID REFERENCES users(id) ON DELETE SET NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    property_type property_type_enum NOT NULL,
    status property_status_enum DEFAULT 'for_sale',
    
    -- Location
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    zip_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) DEFAULT 'USA',
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    
    -- Property Details
    bedrooms INTEGER,
    bathrooms DECIMAL(3,1),
    square_feet INTEGER,
    lot_size DECIMAL(10,2),
    year_built INTEGER,
    
    -- Pricing
    price DECIMAL(12,2),
    rent_amount DECIMAL(10,2),
    price_per_sqft DECIMAL(8,2),
    
    -- Features
    features TEXT[],
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Property Images Table
CREATE TABLE IF NOT EXISTS property_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    image_url VARCHAR(500) NOT NULL,
    image_order INTEGER DEFAULT 0,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Favorites Table
CREATE TABLE IF NOT EXISTS favorites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, property_id)
);

-- 5. Property Views Table
CREATE TABLE IF NOT EXISTS property_views (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    ip_address INET,
    viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Inquiries Table
CREATE TABLE IF NOT EXISTS inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    from_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    to_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    message TEXT NOT NULL,
    inquiry_type inquiry_type_enum DEFAULT 'question',
    status inquiry_status_enum DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Saved Searches Table
CREATE TABLE IF NOT EXISTS saved_searches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    search_criteria JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Indexes for Performance

-- Users table indexes
DROP INDEX IF EXISTS idx_users_email;
CREATE INDEX idx_users_email ON users(email);

DROP INDEX IF EXISTS idx_users_username;
CREATE INDEX idx_users_username ON users(username);

DROP INDEX IF EXISTS idx_users_user_type;
CREATE INDEX idx_users_user_type ON users(user_type);

DROP INDEX IF EXISTS idx_users_created_at;
CREATE INDEX idx_users_created_at ON users(created_at);

-- Properties table indexes
DROP INDEX IF EXISTS idx_properties_owner_id;
CREATE INDEX idx_properties_owner_id ON properties(owner_id);

DROP INDEX IF EXISTS idx_properties_agent_id;
CREATE INDEX idx_properties_agent_id ON properties(agent_id);

DROP INDEX IF EXISTS idx_properties_status;
CREATE INDEX idx_properties_status ON properties(status);

DROP INDEX IF EXISTS idx_properties_property_type;
CREATE INDEX idx_properties_property_type ON properties(property_type);

DROP INDEX IF EXISTS idx_properties_city;
CREATE INDEX idx_properties_city ON properties(city);

DROP INDEX IF EXISTS idx_properties_state;
CREATE INDEX idx_properties_state ON properties(state);

DROP INDEX IF EXISTS idx_properties_zip_code;
CREATE INDEX idx_properties_zip_code ON properties(zip_code);

DROP INDEX IF EXISTS idx_properties_price;
CREATE INDEX idx_properties_price ON properties(price);

DROP INDEX IF EXISTS idx_properties_rent_amount;
CREATE INDEX idx_properties_rent_amount ON properties(rent_amount);

DROP INDEX IF EXISTS idx_properties_bedrooms;
CREATE INDEX idx_properties_bedrooms ON properties(bedrooms);

DROP INDEX IF EXISTS idx_properties_bathrooms;
CREATE INDEX idx_properties_bathrooms ON properties(bathrooms);

DROP INDEX IF EXISTS idx_properties_square_feet;
CREATE INDEX idx_properties_square_feet ON properties(square_feet);

DROP INDEX IF EXISTS idx_properties_created_at;
CREATE INDEX idx_properties_created_at ON properties(created_at);

-- Composite indexes for common queries
DROP INDEX IF EXISTS idx_properties_location;
CREATE INDEX idx_properties_location ON properties(city, state, zip_code);

DROP INDEX IF EXISTS idx_properties_price_range;
CREATE INDEX idx_properties_price_range ON properties(price, status);

DROP INDEX IF EXISTS idx_properties_bed_bath;
CREATE INDEX idx_properties_bed_bath ON properties(bedrooms, bathrooms);

-- Geospatial index for location-based queries
DROP INDEX IF EXISTS idx_properties_coordinates;
CREATE INDEX idx_properties_coordinates ON properties USING GIST (point(latitude, longitude));

-- Property images indexes
DROP INDEX IF EXISTS idx_property_images_property_id;
CREATE INDEX idx_property_images_property_id ON property_images(property_id);

DROP INDEX IF EXISTS idx_property_images_order;
CREATE INDEX idx_property_images_order ON property_images(property_id, image_order);

-- Favorites indexes
DROP INDEX IF EXISTS idx_favorites_user_id;
CREATE INDEX idx_favorites_user_id ON favorites(user_id);

DROP INDEX IF EXISTS idx_favorites_property_id;
CREATE INDEX idx_favorites_property_id ON favorites(property_id);

DROP INDEX IF EXISTS idx_favorites_created_at;
CREATE INDEX idx_favorites_created_at ON favorites(created_at);

-- Property views indexes
DROP INDEX IF EXISTS idx_property_views_property_id;
CREATE INDEX idx_property_views_property_id ON property_views(property_id);

DROP INDEX IF EXISTS idx_property_views_user_id;
CREATE INDEX idx_property_views_user_id ON property_views(user_id);

DROP INDEX IF EXISTS idx_property_views_viewed_at;
CREATE INDEX idx_property_views_viewed_at ON property_views(viewed_at);

-- Inquiries indexes
DROP INDEX IF EXISTS idx_inquiries_property_id;
CREATE INDEX idx_inquiries_property_id ON inquiries(property_id);

DROP INDEX IF EXISTS idx_inquiries_from_user_id;
CREATE INDEX idx_inquiries_from_user_id ON inquiries(from_user_id);

DROP INDEX IF EXISTS idx_inquiries_to_user_id;
CREATE INDEX idx_inquiries_to_user_id ON inquiries(to_user_id);

DROP INDEX IF EXISTS idx_inquiries_status;
CREATE INDEX idx_inquiries_status ON inquiries(status);

DROP INDEX IF EXISTS idx_inquiries_created_at;
CREATE INDEX idx_inquiries_created_at ON inquiries(created_at);

-- Saved searches indexes
DROP INDEX IF EXISTS idx_saved_searches_user_id;
CREATE INDEX idx_saved_searches_user_id ON saved_searches(user_id);

DROP INDEX IF EXISTS idx_saved_searches_created_at;
CREATE INDEX idx_saved_searches_created_at ON saved_searches(created_at);

-- Full-text search index for properties
DROP INDEX IF EXISTS idx_properties_description_fts;
CREATE INDEX idx_properties_description_fts ON properties USING GIN (to_tsvector('english', description));

DROP INDEX IF EXISTS idx_properties_title_fts;
CREATE INDEX idx_properties_title_fts ON properties USING GIN (to_tsvector('english', title));

-- JSONB index for search criteria
DROP INDEX IF EXISTS idx_saved_searches_criteria;
CREATE INDEX idx_saved_searches_criteria ON saved_searches USING GIN (search_criteria);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_properties_updated_at ON properties;
CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON properties FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_inquiries_updated_at ON inquiries;
CREATE TRIGGER update_inquiries_updated_at BEFORE UPDATE ON inquiries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
