import {InvestmentRelation} from '../entities/investment-relations';
import {
    Investment
} from '../entities/investments'

Investment.hasMany(InvestmentRelation, { foreignKey: 'investment_id' });
InvestmentRelation.belongsTo(Investment, { foreignKey: 'investment_id' });

