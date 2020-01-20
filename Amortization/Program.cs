using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Amortization.Core;
using Amortization.Entities;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Amortization
{
    public class Program
    {
        public static void Main(string[] args)
        {
            //AmortizationCalculation amortizationCalculation = new AmortizationCalculation();
            //amortizationCalculation.FrenchAmortization(new AmortizationCls
            //{
            //    TotalDebt = 107000000,
            //    Interest = 0.008545,
            //    NumberOfFee = 180,
            //    InitialDate = new DateTime(2020, 01, 18)
            //});

            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}
