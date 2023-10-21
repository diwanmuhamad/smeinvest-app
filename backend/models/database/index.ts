import { InvestmentRelation } from "./entities/investment-relations";
import { Investment } from "./entities/investments";
import { SME } from "./entities/smes";
import { User } from "./entities/user";

// Define associations
import "./associations/usersAssociations";
import "./associations/smesAssociations";
import "./associations/invesmentsAssociations";

export { User, SME, Investment, InvestmentRelation };
