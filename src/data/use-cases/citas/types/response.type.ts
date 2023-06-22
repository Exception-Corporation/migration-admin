import { Cita } from '@/domain/entities/cita/cita.entity';

export type CitaResponse = {
  success: boolean;
  form: Cita;
  itemsByPage: number;
  formSize: number;
  totalForms: number;
  totalCitas: number;
  totalDemands: number;
  totalPages: number;
  page: number;
  forms: Array<Cita>;
};
