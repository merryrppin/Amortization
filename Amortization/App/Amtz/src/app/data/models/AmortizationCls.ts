import { FeeCls } from "./FeeCls";
import { AmortizationTypesValues } from "./AmortizationTypesValues";

export class AmortizationCls {
    TotalDebt: number;
    Interest: number;
    FeeValue: number;
    NumberOfFee: number;
    AmortizationType: AmortizationTypesValues;
    InitialDate: Date;
    FinalDate: Date;
    Fees: Array<FeeCls>;
}