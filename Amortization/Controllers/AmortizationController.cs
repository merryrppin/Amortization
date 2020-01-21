using System;
using System.Collections.Generic;
using System.Linq;
using Amortization.Core;
using Amortization.Entities;
using Amortization.EnumTypes;
using Microsoft.AspNetCore.Mvc;

namespace Amortization.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AmortizationController : ControllerBase
    {
        AmortizationCalculation _amortizationCalculation = new AmortizationCalculation();

        // GET: api/Amortization
        [HttpGet]
        public IEnumerable<AmortizationTypesValues> Get()
        {
            return InitializeTypes.AmortizationTypesValuesList;
        }

        // GET: api/Amortization/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Amortization
        [HttpPost]
        public string Post([FromBody] AmortizationCls amortization)
        {
            return _amortizationCalculation.CalculateAmortization(amortization);
        }

        // PUT: api/Amortization/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
