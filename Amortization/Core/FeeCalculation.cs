using Amortization.Entities;
using System;

namespace Amortization.Core
{
    public class FeeCalculation
    {
        public double FrenchFee(AmortizationCls amortization)
        {
            double ValueNumerator = amortization.Interest * Math.Pow((1 + amortization.Interest), amortization.NumberOfFee);
            double ValueDenominator = Math.Pow((1 + amortization.Interest), amortization.NumberOfFee) - 1;
            return amortization.TotalDebt * (ValueNumerator / ValueDenominator);
        }

        public void FirstFrenchFee(AmortizationCls amortization)
        {
            amortization.Fees.Add(new FeeCls
            {
                FeeNumber = 1,
                FeeDate = amortization.InitialDate,
                Balance = amortization.TotalDebt,
                FeeValuePerFee = amortization.FeeValue,
                FeeInterest = amortization.Interest,
            });
            FrenchFeePaymentCalculation(amortization.Fees[0]);
        }

        public void FrenchFee(AmortizationCls amortization, int FeeNumber)
        {
            amortization.Fees.Add(new FeeCls
            {
                FeeNumber = FeeNumber + 1,
                FeeDate = amortization.Fees[FeeNumber - 1].FeeDate.AddMonths(1),
                Balance = amortization.Fees[FeeNumber - 1].MissingDebt,
                FeeValuePerFee = amortization.FeeValue,
                FeeInterest = amortization.Interest,
            });
            FrenchFeePaymentCalculation(amortization.Fees[FeeNumber]);
        }

        public void FrenchFeeCalculation(AmortizationCls amortization, int FeeNumber)
        {
            if (FeeNumber < amortization.NumberOfFee)
            {
                FrenchFee(amortization, FeeNumber);
                FeeNumber++;
                FrenchFeeCalculation(amortization, FeeNumber);
            }
        }

        public void FrenchFeePaymentCalculation(FeeCls fee)
        {
            fee.BankInterest = fee.Balance * fee.FeeInterest;
            fee.CapitalPayment = fee.FeeValuePerFee - fee.BankInterest;
            fee.MissingDebt = fee.Balance - fee.CapitalPayment;
        }
    }
}