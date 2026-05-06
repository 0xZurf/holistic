import { useNavigate } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import { adminGetServices, adminDeleteService } from '../../lib/api';
import DataTable from '../../components/admin/DataTable';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { formatPrice } from '../../lib/formatters';

const columns = [
  {
    key: 'title',
    label: 'Title',
    render: (row) => <span className="font-medium text-charcoal">{row.title}</span>,
  },
  {
    key: 'category',
    label: 'Category',
    render: (row) => row.category ? <Badge variant="sage">{row.category}</Badge> : '—',
  },
  { key: 'price', label: 'Price', render: (row) => formatPrice(row.price) },
  {
    key: 'is_active',
    label: 'Status',
    render: (row) => (
      <Badge variant={row.is_active ? 'sage' : 'charcoal'}>
        {row.is_active ? 'Active' : 'Inactive'}
      </Badge>
    ),
  },
  { key: 'sort_order', label: 'Order' },
];

export default function ServicesList() {
  const navigate = useNavigate();
  const { data, loading, reload } = useApi(adminGetServices);
  const services = data?.services || data || [];

  async function handleDelete(id) {
    if (!confirm('Delete this service?')) return;
    await adminDeleteService(id);
    reload();
  }

  const columnsWithActions = [
    ...columns,
    {
      key: 'actions',
      label: '',
      render: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); navigate(`/admin/services/${row.id}`); }}
            className="text-sage hover:text-sage/70 text-sm font-medium min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            Edit
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleDelete(row.id); }}
            className="text-red-500 hover:text-red-700 text-sm font-medium min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-charcoal">Services</h1>
          <p className="text-sm text-charcoal/50 mt-1">{services.length} total</p>
        </div>
        <Button to="/admin/services/new" size="sm">New Service</Button>
      </div>
      <DataTable columns={columnsWithActions} rows={services} loading={loading} emptyMessage="No services yet." />
    </div>
  );
}
