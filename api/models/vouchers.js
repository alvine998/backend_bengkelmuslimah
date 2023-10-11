const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vouchers', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('cashback','discount','gift','other'),
      allowNull: false,
      defaultValue: "cashback"
    },
    max: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    min: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    percentage: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    quota: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    max_used: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    expired_at: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    time_start: {
      type: DataTypes.TIME,
      allowNull: true
    },
    time_end: {
      type: DataTypes.TIME,
      allowNull: true
    },
    banner: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_on: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deleted: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'vouchers',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
