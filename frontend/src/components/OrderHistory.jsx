import { useState } from 'react';
import './OrderHistory.css';

const mockOrders = [
  {
    id: 'ORD-1001',
    date: '2024-06-01',
    items: [
      { name: 'Margherita Pizza', qty: 1 },
      { name: 'Garlic Bread', qty: 2 }
    ],
    total: 18.99,
    status: 'Delivered'
  },
  {
    id: 'ORD-1002',
    date: '2024-06-03',
    items: [
      { name: 'Veggie Burger', qty: 2 },
      { name: 'Fries', qty: 1 }
    ],
    total: 15.50,
    status: 'Out for delivery'
  },
  {
    id: 'ORD-1003',
    date: '2024-06-05',
    items: [
      { name: 'Pasta Alfredo', qty: 1 }
    ],
    total: 12.00,
    status: 'Preparing'
  }
];

const statusColors = {
  'Preparing': '#ffc404',
  'Out for delivery': '#2563eb',
  'Delivered': '#22c55e'
};

const OrderHistory = () => {
  const [orders, setOrders] = useState(mockOrders);

  const handleReorder = (order) => {
    // For demo: just alert. In real app, add items to cart.
    alert(`Re-ordered: ${order.items.map(i => i.name).join(', ')}`);
  };

  return (
    <div className="order-history-container">
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <p>No past orders found.</p>
      ) : (
        <ul className="order-list">
          {orders.map(order => (
            <li key={order.id} className="order-card">
              <div className="order-header">
                <span className="order-id">{order.id}</span>
                <span className="order-date">{order.date}</span>
                <span className="order-status" style={{background: statusColors[order.status]}}>{order.status}</span>
              </div>
              <ul className="order-items">
                {order.items.map((item, idx) => (
                  <li key={idx}>{item.qty} × {item.name}</li>
                ))}
              </ul>
              <div className="order-footer">
                <span className="order-total">Total: ${order.total.toFixed(2)}</span>
                <button className="reorder-btn" onClick={() => handleReorder(order)}>Re-order</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory; 