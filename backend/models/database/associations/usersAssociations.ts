import {User} from '../entities/user';
import {
    InvestmentRelation
} from '../entities/investment-relations'

User.hasMany(InvestmentRelation, { foreignKey: 'user_id' });
InvestmentRelation.belongsTo(User, { foreignKey: 'user_id' });
