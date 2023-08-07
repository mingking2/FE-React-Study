const Sequelize = require('sequelize');

class Todo extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            id:{
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            text: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            checked:{
                type: Sequelize.BOOLEAN,
                allowNull: false,
            }
        },{
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Todo',
            tableName: 'todos',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        })
    }
    static associate(db){
    }
};

module.exports = Todo;