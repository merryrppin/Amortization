using Amortization.Entities;
using Amortization.EnumTypes;
using System.Collections.Generic;

namespace Amortization.Core
{
    public class InitializeTypes
    {
        public static List<AmortizationTypesValues> AmortizationTypesValuesList = new List<AmortizationTypesValues>
            {
                new AmortizationTypesValues { AmortizationType =(int)AmortizationTypes.FrenchType, AmortizationTypeValue = "Amortización Francesa" }
            };
    }
}
