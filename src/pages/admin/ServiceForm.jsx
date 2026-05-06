import { useParams } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import { adminGetServices, adminCreateService, adminUpdateService } from '../../lib/api';
import ContentForm from '../../components/admin/ContentForm';

export default function ServiceForm() {
  const { id } = useParams();
  const isEdit = !!id;

  const { data, loading } = useApi(
    () => isEdit ? adminGetServices().then((d) => {
      const list = d?.services || d || [];
      return list.find((s) => s.id === id);
    }) : Promise.resolve(null),
    [id]
  );

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-charcoal">
        {isEdit ? 'Edit Service' : 'New Service'}
      </h1>
      <ContentForm
        type="services"
        initialData={isEdit ? data : null}
        loading={isEdit && loading}
        onSubmit={(payload) => isEdit ? adminUpdateService(id, payload) : adminCreateService(payload)}
      />
    </div>
  );
}
