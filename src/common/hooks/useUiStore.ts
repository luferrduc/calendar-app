import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { onCloseDateModal, onOpenDateModal } from "@/store/ui"


export const useUiStore = () => {

  const dispatch = useAppDispatch()
  const { isDateModalOpen } = useAppSelector(state => state.ui)

  const openDateModal = () => {
    dispatch(onOpenDateModal())
  }

  const closeDateModal = () => {
    dispatch(onCloseDateModal())
  } 
  return {
    //* Props
    isDateModalOpen,
    //* Methods
    openDateModal,
    closeDateModal
  }
}