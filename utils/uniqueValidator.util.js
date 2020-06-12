const Sequelize = require('sequelize');
const ValidationError = require('validate/build/error');

const Op = Sequelize.Op;

// whereNot = 'id:823'
module.exports = async function ({
  errors = [],
  message = null,
  model,
  path,
  val,
  whereNot = null,
}) {
  const data = {
    where: {
      [path]: val,
    },
  };
  if (whereNot) {
    const [nameNot, valueNot] = whereNot.split(':');
    data.where[Op.not] = [{ [nameNot]: valueNot }];
  }

  console.log(model);
  const count = await model.count(data);
  if (count !== 0) {
    if (!message) {
      message = path + ' not unique';
    }
    errors.push(new ValidationError(message, path));
  }
  return errors;
};
