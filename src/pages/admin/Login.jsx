import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import SolisLogo from '../../components/ui/SolisLogo';
import SacredGeoBg from '../../components/ui/SacredGeoBg';

export default function Login() {
  const { authenticated, checking, login, checkAuth } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!checking && authenticated) {
      navigate('/admin', { replace: true });
    }
  }, [checking, authenticated, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative min-h-screen bg-dark-bg flex items-center justify-center p-4 overflow-hidden">
      <SacredGeoBg opacity={0.03} />
      <div className="relative z-10 w-full max-w-sm bg-card-dark border border-card-border rounded p-10">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <SolisLogo size={44} />
          </div>
          <h1 className="font-accent uppercase tracking-[0.25em] text-[14px] text-gold m-0">
            Solis Imperium
          </h1>
          <p className="font-body text-xs text-warm-gray uppercase tracking-[0.2em] mt-2">
            Admin Portal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-card-dark border border-red-500/40 text-red-300 rounded-sm px-4 py-3 font-body text-sm">
              {error}
            </div>
          )}
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </div>
    </div>
  );
}
