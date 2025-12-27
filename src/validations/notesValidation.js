import { Joi, Segments } from 'celebrate';
import { TAGS } from '../constants/tags.js';
import { isValidObjectId } from 'mongoose';

const objectValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid Id format') : value;
};

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string().valid(...TAGS),
    search: Joi.string().trim().allow(''),
  }),
};

export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectValidator).required(),
  }),
};

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required(),
    content: Joi.string().trim().allow(''),
    tag: Joi.string().valid(...TAGS),
  }),
};

export const updateNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1),
    content: Joi.string().trim().allow(''),
    tag: Joi.string().valid(...TAGS),
  })
    .min(1)
    .messages({ 'object.min': 'Body should contain at least one field' }),
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectValidator).required(),
  }),
};
