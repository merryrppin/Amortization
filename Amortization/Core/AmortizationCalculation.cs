using Amortization.Entities;
using System;

namespace Amortization.Core
{
    public class AmortizationCalculation
    {
        private FeeCalculation feeCalculation;
        public AmortizationCalculation()
        {
            feeCalculation = new FeeCalculation();
        }
        public string FrenchAmortization(AmortizationCls amortizationInput)
        {
            AmortizationCls amortization = new AmortizationCls
            {
                TotalDebt = amortizationInput.TotalDebt,
                Interest = amortizationInput.Interest,
                NumberOfFee = amortizationInput.NumberOfFee,
                InitialDate = amortizationInput.InitialDate
            };
            amortization.FinalDate = amortization.InitialDate.AddMonths(amortization.NumberOfFee - 1);
            amortization.FeeValue = feeCalculation.FrenchFee(amortization);

            feeCalculation.FirstFrenchFee(amortization);
            feeCalculation.FrenchFeeCalculation(amortization, 1);
            return Newtonsoft.Json.JsonConvert.SerializeObject(amortization);
        }

    }
}
