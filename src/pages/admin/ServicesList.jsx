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
    render: (row) => <span className="font-display text-cream">{row.title}</span>,
  },
  {
    key: 'category',
    label: 'Category',
    render: (row) => (row.category ? <Badge>{row.category}</Badge> : <span className="text-warm-gray">—</span>),
  },
  { key: 'price', label: 'Price', render: (row) => <span className="text-gold">{formatPrice(row.price)}</span> },
  {
    key: 'is_active',
    label: 'Status',
    render: (row) => (
      <Badge variant={row.is_active ? 'gold' : 'muted'}>
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
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/admin/services/${row.id}`);
            }}
            className="font-accent uppercase tracking-[0.15em] text-[11px] text-gold hover:text-gold-light min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(row.id);
            }}
            className="font-accent uppercase tracking-[0.15em] text-[11px] text-warm-gray hover:text-red-300 min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <span className="font-accent uppercase tracking-[0.3em] text-[11px] text-gold-dim">
            Catalog
          </span>
          <h1
            className="font-display font-light text-cream m-0"
            style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', marginTop: 6, letterSpacing: '-0.01em' }}
          >
            Services
          </h1>
          <p className="font-body text-sm text-warm-gray mt-1">{services.length} total</p>
        </div>
        <Button to="/admin/services/new" size="sm">
          New Service
        </Button>
      </div>
      <DataTable
        columns={columnsWithActions}
        rows={services}
        loading={loading}
        emptyMessage="No services yet."
      />
    </div>
  );
}
