import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Skeleton } from "@mui/material";

const Orders = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("all");

  // Mock data for orders - replace with actual Redux state
  const [orders, setOrders] = useState([
    {
      id: 1,
      orderNumber: "ORD-001",
      customerName: "John Doe",
      customerPhone: "+1234567890",
      items: [
        { name: "Magic Bag", quantity: 2, price: 15.99 },
        { name: "Falafel Wrap", quantity: 1, price: 8.5 },
      ],
      totalAmount: 40.48,
      status: "pending",
      orderDate: "2024-01-15T10:30:00Z",
      deliveryAddress: "123 Main St, City, State 12345",
    },
    {
      id: 2,
      orderNumber: "ORD-002",
      customerName: "Jane Smith",
      customerPhone: "+1987654321",
      items: [{ name: "Magic Bag", quantity: 1, price: 15.99 }],
      totalAmount: 15.99,
      status: "confirmed",
      orderDate: "2024-01-15T09:15:00Z",
      deliveryAddress: "456 Oak Ave, City, State 12345",
    },
    {
      id: 3,
      orderNumber: "ORD-003",
      customerName: "Mike Johnson",
      customerPhone: "+1122334455",
      items: [
        { name: "Hummus Plate", quantity: 2, price: 12.0 },
        { name: "Magic Bag", quantity: 1, price: 15.99 },
      ],
      totalAmount: 39.99,
      status: "preparing",
      orderDate: "2024-01-15T08:45:00Z",
      deliveryAddress: "789 Pine Rd, City, State 12345",
    },
    {
      id: 4,
      orderNumber: "ORD-004",
      customerName: "Sarah Wilson",
      customerPhone: "+1555666777",
      items: [{ name: "Magic Bag", quantity: 3, price: 15.99 }],
      totalAmount: 47.97,
      status: "ready",
      orderDate: "2024-01-15T07:30:00Z",
      deliveryAddress: "321 Elm St, City, State 12345",
    },
    {
      id: 5,
      orderNumber: "ORD-005",
      customerName: "David Brown",
      customerPhone: "+1444333222",
      items: [
        { name: "Shawarma", quantity: 1, price: 10.5 },
        { name: "Magic Bag", quantity: 1, price: 15.99 },
      ],
      totalAmount: 26.49,
      status: "delivered",
      orderDate: "2024-01-14T18:20:00Z",
      deliveryAddress: "654 Maple Dr, City, State 12345",
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);

  // Filter orders based on active tab
  const filteredOrders =
    activeTab === "all"
      ? orders
      : orders.filter((order) => order.status === activeTab);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatPrice = (price) => {
    return `$${Number(price).toFixed(2)}`;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        label: "Pending",
      },
      confirmed: {
        bg: "bg-blue-100",
        text: "text-blue-800",
        label: "Confirmed",
      },
      preparing: {
        bg: "bg-orange-100",
        text: "text-orange-800",
        label: "Preparing",
      },
      ready: { bg: "bg-green-100", text: "text-green-800", label: "Ready" },
      delivered: {
        bg: "bg-gray-100",
        text: "text-gray-800",
        label: "Delivered",
      },
      cancelled: { bg: "bg-red-100", text: "text-red-800", label: "Cancelled" },
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const handleStatusUpdate = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleViewDetails = (orderId) => {
    console.log("View order details:", orderId);
    // Add navigation to order details page
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <Skeleton variant="text" width="30%" height={40} />
        <div className="mt-4 space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} variant="rectangular" height={80} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-offWhite min-h-screen p-2 md:p-4">
      {/* Tab Navigation */}
      <div className="flex justify-end h-10 mb-8">
        <div className="flex border-2 border-[#225A4B] rounded-2xl overflow-hidden bg-[#F5F3EB]">
          <button
            className={`px-6 py-3 text-lg font-nunitoBold transition-all ${
              activeTab === "all"
                ? "bg-[#225A4B] text-white"
                : "bg-[#F5F3EB] text-[#225A4B]"
            } flex justify-center items-center`}
            onClick={() => setActiveTab("all")}>
            All Orders
          </button>
          <button
            className={`px-6 py-3 text-lg font-nunitoBold transition-all ${
              activeTab === "pending"
                ? "bg-[#225A4B] text-white"
                : "bg-[#F5F3EB] text-[#225A4B]"
            } flex justify-center items-center`}
            onClick={() => setActiveTab("pending")}>
            Pending
          </button>
          <button
            className={`px-6 py-3 text-lg font-nunitoBold transition-all ${
              activeTab === "confirmed"
                ? "bg-[#225A4B] text-white"
                : "bg-[#F5F3EB] text-[#225A4B]"
            } flex justify-center items-center`}
            onClick={() => setActiveTab("confirmed")}>
            Confirmed
          </button>
          <button
            className={`px-6 py-3 text-lg font-nunitoBold transition-all ${
              activeTab === "preparing"
                ? "bg-[#225A4B] text-white"
                : "bg-[#F5F3EB] text-[#225A4B]"
            } flex justify-center items-center`}
            onClick={() => setActiveTab("preparing")}>
            Preparing
          </button>
          <button
            className={`px-6 py-3 text-lg font-nunitoBold transition-all ${
              activeTab === "ready"
                ? "bg-[#225A4B] text-white"
                : "bg-[#F5F3EB] text-[#225A4B]"
            } flex justify-center items-center`}
            onClick={() => setActiveTab("ready")}>
            Ready
          </button>
        </div>
      </div>

      <h1 className="text-xl md:text-2xl font-nunitoBold text-[#225A4A] mb-4 md:mb-6">
        Order Management
      </h1>

      {/* Table Header & Body Responsive Wrapper */}
      <div className="w-full">
        {/* Header for md+ screens */}
        <div className="hidden md:block px-4 py-4 bg-[#F5F3EB] border-2 border-[#A6A6A6] rounded-lg mb-2">
          <div className="grid grid-cols-12 gap-4 text-base font-nunitoBold text-[#225A4A]">
            <div className="col-span-2">Order #</div>
            <div className="col-span-2">Customer</div>
            <div className="col-span-2">Items</div>
            <div className="col-span-1">Total</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-2">Actions</div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-[#A6A6A6]">
          {filteredOrders.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-gray-400 mb-4">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No {activeTab === "all" ? "" : activeTab} orders found
              </h3>
              <p className="text-gray-500">
                {activeTab === "all"
                  ? "You haven't received any orders yet."
                  : `No ${activeTab} orders at the moment.`}
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="my-2 md:my-4 bg-white border-2 border-[#A6A6A6] rounded-lg px-2 md:px-4 py-2 md:py-3 flex flex-col md:grid md:grid-cols-12 gap-2 md:gap-4 items-start md:items-center shadow-sm">
                {/* Order Number */}
                <div className="flex md:col-span-2 items-center w-full">
                  <span className="block md:hidden text-xs font-nunitoBold text-[#225A4A] mb-1">
                    Order #
                  </span>
                  <span className="text-lg font-nunitoBold text-[#225A4A]">
                    {order.orderNumber}
                  </span>
                </div>

                {/* Customer Info */}
                <div className="flex md:col-span-2 items-center w-full">
                  <span className="block md:hidden text-xs font-nunitoBold text-[#225A4A] mb-1">
                    Customer
                  </span>
                  <div>
                    <div className="text-sm font-nunitoBold text-[#225A4A]">
                      {order.customerName}
                    </div>
                    <div className="text-xs text-gray-600">
                      {order.customerPhone}
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="flex md:col-span-2 items-center w-full">
                  <span className="block md:hidden text-xs font-nunitoBold text-[#225A4A] mb-1">
                    Items
                  </span>
                  <div className="text-sm">
                    {order.items.map((item, index) => (
                      <div key={index} className="text-gray-700">
                        {item.quantity}x {item.name}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total */}
                <div className="flex md:col-span-1 items-center w-full">
                  <span className="block md:hidden text-xs font-nunitoBold text-[#225A4A] mb-1">
                    Total
                  </span>
                  <span className="text-[#225A4A] font-nunitoBold">
                    {formatPrice(order.totalAmount)}
                  </span>
                </div>

                {/* Date */}
                <div className="flex md:col-span-2 items-center w-full">
                  <span className="block md:hidden text-xs font-nunitoBold text-[#225A4A] mb-1">
                    Date
                  </span>
                  <span className="text-sm text-gray-700">
                    {formatDate(order.orderDate)}
                  </span>
                </div>

                {/* Status */}
                <div className="flex md:col-span-1 items-center w-full">
                  <span className="block md:hidden text-xs font-nunitoBold text-[#225A4A] mb-1">
                    Status
                  </span>
                  {getStatusBadge(order.status)}
                </div>

                {/* Actions */}
                <div className="flex flex-col md:flex-row gap-2 items-center w-full md:col-span-2">
                  <span className="block md:hidden text-xs font-nunitoBold text-[#225A4A] mb-1">
                    Actions
                  </span>

                  {/* View Details Button */}
                  <button
                    onClick={() => handleViewDetails(order.id)}
                    className="px-3 py-1 bg-[#225A4A] text-white text-xs rounded hover:bg-[#174032] transition-colors">
                    View
                  </button>

                  {/* Status Update Dropdown */}
                  {order.status !== "delivered" &&
                    order.status !== "cancelled" && (
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusUpdate(order.id, e.target.value)
                        }
                        className="px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#225A4A]">
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="preparing">Preparing</option>
                        <option value="ready">Ready</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-2 md:px-4 py-2 md:py-4 bg-[#F5F3EB] border-2 border-[#A6A6A6] rounded-lg mt-4 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-0">
        <p className="text-base text-[#225A4A] font-nunitoBold">
          Showing {filteredOrders.length} order
          {filteredOrders.length !== 1 ? "s" : ""}
          {activeTab !== "all" && ` (${activeTab})`}
        </p>
        <div className="flex gap-2">
          <button className="bg-[#225A4A] font-nunitoBold text-sm rounded-md text-white px-4 py-2 hover:bg-[#174032] transition-colors">
            Export Orders
          </button>
          <button className="bg-[#225A4A] font-nunitoBold text-sm rounded-md text-white px-4 py-2 hover:bg-[#174032] transition-colors">
            Print Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orders;
