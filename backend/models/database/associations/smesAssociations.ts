import {SME} from '../entities/smes';
import {
    Investment
} from '../entities/investments'

SME.hasMany(Investment, { foreignKey: 'smes_id' });
Investment.belongsTo(SME, { foreignKey: 'smes_id' });
