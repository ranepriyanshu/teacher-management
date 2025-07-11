export type Availability = Record<string /* "Mon‑08" */, boolean>; // true = busy


export type Qualification = {
  name: string;
  rate: number;
};

export type Teacher = {
  id: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  address: string;
  avatar?: string;   
  qualifications: Qualification[];
  availability?: Availability; // optional
};
