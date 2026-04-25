export const ENDPOINTS = {
  AUTH: {
    ADMIN: {
      REGISTER: '/admin/register',
      LOGIN: '/admin/login',
      ME: '/admin/me',
      LOGOUT: '/admin/logout',
    },
    CUSTOMER: {
      REGISTER: '/customer/register',
      LOGIN: '/customer/login',
      ME: '/customer/me',
      LOGOUT: '/customer/logout',
    },
  },
  DASHBOARD: {
    USERS: {
      ROOT: '/admin/users',
      byId: (userId: number) => `/admin/users/${userId}`,
    },
    CARS: {
      ROOT: '/admin/cars',
      byId: (carId: number) => `/admin/cars/${carId}`,
    },
    ORDERS: {
      ROOT: '/admin/orders',
      byId: (orderId: number) => `/admin/orders/${orderId}`,
    },
  },
  ADMIN: {
    USERS: {
      ROOT: '/admin/users',
      byId: (userId: number) => `/admin/users/${userId}`,
    },
    CARS: {
      ROOT: '/admin/cars',
      byId: (carId: number) => `/admin/cars/${carId}`,
    },
    ORDERS: {
      ROOT: '/admin/orders',
      byId: (orderId: number) => `/admin/orders/${orderId}`,
    },
  },
  CUSTOMER: {
    CARS: {
      ROOT: '/customer/cars',
      byId: (carId: number) => `/customer/cars/${carId}`,
    },
    ORDERS: {
      ROOT: '/customer/orders',
      byId: (orderId: number) => `/customer/orders/${orderId}`,
    },
    INSTALLMENTS: {
      ROOT: '/customer/installments',
      byId: (installmentId: number) => `/customer/installments/${installmentId}`,
      pay: (installmentId: number) => `/customer/installments/${installmentId}/pay`,
    },
  },
};
