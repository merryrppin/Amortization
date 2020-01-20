using System;

namespace Amortization.Entities
{
    public class FeeCls
    {
        public int FeeNumber { get; set; }
        public DateTime FeeDate { get; set; }
        public double Balance { get; set; }
        public double BankInterest { get; set; }
        public double FeeValuePerFee { get; set; }
        public double CapitalPayment { get; set; }
        public double FeeInterest { get; set; }
        public double MissingDebt { get; set; }
    }
}
