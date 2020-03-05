'use strict';

var Sequelize = require('sequelize');
var db = require('../../config/connections');

module.exports = leads = sequelize.import(__dirname + '/LeadsModel.js');
module.exports = users = sequelize.import(__dirname + '/UserModel.js');

leads.belongsTo(users, {
  foreignKey: 'team_id',
  targetKey: 'team_id'
});