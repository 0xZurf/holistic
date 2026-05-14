import { useParams } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import { adminGetProducts, adminCreateProduct, adminUpdateProduct } from '../../lib/api';
import ContentForm from '../../components/admin/ContentForm';

export default function ProductForm() {
  const { id } = useParams();
  const isEdit = !!id;

  const { data, loading } = useApi(
    () => isEdit ? adminGetProducts().then((d) => {
      const list = d?.products || d || [];
      return list.find((p) => p.id === id);
    }) : Promise.resolve(null),
    [id]
  );

  return (
    <div className="space-y-6">
      <h1
        className="font-display font-light text-cream m-0"
        style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', letterSpacing: '-0.01em' }}
      >
        {isEdit ? 'Edit Product' : 'New Product'}
      </h1>
      <ContentForm
        type="products"
        initialData={isEdit ? data : null}
        loading={isEdit && loading}
        onSubmit={(payload) => isEdit ? adminUpdateProduct(id, payload) : adminCreateProduct(payload)}
      />
    </div>
  );
}
