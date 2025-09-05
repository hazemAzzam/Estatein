import { t } from 'elysia';

export const CreateInquiryDTO = t.Object({
  property_id: t.Optional(t.String()),
  from_user_id: t.Optional(t.String()),
  to_user_id: t.Optional(t.String()),
  message: t.String({ minLength: 1, maxLength: 2000 }),
  inquiry_type: t.Optional(t.Union([
    t.Literal('general'),
    t.Literal('offer'),
    t.Literal('question'),
    t.Literal('viewing_request')
  ])),
  status: t.Optional(t.Union([
    t.Literal('pending'),
    t.Literal('responded'),
    t.Literal('closed')
  ]))
});

export const UpdateInquiryDTO = t.Object({
  message: t.Optional(t.String({ minLength: 1, maxLength: 2000 })),
  inquiry_type: t.Optional(t.Union([
    t.Literal('general'),
    t.Literal('offer'),
    t.Literal('question'),
    t.Literal('viewing_request')
  ])),
  status: t.Optional(t.Union([
    t.Literal('pending'),
    t.Literal('responded'),
    t.Literal('closed')
  ]))
});

export const InquiryQueryDTO = t.Object({
  property_id: t.Optional(t.String()),
  from_user_id: t.Optional(t.String()),
  to_user_id: t.Optional(t.String()),
  inquiry_type: t.Optional(t.Union([
    t.Literal('general'),
    t.Literal('offer'),
    t.Literal('question'),
    t.Literal('viewing_request')
  ])),
  status: t.Optional(t.Union([
    t.Literal('pending'),
    t.Literal('responded'),
    t.Literal('closed')
  ])),
  page: t.Optional(t.Number({ minimum: 1, default: 1 })),
  limit: t.Optional(t.Number({ minimum: 1, maximum: 100, default: 10 }))
});

export const InquiryParamsDTO = t.Object({
  id: t.String()
});

export const InquiryPropertyParamsDTO = t.Object({
  propertyId: t.String()
});

export const InquiryUserParamsDTO = t.Object({
  userId: t.String()
});

export const InquiryStatusUpdateDTO = t.Object({
  status: t.Union([
    t.Literal('pending'),
    t.Literal('responded'),
    t.Literal('closed')
  ])
});