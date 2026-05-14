import { formatPrice, formatDate } from '../../lib/formatters';
import Badge from '../ui/Badge';

const statusVariants = {
  pending: 'gold',
  paid: 'gold',
  fulfilled: 'gold',
  cancelled: 'muted',
};

export default function OrderDetail({ order }) {
  if (!order) return null;

  const items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items || [];
  const address =
    typeof order.shipping_address === 'string'
      ? JSON.parse(order.shipping_address)
      : order.shipping_address;

  return (
    <div className="space-y-6 text-cream">
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant={statusVariants[order.status] || 'muted'}>{order.status}</Badge>
        <span className="font-body text-sm text-warm-gray">{formatDate(order.created_at)}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-accent uppercase tracking-[0.2em] text-[11px] text-gold-dim mb-2">
            Customer
          </h4>
          <p className="font-body text-cream">{order.customer_name || 'N/A'}</p>
          <p className="font-body text-sm text-warm-gray">{order.customer_email || 'N/A'}</p>
        </div>
        {address && (
          <div>
            <h4 className="font-accent uppercase tracking-[0.2em] text-[11px] text-gold-dim mb-2">
              Shipping Address
            </h4>
            <p className="font-body text-sm text-sand whitespace-pre-line">
              {[
                address.line1,
                address.line2,
                `${address.city}, ${address.state} ${address.postal_code}`,
                address.country,
              ]
                .filter(Boolean)
                .join('\n')}
            </p>
          </div>
        )}
      </div>

      <div>
        <h4 className="font-accent uppercase tracking-[0.2em] text-[11px] text-gold-dim mb-3">
          Items
        </h4>
        <div className="border border-card-border rounded overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-obsidian border-b border-card-border">
                <th className="px-4 py-2 text-left font-accent uppercase tracking-[0.2em] text-[11px] text-gold-dim">
                  Item
                </th>
                <th className="px-4 py-2 text-right font-accent uppercase tracking-[0.2em] text-[11px] text-gold-dim">
                  Qty
                </th>
                <th className="px-4 py-2 text-right font-accent uppercase tracking-[0.2em] text-[11px] text-gold-dim">
                  Price
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-card-border">
              {items.map((item, i) => (
                <tr key={i}>
                  <td className="px-4 py-3 font-body text-cream">{item.title}</td>
                  <td className="px-4 py-3 text-right font-body text-sand">{item.qty || 1}</td>
                  <td className="px-4 py-3 text-right font-body text-gold">
                    {formatPrice(item.price)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-3">
          <p className="font-display font-light text-cream text-lg">
            Total: <span className="text-gold">{formatPrice(order.total)}</span>
          </p>
        </div>
      </div>

      {order.notes && (
        <div>
          <h4 className="font-accent uppercase tracking-[0.2em] text-[11px] text-gold-dim mb-2">
            Notes
          </h4>
          <p className="font-body text-sm text-sand bg-obsidian/60 border border-card-border rounded-sm p-4">
            {order.notes}
          </p>
        </div>
      )}

      {order.stripe_payment_intent && (
        <div>
          <h4 className="font-accent uppercase tracking-[0.2em] text-[11px] text-gold-dim mb-1">
            Stripe Payment Intent
          </h4>
          <p className="font-mono text-xs text-warm-gray break-all">
            {order.stripe_payment_intent}
          </p>
        </div>
      )}
    </div>
  );
}
