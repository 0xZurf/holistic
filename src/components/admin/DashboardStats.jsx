import { formatPrice } from '../../lib/formatters';

const icons = {
  orders: 'M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z',
  revenue: 'M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  products: 'M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z',
  services: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25',
  retreats: 'M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z',
};

function StatCard({ label, value, sublabel, subvalue, icon }) {
  return (
    <div className="bg-card-dark border border-card-border rounded p-6 transition-colors hover:border-gold-border">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-accent uppercase tracking-[0.2em] text-[11px] text-gold-dim">{label}</p>
          <p className="font-display font-light text-cream text-[28px] mt-1.5 leading-none">
            {value}
          </p>
          {sublabel && (
            <p className="font-body text-[11px] text-warm-gray mt-3 uppercase tracking-[0.1em]">
              {sublabel}: <span className="text-sand">{subvalue}</span>
            </p>
          )}
        </div>
        <div
          className="rounded-sm flex items-center justify-center flex-shrink-0"
          style={{
            width: 44,
            height: 44,
            background: 'rgba(201,168,76,0.08)',
            border: '1px solid rgba(201,168,76,0.25)',
          }}
        >
          <svg
            className="w-5 h-5 text-gold"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d={icons[icon]} />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function DashboardStats({ stats }) {
  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
      <StatCard
        label="Total Orders"
        value={stats.totalOrders ?? 0}
        sublabel="This month"
        subvalue={stats.monthlyOrders ?? 0}
        icon="orders"
      />
      <StatCard
        label="Revenue"
        value={formatPrice(stats.totalRevenue ?? 0)}
        sublabel="This month"
        subvalue={formatPrice(stats.monthlyRevenue ?? 0)}
        icon="revenue"
      />
      <StatCard
        label="Active Products"
        value={stats.activeProducts ?? 0}
        icon="products"
      />
      <StatCard
        label="Active Services"
        value={stats.activeServices ?? 0}
        sublabel="Active retreats"
        subvalue={stats.activeRetreats ?? 0}
        icon="services"
      />
    </div>
  );
}
