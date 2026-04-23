# phase 1
the postman json doc is in ./Car_Rental_API.postman_collection.json
the requirement doc is in ./Car_Rental_Frontend_Task (2).pdf

the project structure is as:
src/
  core/
    api/
      api-client.ts 
      base-api-service.ts - all api services inherit it
      endpoints.ts
    guards/
    interceptors/
  domains/
    customer/
      auth/
      cars/
        api/
          cars.api.ts
          cars.dto.ts
        components/
        pages/
        services/
          cars.service.ts
          car.mapper.ts
      installments/
      orders/
    dashboard/
      auth/
      cars/
      orders/
      users/
  public/
    pages/
      login/ 2 login forms (admin/customer)
      register/ 2 register forms (admin/customer)  

todo: 
1 read types from the postman json and create services with types for features