import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { HTMLAttributes } from 'react';


interface RegisterProps extends HTMLAttributes<HTMLFormElement> {
    btnText : string
    btnIcon : string
    title : string
}

export const RegisterModal =  ({btnIcon, btnText,title, children}:RegisterProps) => (
  <AlertDialog.Root>
  <AlertDialog.Trigger className='py-2 px-4 rounded shadow bg-amber-400 /text-white space-x-4 hover:bg-amber-600/75 active:bg-amber-600/50'> <i className={btnIcon}></i> {btnText}</AlertDialog.Trigger>
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