export interface Permissions {}

export interface Role {
  name: string;
  permissions: Permissions;
}

export default Role;