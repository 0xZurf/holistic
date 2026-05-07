import { useToast } from './Toast';

export function useCartToast() {
  const addToast = useToast();
  return (title) => addToast(`${title} added to cart`, 'success', 2500);
}
