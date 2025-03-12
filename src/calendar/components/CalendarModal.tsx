import { FormEvent, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import Modal from "react-modal"
import { registerLocale } from  "react-datepicker";
import { es } from "date-fns/locale";
import { addHours, differenceInMinutes } from "date-fns";
import { toast } from "sonner"

import "react-datepicker/dist/react-datepicker.css";
import { FormValidations, useForm } from "@/common/hooks/useForm";
import { useUiStore } from "@/common/hooks";


registerLocale('es', es)

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};


const formData = {
  title: '',
  notes: '',
  start: new Date(),
  end: addHours(new Date(), 2)
}

type FormData = {
  title: string;
  notes: string;
  start: Date;
  end: Date;
};


const formValidations: FormValidations<FormData> = {
  title: [
    (value: string) => (value.trim() !== "" ? null : "El titulo es obligatorio"),
    (value: string) => (value.trim().length > 2 ? null : "Debe tener al menos 2 caracteres"),
  ],
  end: [
    (value: Date, { start }) => {
      const difference = differenceInMinutes(value, start)
      return isNaN(difference) || difference <= 30 ? "La fecha de finalización debe ser al menos 30 minutos después de empezar" : null
    }
  ]

}

Modal.setAppElement('#root');

// { selectedDate } : { selectedDate: Date }
export const CalendarModal = () => {

  // TODO: crear snippet para useAppSelector
  const { isDateModalOpen, closeDateModal } = useUiStore()

  const [formSubmitted, setFormSubmitted] = useState(false)

  //? Forma del profe Fernando
  // const [formValues, setFormValues] = useState({
  //   title: '',
  //   notes: '',
  //   start: new Date(),
  //   end: addHours(new Date(), 2)
  // })
  // const { end, notes, start, title } = formValues
  //? 

  // formData.start = selectedDate
  
  const { 
    onInputChange, 
    onDateChange, 
    end, 
    notes, 
    start, 
    title, 
    formErrors, 
    onResetForm  
  } = useForm(formData, formValidations)
  

  //? Forma del profe Fernando
  // type ChangingDate = "start" | "end" 
  // const onInputChange = ({ target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   setFormValues({
  //     ...formValues,
  //     [target?.name]: target.value
  //   })
  // }
  // const onDateChange = (event: Date | null, changing: ChangingDate) => {
  //   setFormValues({
  //     ...formValues,
  //     [changing]: event
  //   })
  // }
  //? 

  const titleClass = useMemo(() => {
    if(!formSubmitted) return ''
    return (!formErrors.title) 
          ? ''
          : 'is-invalid'
  }, [formSubmitted, formErrors.title])

  const onCloseModal = () => {
    closeDateModal()
    
  }

  const onSubmitForm = (event: FormEvent) => {
    event.preventDefault()
    setFormSubmitted(true)

    //? Forma del profe Fernando
    // const difference = differenceInSeconds(end, start)    
    // if(isNaN(difference) || difference <= 0) {
    //   console.log('Error en fechas')
    //   return   
    // }
    //? 

    if(formErrors.end) {
      toast.error('Error en las fechas', {
        position: "top-right",
        description: formErrors.end,
        duration: 3500,
        cancel: {
          label: 'X',
          onClick: () => console.log('Cancel!')
        }
      })
      return
    }


    if (formErrors.title){
      toast.error('Error en el título', {
        position: "top-right",
        description: formErrors.title,
        duration: 3500,
        closeButton: true
      })
      return
    } 

    // TODO: 
    // Cerrar el modal
    onCloseModal()
    // Restablecer el form
    onResetForm()
    // Remover errores en pantalla
  }
  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmitForm}>
          <div className="form-group mb-2 d-flex flex-column">
              <label>Fecha y hora inicio</label>
              {/* <input className="form-control" placeholder="Fecha inicio" /> */}
              <DatePicker 
                showIcon
                selected={start}
                locale="es" 
                className="form-control date-input"  
                placeholderText="Fecha inicio" 
                onChange={(event) => onDateChange(event, "start")}
                showTimeSelect 
                dateFormat="Pp"
                timeCaption="Hora"

              />
          </div>
          <div className="form-group mb-2 d-flex flex-column">
              <label>Fecha y hora fin</label>
              {/* <input className="form-control" placeholder="Fecha fin" /> */}
              <DatePicker 
                showIcon
                selected={end}
                minDate={start}
                locale="es" 
                className="form-control date-input" 
                placeholderText="Fecha fin" 
                onChange={(event) => onDateChange(event, "end")}
                showTimeSelect 
                dateFormat="Pp"
                timeCaption="Hora"
              />
          </div>
          <hr />
          <div className="form-group mb-2">
              <label>Titulo y notas</label>
              <input 
                  type="text" 
                  className={`form-control ${titleClass}`.trim()}
                  placeholder="Título del evento"
                  name="title"
                  autoComplete="off"
                  value={title}
                  onChange={onInputChange}
              />
              <div className="d-flex flex-column">                        
                {
                  !!formErrors.title && formSubmitted
                  ? <small id="titleError" className="form-text text-danger">{formErrors.title}</small>
                  : <small id="titleHelp" className="form-text text-muted">Una descripción corta</small>
                }
              </div>
          </div>
          <div className="form-group mb-2">
              <textarea 
                  className="form-control"
                  placeholder="Notas"
                  rows={5}
                  name="notes"
                  value={notes}
                  onChange={onInputChange}
              ></textarea>
              <small id="emailHelp" className="form-text text-muted">Información adicional</small>
          </div>
          <button
              type="submit"
              className="btn btn-outline-primary btn-block"
          >
              <i className="far fa-save"></i>
              <span> Guardar</span>
          </button>
      </form>
    </Modal>
  )
}