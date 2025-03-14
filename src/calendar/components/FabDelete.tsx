import { useCalendarStore } from "@/common/hooks"



export const FabDelete = () => {

  const { startDeletingEvent } = useCalendarStore()


  const handleClickModal = () => {
    startDeletingEvent()
  }

  return (
    <button
      className="btn btn-danger fab-delete"
      onClick={handleClickModal}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  )
}