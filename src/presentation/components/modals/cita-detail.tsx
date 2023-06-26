import Modal from 'react-modal';
import modalConfig from '@/presentation/components/modal';
import { Cita } from '@/domain/entities/cita/cita.entity';
import { HistoryCita } from '@/domain/entities/cita/history.cita.entity';
import { GlobalFunctions } from '@/infrastructure/utils/global.functions';

const CitaDetail = ({
  modalIsOpen,
  closeModal,
  cita,
  historyCita
}: {
  modalIsOpen: boolean;
  closeModal: () => void;
  cita: Cita;
  historyCita: HistoryCita[];
}) => {
  const EnumProperties: any = {
    userId: 'Usuario',
    confirm: 'Confirmada',
    status: 'Estatus',
    name: 'Nombre',
    country: 'Nacionalidad',
    email: 'Correo',
    phoneNumber: 'Teléfono',
    reason: 'Razón',
    startDate: 'Fecha inicial',
    endDate: 'Fecha final',
    type: 'Tipo',
    createdAt: 'Creado',
    updatedAt: 'Actualizado'
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={modalConfig}
      contentLabel="Cita Modal"
      ariaHideApp={false}
    >
      <div className="flex flex-col lg:flex-row justify-center mt-5">
        <div className="w-full lg:w-1/2 max-w-md bg-white shadow-lg rounded-lg lg:mr-4 mb-4 lg:mb-0">
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">{cita.name}</h2>
            <p className="text-gray-700 mb-2">
              <span className="font-bold">Email:</span> {cita.email}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-bold">Teléfono:</span> {cita.phoneNumber}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-bold">Motivo:</span> {cita.reason}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-bold">Nacionalidad:</span>{' '}
              {cita.country || 'Sin asignar'}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-bold">Fecha de inicio:</span>{' '}
              {GlobalFunctions.localDate(cita.startDate)}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-bold">Fecha de fin:</span>{' '}
              {GlobalFunctions.localDate(cita.endDate)}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-bold">Tipo:</span>{' '}
              {cita.type == 'demand' ? 'demanda' : cita.type}
            </p>
            {cita.confirm ? (
              <p className="text-gray-700 mb-2">
                <span className="font-bold">Fecha Confirmada:</span>{' '}
                {GlobalFunctions.localDate(cita.confirm)}
              </p>
            ) : (
              <></>
            )}
            <p className="text-gray-700 mb-2">
              <span className="font-bold">Creado el:</span>{' '}
              {GlobalFunctions.localDate(cita.createdAt)}
            </p>
            <p className="text-gray-700">
              <span className="font-bold">Actualizado el:</span>{' '}
              {GlobalFunctions.localDate(cita.updatedAt)}
            </p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 max-w-md bg-white shadow-lg rounded-lg">
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Historial de Cambios</h2>
            {historyCita.map((history, index) => (
              <div key={index} className="border-b py-2">
                <p className="text-gray-700 mb-2">
                  <span className="font-bold">Autor:</span> {history.author}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-bold">Cambios:</span>
                </p>
                <ul className="list-disc pl-4 mb-2">
                  {Object.entries(history.changes).map(
                    ([property, change]: any[], i) => (
                      <li key={i}>
                        <span className="font-bold">
                          {EnumProperties[property]}:
                        </span>{' '}
                        {property == 'status'
                          ? (
                              {
                                pending: 'PENDIENTE',
                                finish: 'FINALIZADA',
                                rejected: 'RECHAZADA'
                              } as any
                            )[change]
                          : [
                              'startDate',
                              'endDate',
                              'createdAt',
                              'updatedAt',
                              'confirm'
                            ].includes(property)
                          ? GlobalFunctions.localDate(change)
                          : change || 'Sin asignación'}
                      </li>
                    )
                  )}
                </ul>
                <p className="text-gray-700 mb-2">
                  <span className="font-bold">Formulario ID:</span>{' '}
                  {history.formId}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-bold">Creado el:</span>{' '}
                  {GlobalFunctions.localDate(history.createdAt)}
                </p>
                <p className="text-gray-700">
                  <span className="font-bold">Actualizado el:</span>{' '}
                  {GlobalFunctions.localDate(history.updatedAt)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end p-4">
        <button
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
          onClick={closeModal}
        >
          Cerrar
        </button>
      </div>
    </Modal>
  );
};

export default CitaDetail;
