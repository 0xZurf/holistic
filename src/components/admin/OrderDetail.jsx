import { formatPrice, formatDate } from '../../lib/formatters';
import Badge from '../ui/Badge';

const statusVariants = {
  pending: 'clay',
  paid: 'sage',
  fulfilled: 'earth',
  cancelled: 'charcoal',
};

export default function OrderDetail({ order }) {
  if (!order) return null;

  const items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items || [];
  const address = typeof order.shipping_address === 'string'
    ? JSON.parse(order.shipping_address)
    : order.shipping_address;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant={statusVariants[order.status] || 'charcoal'}>
          {order.status}
        </Badge>
        <span className="text-sm text-charcoal/50">
          {formatDate(order.created_at)}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium text-charcoal/50 mb-2">Customer</h4>
          <p className="text-charcoal font-medium">{order.customer_name || 'N/A'}</p>
          <p className="text-sm text-charcoal/60">{order.customer_email || 'N/A'}</p>
        </div>
        {address && (
          <div>
            <h4 className="text-sm font-medium text-charcoal/50 mb-2">Shipping Address</h4>
            <p className="text-sm text-charcoal/70 whitespace-pre-line">
              {[address.line1, address.line2, `${address.city}, ${address.state} ${address.postal_code}`, address.country]
                .filter(Boolean)
                .join('\n')}
            </p>
          </div>
        )}
      </div>

      <div>
        <h4 className="text-sm font-medium text-charcoal/50 mb-3">Items</h4>
        <div className="border border-sand rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-cream/50 border-b border-sand">
                <th className="px-4 py-2 text-left text-xs font-medium text-charcoal/50 uppercase">Item</th>
                <th className="px-4 py-2 text-right text-xs font-medium text-charcoal/50 uppercase">Qty</th>
                <th className="px-4 py-2 text-right text-xs font-medium text-charcoal/50 uppercase">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand/50">
              {items.map((item, i) => (
                <tr key={i}>
                  <td className="px-4 py-3 text-charcoal">{item.title}</td>
                  <td className="px-4 py-3 text-right text-charcoal/70">{item.qty || 1}</td>
                  <td className="px-4 py-3 text-right text-charcoal">{formatPrice(item.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-3">
          <p className="text-lg font-display font-bold text-charcoal">
            Total: {formatPrice(order.total)}
          </p>
        </div>
      </div>

      {order.notes && (
        <div>
          <h4 className="text-sm font-medium text-charcoal/50 mb-2">Notes</h4>
          <p className="text-sm text-charcoal/70 bg-cream/50 rounded-xl p-4">{order.notes}</p>
        </div>
      )}

      {order.stripe_payment_intent && (
        <div>
          <h4 className="text-sm font-medium text-charcoal/50 mb-1">Stripe Payment Intent</h4>
          <p className="text-xs text-charcoal/40 font-mono">{order.stripe_payment_intent}</p>
        </div>
      )}
    </div>
  );
}
