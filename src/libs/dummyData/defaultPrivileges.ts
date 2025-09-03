export const defaultPrivileges = [
  {
    name: "ADMIN",
    description: "Full system access with all permissions including user management, product management, order management, and system configuration."
  },
  {
    name: "ORDER_PROCESSOR",
    description: "Can process orders, manage inventory, and handle customer interactions. Limited access to system settings."
  },
  {
    name: "CUSTOMER",
    description: "Can place orders, view products, and manage their own profile. No access to administrative functions."
  },
  {
    name: "EMPLOYEE",
    description: "Basic access for general employees. Can view products and assist with basic operations."
  }
];
