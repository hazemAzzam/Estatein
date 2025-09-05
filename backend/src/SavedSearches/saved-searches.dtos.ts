import { t } from 'elysia';

export const CreateSavedSearchDTO = t.Object({
  user_id: t.String(),
  name: t.String({ minLength: 1, maxLength: 255 }),
  search_criteria: t.Record(t.String(), t.Any())
});

export const UpdateSavedSearchDTO = t.Object({
  name: t.Optional(t.String({ minLength: 1, maxLength: 255 })),
  search_criteria: t.Optional(t.Record(t.String(), t.Any()))
});

export const SavedSearchQueryDTO = t.Object({
  user_id: t.Optional(t.String()),
  page: t.Optional(t.Number({ minimum: 1, default: 1 })),
  limit: t.Optional(t.Number({ minimum: 1, maximum: 100, default: 10 }))
});

export const SavedSearchParamsDTO = t.Object({
  id: t.String()
});

export const SavedSearchUserParamsDTO = t.Object({
  userId: t.String()
});