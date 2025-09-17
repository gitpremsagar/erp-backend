
================================================================
logic for reducing stock when generating order

Key Features of This Logic:
1. FIFO (First In, First Out) with Expiry Priority
Stock is allocated from batches with the newest expiry dates first
This ensures older stock is used before it expires
2. Atomic Transactions
All operations are wrapped in a database transaction
If any step fails, the entire operation is rolled back
Ensures data consistency
3. Comprehensive Stock Tracking
Every stock movement is recorded in StockRecord with:
Product ID
Stock batch ID
Change amount (negative for outgoing stock)
Order ID (for traceability)
Reason: "ASSIGNED_TO_ORDER"
4. Multi-Batch Stock Allocation
Can fulfill orders from multiple stock batches if needed
Handles partial fulfillment across batches
Updates remaining quantity dynamically
5. Data Integrity
Validates all foreign key relationships before processing
Ensures customer, vehicle, and products exist
Maintains referential integrity throughout the process
This implementation provides a robust, inventory-aware order creation system that properly manages stock levels while maintaining complete audit trails of all stock movements.