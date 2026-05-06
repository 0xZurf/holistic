import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import { adminGetOrder, adminUpdateOrder } from '../../lib/api';
import OrderDetailComponent from '../../components/admin/OrderDetail';
import Select from '../../components/ui/Select';
import Textarea from '../../components/ui/Textarea';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'paid', label: 'Paid' },
  { value: 'fulfilled', label: 'Fulfilled' },
  { value: 'cancelled', label: 'Cancelled' },
];

export default function OrderPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: order, loading, reload } = useApi(() => adminGetOrder(id), [id]);
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [initialized, setInitialized] = useState(false);

  if (order && !initialized) {
    setStatus(order.status || '');
    setNotes(order.notes || '');
    setInitialized(true);
  }

  async function handleUpdate(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await adminUpdateOrder(id, { status, notes });
      reload();
    } catch {
      // error shown inline
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <LoadingSpinner className="py-12" />;
  if (!order) return <p className="text-charcoal/50">Order not found.</p>;

  return (
    <div className="space-y-8 max-w-3xl">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/admin/orders')}
          className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-sand/50 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5 text-charcoal/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>
        <h1 className="font-display text-2xl font-bold text-charcoal">Order Details</h1>
      </div>

      <div className="bg-white rounded-2xl border border-sand p-6">
        <OrderDetailComponent order={order} />
      </div>

      <div className="bg-white rounded-2xl border border-sand p-6">
        <h2 className="font-display text-lg font-semibold text-charcoal mb-4">Update Order</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <Select
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={statusOptions}
          />
          <Textarea
            label="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="Internal notes..."
          />
          <Button type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Update Order'}
          </Button>
        </form>
      </div>
    </div>
  );
}
