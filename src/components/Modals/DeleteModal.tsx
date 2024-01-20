import * as AlertDialog from '@radix-ui/react-alert-dialog';
import StateComponent, { StatesType } from '../State/StateComponent';


interface RegisterProps {
    status : StatesType
    handleDelete :()=> void
}

export const DeleteModal =  ({status, handleDelete}:RegisterProps) => (
  <AlertDialog.Root>
  <AlertDialog.Trigger className=''> <i className="ri-delete-bin-line text-red-500"></i></AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className='fixed inset-0 bg-black/40' />
      <AlertDialog.Content className='fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[500px] h-[200px] max-h-[80vh] rounded shadow bg-white p-6'>
        <div className='relative'>
            <AlertDialog.Title className='text-xl text-red-600 text-center border-b-2 pb-4 border-red-400' >Pretendes eliminar este item?</AlertDialog.Title>
            <div className='absolute top-11 right-6'>
                <StateComponent 
                    states={status}
                />
            </div>
        </div>
          <div className='mt-6 flex justify-center'>
                <div className='flex gap-8 items-center mt-6'>
                    <AlertDialog.Cancel className='rounded py-3 px-8 border border-red-500 text-red-500'> Não</AlertDialog.Cancel>
                    <button onClick={ handleDelete} className='rounded py-3 px-8 border bg-red-500 text-white'>Sim</button>
                </div>
          </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);