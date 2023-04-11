import { Body, Controller, Delete, Get, Param, ParseIntPipe, Res, Post } from '@nestjs/common';
import Ajv, { ValidateFunction } from 'ajv';
import ajvFormats from 'ajv-formats';
import { CreateInput } from '../../../interfaces/CreateInput';

let ajv = new Ajv({ allErrors: true });
ajvFormats(ajv);

const userSchemaValidation = {
  type: 'object',
  properties: {
    _id: { type: 'string', minLength: 1 },
    name: {
      type: 'string',
      minLength: 2,
      pattern: '^[a-zA-ZçÇãÃáÁàÀâÂäÄéÉêÊëËíÍìÌîÎïÏõÕóÓòÒôÔöÖúÚùÙûÛüÜñÑçÇ~^´` ]+$',
    },
    job: { type: 'string', minLength: 1 },
    createdAt: { type: 'string', format: 'date-time' },
  },
  required: ['_id', 'name', 'job'],
  additionalProperties: false,
};

async function validateUser(createInput: CreateInput) {
  const validateVolume = ajv.compile(userSchemaValidation);
  const resultVolume = validateVolume(createInput);

  if (resultVolume) {
    return resultVolume;
  }
  return { message: 'Invalid name. Name should contain only letters' };
}

export { validateUser };
