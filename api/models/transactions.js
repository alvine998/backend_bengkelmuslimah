const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('transactions', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    place_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    place_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    purchase_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    purchase_account_number: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    purchase_type: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    employee_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    remarks: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    voucher_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    voucher_code: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    total_price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    service_type: {
      type: DataTypes.ENUM('home_service','onsite'),
      allowNull: false,
      defaultValue: "onsite"
    },
    home_address: {
      type: DataTypes.BLOB,
      allowNull: true,
      comment: "jika servis kerumah"
    },
    status: {
      type: DataTypes.ENUM('canceled','paid','unpaid'),
      allowNull: false,
      defaultValue: "unpaid"
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
    tableName: 'transactions',
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
