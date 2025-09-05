import { t } from 'elysia';

export const CreateFavoriteDTO = t.Object({
  user_id: t.String(),
  property_id: t.String()
});

export const FavoriteQueryDTO = t.Object({
  user_id: t.Optional(t.String()),
  property_id: t.Optional(t.String()),
  page: t.Optional(t.Number({ minimum: 1, default: 1 })),
  limit: t.Optional(t.Number({ minimum: 1, maximum: 100, default: 10 }))
});

export const FavoriteParamsDTO = t.Object({
  id: t.String()
});

export const FavoriteUserParamsDTO = t.Object({
  userId: t.String()
});

export const FavoriteCheckParamsDTO = t.Object({
  userId: t.String(),
  propertyId: t.String()
});