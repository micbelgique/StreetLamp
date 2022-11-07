using System;
using System.Collections.Generic;
using System.Text;

namespace IoT_Cosmos_Trigger
{
    public class Alert
    {
        public string deviceID { get; set; }
        public string alertType { get; set; }
        public string lat { get; set; }
        public string lng { get; set; }
        public bool isActive { get; set; }
        public DateTime createdAt { get; set; }
    }
}
