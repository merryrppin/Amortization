using System;
using System.Collections.Generic;

namespace Amortization.Entities
{
    public class AmortizationCls
    {
        public AmortizationCls()
        {
            Fees = new List<FeeCls>();
        }
        public Double TotalDebt { get; set; }
        public Double Interest { get; set; }
        public Double FeeValue { get; set; }
        public int NumberOfFee { get; set; }
        public DateTime InitialDate { get; set; }
        public DateTime FinalDate { get; set; }
        public List<FeeCls> Fees { get; set; }
    }
}
