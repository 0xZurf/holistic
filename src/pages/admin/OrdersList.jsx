import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import { adminGetOrders } from '../../lib/api';
import DataTable from '../../components/admin/DataTable';
import Badge from '../../components/ui/Badge';
import { formatPrice, formatDate } from '../../lib/formatters';

const statusVariants = {
  pending: 'clay',
  paid: 'sage',
  fulfilled: 'earth',
  cancelled: 'charcoal',
};

const filters = ['all', 'pending', 'paid', 'fulfilled', 'cancelled'];

const columns = [
  {
    key: 'customer',
    label: 'Customer',
    render: (row) => (
      <div>
        <p className="font-medium text-charcoal">{row.customer_name || 'N/A'}</p>
        <p className="text-xs text-charcoal/40">{row.customer_email}</p>
      </div>
    ),
  },
  { key: 'total', label: 'Total', render: (row) => formatPrice(row.total) },
  {
    key: 'status',
    label: 'Status',
    render: (row) => (
      <Badge variant={statusVariants[row.status] || 'charcoal'}>{row.status}</Badge>
    ),
  },
  { key: 'created_at', label: 'Date', render: (row) => formatDate(row.created_at) },
];

export default function OrdersList() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('all');
  const { data, loading } = useApi(
    () => adminGetOrders(statusFilter === 'all' ? '' : statusFilter),
    [statusFilter]
  );
  const orders = data?.orders || data || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-charcoal">Orders</h1>
        <p className="text-sm text-charcoal/50 mt-1">{orders.length} orders</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setStatusFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors min-h-[44px] ${
              statusFilter === f
                ? 'bg-sage text-white'
                : 'bg-white border border-sand text-charcoal/60 hover:border-sage/50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <DataTable
        columns={columns}
        rows={orders}
        loading={loading}
        emptyMessage="No orders found."
        onRowClick={(row) => navigate(`/admin/orders/${row.id}`)}
      />
    </div>
  );
}
