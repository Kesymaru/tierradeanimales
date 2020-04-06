export interface Contact {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface Newsletter {
  email: string;
}

export interface NewsletterState {
  newsletters: Array<string>;
}

export default NewsletterState;
