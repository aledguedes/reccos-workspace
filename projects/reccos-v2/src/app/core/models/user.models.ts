export interface IFederation {
  id: number;
  name: string;
  description: string;
  logo: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  avatar?: string;
  federation: IFederation;
  createdAt: string | Date;
  updatedAt: string | Date;
  description: string;
  location: string;
  phone: string;
}
