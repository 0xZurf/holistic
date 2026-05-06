import Textarea from '../ui/Textarea';

export default function RichTextEditor({ label = 'Body', value, onChange, className = '' }) {
  return (
    <Textarea
      label={label}
      value={value}
      onChange={onChange}
      rows={10}
      placeholder="Write content here... (HTML supported)"
      className={className}
    />
  );
}
