import { useState, useEffect } from 'react';
import useApi from '../../hooks/useApi';
import { getSettings, adminUpdateSettings } from '../../lib/api';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const settingFields = [
  { key: 'brand_name', label: 'Brand Name' },
  { key: 'tagline', label: 'Tagline' },
  { key: 'contact_email', label: 'Contact Email', type: 'email' },
  { key: 'phone', label: 'Phone' },
  { key: 'address', label: 'Address' },
  { key: 'instagram_url', label: 'Instagram URL', type: 'url' },
  { key: 'facebook_url', label: 'Facebook URL', type: 'url' },
];

export default function Settings() {
  const { data, loading } = useApi(getSettings);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (data) {
      const settings = data.settings || data;
      const map = {};
      if (Array.isArray(settings)) {
        settings.forEach((s) => { map[s.key] = s.value; });
      } else {
        Object.assign(map, settings);
      }
      setForm(map);
    }
  }, [data]);

  function set(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      await adminUpdateSettings(form);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <LoadingSpinner className="py-12" />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-charcoal">Settings</h1>
        <p className="text-sm text-charcoal/50 mt-1">Manage your site configuration</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-sage/10 border border-sage/20 text-sage rounded-xl px-4 py-3 text-sm">
            Settings saved successfully.
          </div>
        )}

        {settingFields.map((field) => (
          <Input
            key={field.key}
            label={field.label}
            type={field.type || 'text'}
            value={form[field.key] || ''}
            onChange={(e) => set(field.key, e.target.value)}
          />
        ))}

        <div className="pt-4 border-t border-sand">
          <Button type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </form>
    </div>
  );
}
