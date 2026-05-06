import LoadingSpinner from '../ui/LoadingSpinner';

export default function DataTable({ columns, rows, loading, emptyMessage = 'No items found.', onRowClick }) {
  if (loading) {
    return <LoadingSpinner className="py-12" />;
  }

  if (!rows?.length) {
    return (
      <div className="bg-white rounded-2xl border border-sand p-12 text-center">
        <p className="text-charcoal/40">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-sand overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-sand bg-cream/50">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 text-left font-medium text-charcoal/50 uppercase tracking-wider text-xs ${col.className || ''}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-sand/50">
            {rows.map((row, i) => (
              <tr
                key={row.id || i}
                onClick={() => onRowClick?.(row)}
                className={`transition-colors ${onRowClick ? 'cursor-pointer hover:bg-cream/50' : ''}`}
              >
                {columns.map((col) => (
                  <td key={col.key} className={`px-4 py-3 ${col.cellClass || ''}`}>
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
