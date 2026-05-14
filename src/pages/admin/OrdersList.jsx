import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import { adminGetOrders } from '../../lib/api';
import DataTable from '../../components/admin/DataTable';
import Badge from '../../components/ui/Badge';
import { formatPrice, formatDate } from '../../lib/formatters';

const statusVariants = {
  pending: 'gold',
  paid: 'gold',
  fulfilled: 'gold',
  cancelled: 'muted',
};

const filters = ['all', 'pending', 'paid', 'fulfilled', 'cancelled'];

const columns = [
  {
    key: 'customer',
    label: 'Customer',
    render: (row) => (
      <div>
        <p className="font-body text-cream m-0">{row.customer_name || 'N/A'}</p>
        <p className="font-body text-xs text-warm-gray m-0">{row.customer_email}</p>
      </div>
    ),
  },
  {
    key: 'total',
    label: 'Total',
    render: (row) => <span className="text-gold">{formatPrice(row.total)}</span>,
  },
  {
    key: 'status',
    label: 'Status',
    render: (row) => (
      <Badge variant={statusVariants[row.status] || 'muted'}>{row.status}</Badge>
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
        <span className="font-accent uppercase tracking-[0.3em] text-[11px] text-gold-dim">
          Transactions
        </span>
        <h1
          className="font-display font-light text-cream m-0"
          style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', marginTop: 6, letterSpacing: '-0.01em' }}
        >
          Orders
        </h1>
        <p className="font-body text-sm text-warm-gray mt-1">{orders.length} orders</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const active = statusFilter === f;
          return (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`px-4 py-2 rounded-sm font-accent uppercase tracking-[0.15em] text-[11px] transition-colors min-h-[40px] border ${
                active
                  ? 'text-gold border-gold-border bg-gold/[0.06]'
                  : 'text-sand border-card-border hover:text-gold hover:border-gold-border'
              }`}
            >
              {f}
            </button>
          );
        })}
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
