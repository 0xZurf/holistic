import { formatPrice } from '../../lib/formatters';
import useCart from '../../hooks/useCart';

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-4 bg-card-dark border border-card-border rounded p-4">
      <div
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-sm overflow-hidden flex-shrink-0 border border-card-border"
        style={{
          background:
            'linear-gradient(135deg, #2a2520 0%, #1a1814 50%, #1a1814 100%)',
        }}
      >
        {item.image_url && (
          <img
            src={item.image_url}
            alt={item.title}
            className="w-full h-full object-cover opacity-90"
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-display font-medium text-cream text-lg truncate m-0">
          {item.title}
        </h3>
        <p className="font-body text-sm text-gold mt-1">{formatPrice(item.price)}</p>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center border border-card-border rounded-sm">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="px-3 py-1.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-sand hover:text-gold transition-colors font-body"
              aria-label="Decrease quantity"
            >
              –
            </button>
            <span className="px-3 font-body text-sm text-cream">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="px-3 py-1.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-sand hover:text-gold transition-colors font-body"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <button
            onClick={() => removeItem(item.id)}
            className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-warm-gray hover:text-gold transition-colors"
            aria-label={`Remove ${item.title}`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
