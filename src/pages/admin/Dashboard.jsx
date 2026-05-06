import useApi from '../../hooks/useApi';
import { getDashboard, adminGetOrders } from '../../lib/api';
import DashboardStats from '../../components/admin/DashboardStats';
import DataTable from '../../components/admin/DataTable';
import Badge from '../../components/ui/Badge';
import { formatPrice, formatDate } from '../../lib/formatters';

const statusVariants = {
  pending: 'clay',
  paid: 'sage',
  fulfilled: 'earth',
  cancelled: 'charcoal',
};

const orderColumns = [
  {
    key: 'customer_name',
    label: 'Customer',
    render: (row) => (
      <div>
        <p className="font-medium text-charcoal">{row.customer_name || 'N/A'}</p>
        <p className="text-xs text-charcoal/40">{row.customer_email}</p>
      </div>
    ),
  },
  {
    key: 'total',
    label: 'Total',
    render: (row) => formatPrice(row.total),
  },
  {
    key: 'status',
    label: 'Status',
    render: (row) => (
      <Badge variant={statusVariants[row.status] || 'charcoal'}>{row.status}</Badge>
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
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-charcoal">Dashboard</h1>
        <p className="text-sm text-charcoal/50 mt-1">Overview of your business</p>
      </div>

      <DashboardStats stats={stats} />

      <div>
        <h2 className="font-display text-lg font-semibold text-charcoal mb-4">Recent Orders</h2>
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
