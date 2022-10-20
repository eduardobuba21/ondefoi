import { ReactNode } from 'react';
// rhf
import { FormProvider, UseFormReturn } from 'react-hook-form';

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
  methods: UseFormReturn<any>;
};

export default function RHFProvider({ children, methods }: Props) {
  return <FormProvider {...methods}>{children}</FormProvider>;
}
