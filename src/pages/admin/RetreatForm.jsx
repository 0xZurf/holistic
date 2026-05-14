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
      <h1
        className="font-display font-light text-cream m-0"
        style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', letterSpacing: '-0.01em' }}
      >
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
