import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Select from '../ui/Select';
import Button from '../ui/Button';
import ImageUploader from './ImageUploader';
import RichTextEditor from './RichTextEditor';
import LoadingSpinner from '../ui/LoadingSpinner';
import { slugify } from '../../lib/formatters';

export default function ContentForm({ type, initialData, onSubmit, loading }) {
  const navigate = useNavigate();
  const isEdit = !!initialData;

  const [form, setForm] = useState({
    title: '',
    slug: '',
    description: '',
    body: '',
    image_url: '',
    price: '',
    is_active: 1,
    sort_order: 0,
    ...getTypeDefaults(type),
  });
  const [autoSlug, setAutoSlug] = useState(!isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        price: initialData.price != null ? (initialData.price / 100).toFixed(2) : '',
        compare_at_price:
          initialData.compare_at_price != null
            ? (initialData.compare_at_price / 100).toFixed(2)
            : '',
      });
    }
  }, [initialData]);

  function set(field, value) {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === 'title' && autoSlug) {
        next.slug = slugify(value);
      }
      return next;
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = {
        ...form,
        price: Math.round(parseFloat(form.price || 0) * 100),
        sort_order: parseInt(form.sort_order) || 0,
        is_active: form.is_active ? 1 : 0,
      };
      if (type === 'products' && form.compare_at_price) {
        payload.compare_at_price = Math.round(parseFloat(form.compare_at_price) * 100);
      }
      if (type === 'retreats') {
        payload.capacity = parseInt(form.capacity) || 0;
        payload.spots_remaining = parseInt(form.spots_remaining) || payload.capacity;
      }
      if (type === 'products') {
        payload.inventory_count = parseInt(form.inventory_count) || 0;
      }
      await onSubmit(payload);
      navigate(`/admin/${type}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <LoadingSpinner className="py-12" />;

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      {error && (
        <div className="bg-card-dark border border-red-500/40 text-red-300 rounded-sm px-4 py-3 font-body text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Title"
          value={form.title}
          onChange={(e) => set('title', e.target.value)}
          required
        />
        <Input
          label="Slug"
          value={form.slug}
          onChange={(e) => {
            setAutoSlug(false);
            set('slug', e.target.value);
          }}
          required
        />
      </div>

      <Textarea
        label="Short Description"
        value={form.description}
        onChange={(e) => set('description', e.target.value)}
        rows={3}
        required
      />

      <RichTextEditor
        label="Body"
        value={form.body}
        onChange={(e) => set('body', e.target.value)}
      />

      <ImageUploader
        label="Image"
        value={form.image_url}
        onChange={(url) => set('image_url', url)}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="Price ($)"
          type="number"
          step="0.01"
          min="0"
          value={form.price}
          onChange={(e) => set('price', e.target.value)}
          required
        />
        {type === 'services' && (
          <>
            <Input
              label="Price Label"
              value={form.price_label || ''}
              onChange={(e) => set('price_label', e.target.value)}
              placeholder="e.g. Starting at $150/session"
            />
            <Input
              label="Duration"
              value={form.duration || ''}
              onChange={(e) => set('duration', e.target.value)}
              placeholder="e.g. 60 minutes"
            />
          </>
        )}
        {type === 'products' && (
          <>
            <Input
              label="Compare at Price ($)"
              type="number"
              step="0.01"
              min="0"
              value={form.compare_at_price || ''}
              onChange={(e) => set('compare_at_price', e.target.value)}
            />
            <Input
              label="Inventory"
              type="number"
              min="0"
              value={form.inventory_count ?? ''}
              onChange={(e) => set('inventory_count', e.target.value)}
            />
          </>
        )}
        {type === 'retreats' && (
          <>
            <Input
              label="Capacity"
              type="number"
              min="0"
              value={form.capacity ?? ''}
              onChange={(e) => set('capacity', e.target.value)}
            />
            <Input
              label="Spots Remaining"
              type="number"
              min="0"
              value={form.spots_remaining ?? ''}
              onChange={(e) => set('spots_remaining', e.target.value)}
            />
          </>
        )}
      </div>

      {type === 'services' && (
        <Select
          label="Category"
          value={form.category}
          onChange={(e) => set('category', e.target.value)}
          options={[
            { value: 'nutrition', label: 'Nutrition' },
            { value: 'energy-healing', label: 'Energy Healing' },
            { value: 'life-coaching', label: 'Life Coaching' },
            { value: 'meditation', label: 'Meditation' },
          ]}
          placeholder="Select category"
        />
      )}

      {type === 'products' && (
        <Select
          label="Category"
          value={form.category}
          onChange={(e) => set('category', e.target.value)}
          options={[
            { value: 'supplements', label: 'Supplements' },
            { value: 'teas', label: 'Teas' },
            { value: 'skincare', label: 'Skincare' },
            { value: 'tools', label: 'Tools' },
          ]}
          placeholder="Select category"
        />
      )}

      {type === 'retreats' && (
        <>
          <Input
            label="Location"
            value={form.location || ''}
            onChange={(e) => set('location', e.target.value)}
            placeholder="e.g. Sedona, AZ"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Start Date"
              type="date"
              value={form.start_date || ''}
              onChange={(e) => set('start_date', e.target.value)}
            />
            <Input
              label="End Date"
              type="date"
              value={form.end_date || ''}
              onChange={(e) => set('end_date', e.target.value)}
            />
          </div>
        </>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Sort Order"
          type="number"
          value={form.sort_order}
          onChange={(e) => set('sort_order', e.target.value)}
        />
        <div className="flex items-end pb-1">
          <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
            <input
              type="checkbox"
              checked={!!form.is_active}
              onChange={(e) => set('is_active', e.target.checked ? 1 : 0)}
              className="w-5 h-5 rounded-sm accent-gold border border-card-border bg-card-dark"
            />
            <span className="font-body text-sm text-sand">Active (visible on site)</span>
          </label>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-card-border">
        <Button type="submit" disabled={saving}>
          {saving ? 'Saving...' : isEdit ? 'Update' : 'Create'}
        </Button>
        <Button type="button" variant="ghost" onClick={() => navigate(`/admin/${type}`)}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

function getTypeDefaults(type) {
  switch (type) {
    case 'services':
      return { category: '', duration: '', price_label: '' };
    case 'retreats':
      return {
        location: '',
        start_date: '',
        end_date: '',
        capacity: 0,
        spots_remaining: 0,
        gallery: '[]',
      };
    case 'products':
      return { category: '', inventory_count: 0, compare_at_price: '', gallery: '[]' };
    default:
      return {};
  }
}
