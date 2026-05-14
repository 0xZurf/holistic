import { useNavigate } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import { adminGetRetreats, adminDeleteRetreat } from '../../lib/api';
import DataTable from '../../components/admin/DataTable';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { formatPrice, formatDateRange } from '../../lib/formatters';

const columns = [
  {
    key: 'title',
    label: 'Title',
    render: (row) => <span className="font-display text-cream">{row.title}</span>,
  },
  { key: 'location', label: 'Location' },
  {
    key: 'dates',
    label: 'Dates',
    render: (row) => (row.start_date ? formatDateRange(row.start_date, row.end_date) : '—'),
  },
  {
    key: 'price',
    label: 'Price',
    render: (row) => <span className="text-gold">{formatPrice(row.price)}</span>,
  },
  {
    key: 'spots',
    label: 'Spots',
    render: (row) => `${row.spots_remaining}/${row.capacity}`,
  },
  {
    key: 'is_active',
    label: 'Status',
    render: (row) => (
      <Badge variant={row.is_active ? 'gold' : 'muted'}>
        {row.is_active ? 'Active' : 'Inactive'}
      </Badge>
    ),
  },
];

export default function RetreatsList() {
  const navigate = useNavigate();
  const { data, loading, reload } = useApi(adminGetRetreats);
  const retreats = data?.retreats || data || [];

  async function handleDelete(id) {
    if (!confirm('Delete this retreat?')) return;
    await adminDeleteRetreat(id);
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
              navigate(`/admin/retreats/${row.id}`);
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
            Experiences
          </span>
          <h1
            className="font-display font-light text-cream m-0"
            style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', marginTop: 6, letterSpacing: '-0.01em' }}
          >
            Retreats
          </h1>
          <p className="font-body text-sm text-warm-gray mt-1">{retreats.length} total</p>
        </div>
        <Button to="/admin/retreats/new" size="sm">
          New Retreat
        </Button>
      </div>
      <DataTable
        columns={columnsWithActions}
        rows={retreats}
        loading={loading}
        emptyMessage="No retreats yet."
      />
    </div>
  );
}
