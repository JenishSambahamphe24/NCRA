export type TFiscalYear = {
  id?: number;
  yearNepali: string;
  yearEnglish: string;
  activeFiscalYear: boolean;
  index?: number;
  createdBy?: string;
  createdDate?: string;
  updatedBy?: string;
  updatedDate?: string;
};

export type TFiscalYearRequest = {
  yearNepali: string;
  yearEnglish: string;
  activeFiscalYear: boolean;
  index?: number;
};

export type TFiscalYearResponse = TFiscalYear;

export type TUpdateFiscalYearRequest = {
  id: number;
  data: TFiscalYearRequest;
};
