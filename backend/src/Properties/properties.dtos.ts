import { t } from 'elysia';
import { property_type_enum, property_status_enum } from '../schemas/properties.schema';

export const CreatePropertyDTO = t.Object({
  title: t.String({ minLength: 1, maxLength: 255 }),
  description: t.Optional(t.String({ maxLength: 2000 })),
  property_type: t.Union([
    t.Literal('apartment'),
    t.Literal('commercial'),
    t.Literal('condo'),
    t.Literal('house'),
    t.Literal('land'),
    t.Literal('townhouse')
  ]),
  status: t.Optional(t.Union([
    t.Literal('for_rent'),
    t.Literal('for_sale'),
    t.Literal('pending'),
    t.Literal('rented'),
    t.Literal('sold')
  ])),
  address: t.String({ minLength: 1, maxLength: 500 }),
  city: t.String({ minLength: 1, maxLength: 100 }),
  state: t.String({ minLength: 1, maxLength: 100 }),
  zip_code: t.String({ minLength: 1, maxLength: 20 }),
  country: t.Optional(t.String({ maxLength: 100 })),
  latitude: t.Optional(t.Number()),
  longitude: t.Optional(t.Number()),
  bedrooms: t.Optional(t.Number({ minimum: 0 })),
  bathrooms: t.Optional(t.Number({ minimum: 0 })),
  square_feet: t.Optional(t.Number({ minimum: 0 })),
  lot_size: t.Optional(t.Number({ minimum: 0 })),
  year_built: t.Optional(t.Number({ minimum: 1800, maximum: new Date().getFullYear() })),
  price: t.Optional(t.Number({ minimum: 0 })),
  rent_amount: t.Optional(t.Number({ minimum: 0 })),
  price_per_sqft: t.Optional(t.Number({ minimum: 0 })),
  features: t.Optional(t.Array(t.String()))
});

export const UpdatePropertyDTO = t.Object({
  title: t.Optional(t.String({ minLength: 1, maxLength: 255 })),
  description: t.Optional(t.String({ maxLength: 2000 })),
  property_type: t.Optional(t.Union([
    t.Literal('apartment'),
    t.Literal('commercial'),
    t.Literal('condo'),
    t.Literal('house'),
    t.Literal('land'),
    t.Literal('townhouse')
  ])),
  status: t.Optional(t.Union([
    t.Literal('for_rent'),
    t.Literal('for_sale'),
    t.Literal('pending'),
    t.Literal('rented'),
    t.Literal('sold')
  ])),
  address: t.Optional(t.String({ minLength: 1, maxLength: 500 })),
  city: t.Optional(t.String({ minLength: 1, maxLength: 100 })),
  state: t.Optional(t.String({ minLength: 1, maxLength: 100 })),
  zip_code: t.Optional(t.String({ minLength: 1, maxLength: 20 })),
  country: t.Optional(t.String({ maxLength: 100 })),
  latitude: t.Optional(t.Number()),
  longitude: t.Optional(t.Number()),
  bedrooms: t.Optional(t.Number({ minimum: 0 })),
  bathrooms: t.Optional(t.Number({ minimum: 0 })),
  square_feet: t.Optional(t.Number({ minimum: 0 })),
  lot_size: t.Optional(t.Number({ minimum: 0 })),
  year_built: t.Optional(t.Number({ minimum: 1800, maximum: new Date().getFullYear() })),
  price: t.Optional(t.Number({ minimum: 0 })),
  rent_amount: t.Optional(t.Number({ minimum: 0 })),
  price_per_sqft: t.Optional(t.Number({ minimum: 0 })),
  features: t.Optional(t.Array(t.String()))
});

export const PropertyQueryDTO = t.Object({
  page: t.Optional(t.Number({ minimum: 1, default: 1 })),
  limit: t.Optional(t.Number({ minimum: 1, maximum: 100, default: 10 })),
  property_type: t.Optional(t.Union([
    t.Literal('apartment'),
    t.Literal('commercial'),
    t.Literal('condo'),
    t.Literal('house'),
    t.Literal('land'),
    t.Literal('townhouse')
  ])),
  status: t.Optional(t.Union([
    t.Literal('for_rent'),
    t.Literal('for_sale'),
    t.Literal('pending'),
    t.Literal('rented'),
    t.Literal('sold')
  ])),
  city: t.Optional(t.String()),
  state: t.Optional(t.String()),
  min_price: t.Optional(t.Number({ minimum: 0 })),
  max_price: t.Optional(t.Number({ minimum: 0 })),
  min_rent: t.Optional(t.Number({ minimum: 0 })),
  max_rent: t.Optional(t.Number({ minimum: 0 })),
  bedrooms: t.Optional(t.Number({ minimum: 0 })),
  bathrooms: t.Optional(t.Number({ minimum: 0 })),
  min_sqft: t.Optional(t.Number({ minimum: 0 })),
  max_sqft: t.Optional(t.Number({ minimum: 0 })),
  search: t.Optional(t.String())
});

export const PropertyParamsDTO = t.Object({
  id: t.String()
});

export const PropertyOwnerParamsDTO = t.Object({
  ownerId: t.String()
});

export const PropertyAgentParamsDTO = t.Object({
  agentId: t.String()
});