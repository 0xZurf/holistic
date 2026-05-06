import { useParams } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import { adminGetRetreats, adminCreateRetreat, adminUpdateRetreat } from '../../lib/api';
import ContentForm from '../../components/admin/ContentForm';

export default function RetreatForm() {
  const { id } = useParams();
  const isEdit = !!id;

  const { data, loading } = useApi(
    () => isEdit ? adminGetRetreats().then((d) => {
      const list = d?.retreats || d || [];
      return list.find((r) => r.id === id);
    }) : Promise.resolve(null),
    [id]
  );

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-charcoal">
        {isEdit ? 'Edit Retreat' : 'New Retreat'}
      </h1>
      <ContentForm
        type="retreats"
        initialData={isEdit ? data : null}
        loading={isEdit && loading}
        onSubmit={(payload) => isEdit ? adminUpdateRetreat(id, payload) : adminCreateRetreat(payload)}
      />
    </div>
  );
}
