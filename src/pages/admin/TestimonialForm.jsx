import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import { adminGetTestimonials, adminCreateTestimonial, adminUpdateTestimonial } from '../../lib/api';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Button from '../../components/ui/Button';
import ImageUploader from '../../components/admin/ImageUploader';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

export default function TestimonialForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const { data, loading } = useApi(
    () => isEdit ? adminGetTestimonials().then((d) => {
      const list = d?.testimonials || d || [];
      return list.find((t) => t.id === id);
    }) : Promise.resolve(null),
    [id]
  );

  const [form, setForm] = useState({
    name: '',
    title: '',
    body: '',
    image_url: '',
    rating: 5,
    is_featured: 0,
    is_active: 1,
    sort_order: 0,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (data) setForm({ ...data });
  }, [data]);

  function set(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = {
        ...form,
        rating: parseInt(form.rating) || 5,
        sort_order: parseInt(form.sort_order) || 0,
        is_featured: form.is_featured ? 1 : 0,
        is_active: form.is_active ? 1 : 0,
      };
      if (isEdit) {
        await adminUpdateTestimonial(id, payload);
      } else {
        await adminCreateTestimonial(payload);
      }
      navigate('/admin/testimonials');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (isEdit && loading) return <LoadingSpinner className="py-12" />;

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-charcoal">
        {isEdit ? 'Edit Testimonial' : 'New Testimonial'}
      </h1>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Client Name"
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            required
          />
          <Input
            label="Client Title/Role"
            value={form.title}
            onChange={(e) => set('title', e.target.value)}
            placeholder="e.g. Wellness Coach"
          />
        </div>

        <Textarea
          label="Testimonial"
          value={form.body}
          onChange={(e) => set('body', e.target.value)}
          rows={5}
          required
        />

        <ImageUploader
          label="Client Photo (optional)"
          value={form.image_url}
          onChange={(url) => set('image_url', url)}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-charcoal/70 mb-1.5">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => set('rating', star)}
                  className="text-2xl min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  {star <= form.rating ? '★' : '☆'}
                </button>
              ))}
            </div>
          </div>
          <Input
            label="Sort Order"
            type="number"
            value={form.sort_order}
            onChange={(e) => set('sort_order', e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
            <input
              type="checkbox"
              checked={!!form.is_featured}
              onChange={(e) => set('is_featured', e.target.checked ? 1 : 0)}
              className="w-5 h-5 rounded border-sand text-sage focus:ring-sage/30"
            />
            <span className="text-sm font-medium text-charcoal/70">Featured on home page</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
            <input
              type="checkbox"
              checked={!!form.is_active}
              onChange={(e) => set('is_active', e.target.checked ? 1 : 0)}
              className="w-5 h-5 rounded border-sand text-sage focus:ring-sage/30"
            />
            <span className="text-sm font-medium text-charcoal/70">Active (visible on site)</span>
          </label>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-sand">
          <Button type="submit" disabled={saving}>
            {saving ? 'Saving...' : isEdit ? 'Update' : 'Create'}
          </Button>
          <Button type="button" variant="ghost" onClick={() => navigate('/admin/testimonials')}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
