import LoadingSpinner from '../ui/LoadingSpinner';

export default function DataTable({
  columns,
  rows,
  loading,
  emptyMessage = 'No items found.',
  onRowClick,
}) {
  if (loading) {
    return <LoadingSpinner className="py-12" />;
  }

  if (!rows?.length) {
    return (
      <div className="bg-card-dark border border-card-border rounded p-12 text-center">
        <p className="font-body text-warm-gray m-0">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="bg-card-dark border border-card-border rounded overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-obsidian border-b border-card-border">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 text-left font-accent uppercase tracking-[0.2em] text-[11px] text-gold-dim ${col.className || ''}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-card-border">
            {rows.map((row, i) => (
              <tr
                key={row.id || i}
                onClick={() => onRowClick?.(row)}
                className={`transition-colors ${
                  onRowClick ? 'cursor-pointer hover:bg-obsidian/60' : ''
                }`}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-4 py-3 font-body text-sand ${col.cellClass || ''}`}
                  >
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
