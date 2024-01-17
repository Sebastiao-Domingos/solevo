import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { HTMLAttributes } from 'react';


interface RegisterProps extends HTMLAttributes<HTMLFormElement> {
    btnText : string
    title : string
}

export const EditModal =  ({ btnText,title, children}:RegisterProps) => (
  <AlertDialog.Root>
  <AlertDialog.Trigger className=''> <i className="ri-edit-line text-green-500 text-xl"></i> {btnText}</AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className='fixed inset-0 bg-black/40' />
      <AlertDialog.Content className='fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[500px] min-h-[400px] max-h-[80vh] rounded shadow bg-white p-6'>
        <AlertDialog.Title className='text-xl text-amber-600' >{title}</AlertDialog.Title>
          <div className='mt-6'>
              {children}
          </div>
        <AlertDialog.Cancel className='absolute top-6 right-6'> <i className='ri-close-line text-xl hover:text-red-500'></i></AlertDialog.Cancel>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);