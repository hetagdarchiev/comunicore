import { MdEdit } from 'react-icons/md';

import {
  Button,
  Checkbox,
  Input,
  Label,
  Loader,
  ProfileAvatar,
} from '@/shared/ui';

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center gap-2 px-2.5 py-2.5'>
      <Button className='gap-x-2.5'>
        <MdEdit size={24} />
        Редактировать
      </Button>
      <Button color='ghost' className='gap-x-2.5'>
        <MdEdit size={24} />
        Редактировать
      </Button>
      <Label className='gap-x-2.5' htmlFor='email'>
        Введите почту
        <Input id='email' placeholder='Введите почту' />
      </Label>
      <Checkbox id='Agree'>
        Я согласен на обработку персональных данных
      </Checkbox>
      Loader:
      <Loader id='loader' />
      <ProfileAvatar authorName='Anonymous' />
    </div>
  );
}
