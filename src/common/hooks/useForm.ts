import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'

type ChangingDate = "start" | "end" 

// type FormValidations<T> = {
//   [K in keyof T]?: ((value: T[K]) => string | null)[];
// };

export type FormValidations<T> = {
  [K in keyof T]?: ((value: T[K], formState: Omit<T, K>) => string | null)[];
};

export const useForm = <
  T extends object
  >(
    initialForm: T, 
    formValidations?: FormValidations<T>
  ) => {
  const [formState, setFormState] = useState<T>(initialForm)
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof T, string | null>>>({});
  const [debouncedFormState, setDebouncedFormState] = useState<T>(initialForm);

  const isFormValid = useMemo( () => {
    for (const formValue of Object.keys(formErrors)) {
      if(formErrors[formValue as keyof T] !== null) return false
    }
    return true
  }, [formErrors])

  const createValidations = useCallback(() => {
    
    const formCheckedValues: Partial<Record<keyof T, string | null>> = {};
    
    if(formValidations){
      for (const formField of Object.keys(formValidations)) {
        const fieldValidations = formValidations[formField as keyof T]
        const { [formField as keyof T]: _field, ...omittedFormState } = formState;

        const errorMessage = fieldValidations
                            ?.map( fn => fn(formState[formField as keyof T], omittedFormState))
                            .find( error => error !== null) || null
        if(errorMessage){
          formCheckedValues[formField as keyof T] = errorMessage
        } else {
          formCheckedValues[formField as keyof T] = null
        }                                                     
      }
    } 

    setFormErrors(formCheckedValues)
  }, [formValidations, formState])

  useEffect( () => {
    createValidations()
  }, [createValidations])

  useEffect(() => {
    setFormState(initialForm)
  }, [initialForm])


  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFormState(formState);
    }, 500)

    return () => {
      clearTimeout(handler);
    };
  }, [formState]);

  const onInputChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const input = event.target;
    const { value, name } = input;
    setFormState(prev => ({
      ...prev,
        [name]: value
    }))
  }, [])

  const onDateChange = (event: Date | null, changing: ChangingDate) => {
    setFormState({
      ...formState,
      [changing]: event
    })
  }
  
  
  const onResetForm = () => {
    setFormState(initialForm)
    setFormErrors({});
  }

  
  return {
    ...formState,
    formState,
    onInputChange,
    onDateChange,
    onResetForm,
    formErrors,
    isFormValid,
    debouncedFormState,
    setFormState
  }
}