import { useNavigate } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import { adminGetTestimonials, adminDeleteTestimonial } from '../../lib/api';
import DataTable from '../../components/admin/DataTable';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const columns = [
  {
    key: 'name',
    label: 'Name',
    render: (row) => (
      <div>
        <p className="font-medium text-charcoal">{row.name}</p>
        {row.title && <p className="text-xs text-charcoal/40">{row.title}</p>}
      </div>
    ),
  },
  {
    key: 'body',
    label: 'Excerpt',
    render: (row) => (
      <span className="text-charcoal/60 line-clamp-1">{row.body?.slice(0, 80)}...</span>
    ),
  },
  {
    key: 'rating',
    label: 'Rating',
    render: (row) => row.rating ? `${'★'.repeat(row.rating)}${'☆'.repeat(5 - row.rating)}` : '—',
  },
  {
    key: 'is_featured',
    label: 'Featured',
    render: (row) => row.is_featured ? <Badge variant="gold">Featured</Badge> : '—',
  },
  {
    key: 'is_active',
    label: 'Status',
    render: (row) => (
      <Badge variant={row.is_active ? 'sage' : 'charcoal'}>
        {row.is_active ? 'Active' : 'Inactive'}
      </Badge>
    ),
  },
];

export default function TestimonialsList() {
  const navigate = useNavigate();
  const { data, loading, reload } = useApi(adminGetTestimonials);
  const testimonials = data?.testimonials || data || [];

  async function handleDelete(id) {
    if (!confirm('Delete this testimonial?')) return;
    await adminDeleteTestimonial(id);
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
            onClick={(e) => { e.stopPropagation(); navigate(`/admin/testimonials/${row.id}`); }}
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
          <h1 className="font-display text-2xl font-bold text-charcoal">Testimonials</h1>
          <p className="text-sm text-charcoal/50 mt-1">{testimonials.length} total</p>
        </div>
        <Button to="/admin/testimonials/new" size="sm">New Testimonial</Button>
      </div>
      <DataTable columns={columnsWithActions} rows={testimonials} loading={loading} emptyMessage="No testimonials yet." />
    </div>
  );
}
