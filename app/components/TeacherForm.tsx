import { useState, useEffect } from 'react';
import Input from './shared/Input';
import Button from './shared/Button';
import { Teacher } from '../types/teacher';
import { useRouter } from 'next/router';
import { v4 as uuid } from 'uuid';

type Props = {
  initial?: Teacher;
  onSubmit: (teacher: Teacher) => void;
};

export default function TeacherForm({ initial, onSubmit }: Props) {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    if (initial) {
      setName(initial.name);
      setEmail(initial.email);
      setPhone(initial.phone);
      setDob(initial.dob);
      setAddress(initial.address);
      setAvatar(initial.avatar || '');
    }
  }, [initial]);

  const handleSubmit = () => {
    if (!name || !email || !phone || !dob || !address) {
      alert('Please fill all required fields');
      return;
    }

    const newTeacher: Teacher = {
      id: initial?.id || uuid(),
      name,
      email,
      phone,
      dob,
      address,
      avatar: avatar || '/avatar-placeholder.png',
      qualifications: initial?.qualifications || [],
      availability: initial?.availability || {},
    };

    onSubmit(newTeacher);
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow space-y-4">
      <Input label="Name" value={name} onChange={setName} required />
      <Input label="Email" value={email} onChange={setEmail} type="email" required />
      <Input label="Phone" value={phone} onChange={setPhone} required />
      <Input label="Date of Birth" value={dob} onChange={setDob} type="date" required />
      <Input label="Address" value={address} onChange={setAddress} required />
      <Input label="Avatar URL" value={avatar} onChange={setAvatar} placeholder="Optional avatar image link" />

      <div className="flex justify-end">
        <Button onClick={handleSubmit}>
          {initial ? 'Update Teacher' : 'Add Teacher'}
        </Button>
      </div>
    </div>
  );
}
