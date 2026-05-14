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
        <p className="font-display text-cream m-0">{row.name}</p>
        {row.title && <p className="font-body text-xs text-warm-gray m-0">{row.title}</p>}
      </div>
    ),
  },
  {
    key: 'body',
    label: 'Excerpt',
    render: (row) => (
      <span className="font-body text-warm-gray line-clamp-1">
        {row.body?.slice(0, 80)}...
      </span>
    ),
  },
  {
    key: 'rating',
    label: 'Rating',
    render: (row) =>
      row.rating ? (
        <span className="text-gold">
          {'★'.repeat(row.rating)}
          <span className="text-warm-gray">{'☆'.repeat(5 - row.rating)}</span>
        </span>
      ) : (
        '—'
      ),
  },
  {
    key: 'is_featured',
    label: 'Featured',
    render: (row) => (row.is_featured ? <Badge>Featured</Badge> : <span className="text-warm-gray">—</span>),
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
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/admin/testimonials/${row.id}`);
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
            Transmissions
          </span>
          <h1
            className="font-display font-light text-cream m-0"
            style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', marginTop: 6, letterSpacing: '-0.01em' }}
          >
            Testimonials
          </h1>
          <p className="font-body text-sm text-warm-gray mt-1">{testimonials.length} total</p>
        </div>
        <Button to="/admin/testimonials/new" size="sm">
          New Testimonial
        </Button>
      </div>
      <DataTable
        columns={columnsWithActions}
        rows={testimonials}
        loading={loading}
        emptyMessage="No testimonials yet."
      />
    </div>
  );
}
