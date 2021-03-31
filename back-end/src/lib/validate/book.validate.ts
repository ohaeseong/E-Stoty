import Joi from '@hapi/joi';


export const writeBookValidate = (body: Object) => {
    const schema = Joi.object().keys({
      title: Joi.string().max(500).required(),
      contents: Joi.string().required(),
    });
  
    return schema.validateAsync(body);
};

export const updateBookValidate = (body: Object) => {
    const schema = Joi.object().keys({
      id:  Joi.string().required(),
      title: Joi.string().max(500).required(),
      contents: Joi.string().required(),
    });
  
    return schema.validateAsync(body);
};

export const publishApplyValidate = (body: Object) => {
    const schema = Joi.object().keys({
      id:  Joi.string().required(),
      category: Joi.string().required(),
      thumbnail_address: Joi.string().required(),
      company: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      writer: Joi.string().required(),
      price: Joi.number().integer().required(),
    });
  
    return schema.validateAsync(body);
};