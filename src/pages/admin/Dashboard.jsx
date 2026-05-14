import useApi from '../../hooks/useApi';
import { getDashboard, adminGetOrders } from '../../lib/api';
import DashboardStats from '../../components/admin/DashboardStats';
import DataTable from '../../components/admin/DataTable';
import Badge from '../../components/ui/Badge';
import { formatPrice, formatDate } from '../../lib/formatters';

const statusVariants = {
  pending: 'gold',
  paid: 'gold',
  fulfilled: 'gold',
  cancelled: 'muted',
};

const orderColumns = [
  {
    key: 'customer_name',
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
  {
    key: 'created_at',
    label: 'Date',
    render: (row) => formatDate(row.created_at),
  },
];

export default function Dashboard() {
  const { data: stats, loading: statsLoading } = useApi(getDashboard);
  const { data: ordersData, loading: ordersLoading } = useApi(adminGetOrders);

  const recentOrders = (ordersData?.orders || ordersData || []).slice(0, 10);

  return (
    <div className="space-y-10">
      <div>
        <span className="font-accent uppercase tracking-[0.3em] text-[11px] text-gold-dim">
          Overview
        </span>
        <h1
          className="font-display font-light text-cream m-0"
          style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', marginTop: 6, letterSpacing: '-0.01em' }}
        >
          Dashboard
        </h1>
      </div>

      <DashboardStats stats={stats} />

      <div>
        <h2 className="font-display font-light text-cream text-xl mb-5">
          Recent <span className="text-gold">Orders</span>
        </h2>
        <DataTable
          columns={orderColumns}
          rows={recentOrders}
          loading={statsLoading || ordersLoading}
          emptyMessage="No orders yet."
        />
      </div>
    </div>
  );
}
