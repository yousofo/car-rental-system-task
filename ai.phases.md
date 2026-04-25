# phase 1

## Context
- API Base URL: `https://task.abudiyab-soft.com/api`
- Postman collection doc: `./Car_Rental_API.postman_collection.json`
- Requirement doc: `./Car_Rental_Frontend_Task (2).pdf`

## Test Accounts
| Role    | Email               | Password |
|---------|---------------------|----------|
| Admin   | admin@admin.com     | password |
| Customer| customer@customer.com| password |

## Project Structure
```
src/
  core/
    api/
      api-client.ts
      base-api-service.ts - all api services inherit it
      endpoints.ts
    guards/
    interceptors/
    utils/
    constants/
  shared/
    api-models/
    components/
    models/
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
      routes.ts
    admin/
      auth/
      cars/
      orders/
      users/
      routes.ts
  public/
    pages/
      home/       initial home page
      login/      2 login forms (admin/customer)
      register/   2 register forms (admin/customer)
```

## Requirements
1. Read types from the Postman JSON and create services with types for all features.
2. Use Angular (latest stable version) with standalone components.
3. Use Reactive Forms for all forms.
4. Implement HTTP Interceptors for token handling and error handling.
5. API service layer: all API calls go through `base-api-service.ts`.

---

# phase 2

## Intro
In `src\app\public\pages\home`, an initial home page is added so users can navigate to login or register.

## Routing (Expected)
- Public:
  - `/login`
  - `/register`
- Admin (protected, admin only):
  - `/admin/users`
  - `/admin/cars`
  - `/admin/orders`
- Customer (protected, customer only):
  - `/cars`
  - `/cars/:id`
  - `/orders`
  - `/orders/:id`
  - `/installments`

## Authorization Rules
- **Guest**: can access login/register only.
- **Customer**: browse cars, create orders, view own orders & installments.
- **Admin**: access dashboard only, manage system data (users, cars, orders).

## Requirements
1. The login page should have the 2 login forms (customer/admin) with a modular moving toggler between them.
2. The register page is same as login above (2 register forms with toggler).
3. Handle the login/register roles properly.
4. You will find `layout/` in `dashboard/customer`, each should be a wrapper around the routes and render children.
5. Make a shared header to toggle language (ar/en) and theme mode (light/dark).
6. Admin login -> `/admin` (renders a dashboard component with cards of available sections to navigate to).
7. Customer login -> `/cars` (cars preview).
8. Use Reactive Forms with inline validation messages.
9. Disable submit button if form is invalid.
10. Handle backend validation errors.

---

# phase 3

## Requirements
1. Finish up the login/logout logic + guards + role-protected layouts.
2. Rename the domain `dashboard` into `admin`.
3. Finish up localization for ar/en (RTL support for Arabic).
4. Implement dark mode toggle.

## UI/UX Requirements (Mandatory)
- Responsive design (mobile + desktop).
- Clean, modern UI.
- Loading indicators (spinners / skeletons).
- Error handling:
  - Validation errors
  - Network errors
- Empty states:
  - No data available
  - No results found

---

# phase 3 - errors

1. On customer login and after a successful login, this gets logged in console:
   `auth-service.ts:22 ERROR RuntimeError: NG0100: ExpressionChangedAfterItHasBeenError: Expression has changed after it was checked. Previous value: 'true'. Current value: 'false'. Expression location: _CustomerLoginForm component.`
   Same issue exists for admin in `admin-login-form`.
2. Token interceptor isn't working.

---

# phase 4 - admin dashboard

Protected — Admin login required.

## 1. Users Management (Read Only)
- Features: List users, View user details
- API:
  - `GET /api/admin/users`
  - `GET /api/admin/users/{id}`
- Filters: `search`, `role`, `country`, `per_page`
- Tables Behavior: Server-side pagination, Server-side filtering, Search input

## 2. Cars Management (Full CRUD)
- Fields: `name`, `brand`, `model`, `kilometers`, `price_per_day`
- API:
  - `GET /api/admin/cars`
  - `POST /api/admin/cars`
  - `GET /api/admin/cars/{id}`
  - `PUT /api/admin/cars/{id}`
  - `DELETE /api/admin/cars/{id}`
- Filters: `search`, `brand`, `min_price`, `max_price`, `per_page`
- Tables Behavior: Server-side pagination, Server-side filtering, Search input

## 3. Orders Management
- Features: List orders, View order details, Update payment status
- **Constraints**: Admin cannot create orders. Admin should not delete orders.
- API:
  - `GET /api/admin/orders`
  - `GET /api/admin/orders/{id}`
  - `PUT /api/admin/orders/{id}`
- Filters: `search`, `user_id`, `car_id`, `payment_type`, `payment_status`, `order_type`, `per_page`
- Tables Behavior: Server-side pagination, Server-side filtering, Search input

---

# phase 4 - customer frontend

## 1. Authentication
- API:
  - `POST /api/customer/register`
  - `POST /api/customer/login`
  - `POST /api/customer/logout`
  - `GET /api/customer/me`

## 2. Browse Cars
- Features: List cars, View car details
- API:
  - `GET /api/customer/cars`
  - `GET /api/customer/cars/{id}`
- Filters: `search`, `brand`, `min_price`, `max_price`, `per_page`
- Tables Behavior: Server-side pagination, Server-side filtering, Search input

## 3. Create Order
- Flow:
  1. Select a car
  2. Select delivery date
  3. Select receiving date
  4. System auto-calculates (displayed from backend response):
     - days
     - total price
  5. Choose:
     - Payment type: cash / visa / tamara
     - Order type: full / installments
- API:
  - `POST /api/customer/orders`

## 4. My Orders
- Features: List user orders, View order details
- API:
  - `GET /api/customer/orders`
  - `GET /api/customer/orders/{id}`

## 5. Installments
- Features: View installments, Pay installment
- API:
  - `GET /api/customer/installments`
  - `POST /api/customer/installments/{id}/pay`

## Payment System (Frontend Scope)
- **Important**: Payment is simulated via API only.
- No real payment integration required.
- Just trigger API requests and update UI accordingly.

## Business Logic (Handled by Backend)
The frontend should only display the following (all calculated server-side):
- days
- total_price
- payment_status
- installments

---

# phase 5 - architecture & submission

## Architecture Expectations
- Clean folder structure.
- Reusable components.
- Separation of concerns.
- API service layer.
- Code readability.

## Form Requirements
- Use Reactive Forms.
- Inline validation messages.
- Disable submit button if form is invalid.
- Handle backend validation errors.

## Bonus (Optional)
- Lazy loading modules.
- Shared UI components library.
- Unit tests.
- Deployment (Netlify / Vercel / Firebase).
- Advanced state management (NgRx).

## Submission
Submit a GitHub repository containing:
1. Source code.
2. `README.md` with:
   - Setup steps:
     ```bash
     npm install
     ng serve
     ```
   - Project structure explanation.
   - How to switch language.
   - How to toggle dark mode.

## Evaluation Criteria
- Code quality & structure.
- Reusability.
- UX/UI implementation.
- API integration.
- Error handling.
- Responsiveness.
- Clean Git history.

## Expected Effort
- Estimated time: 1–2 days.
- Focus on: Correctness, Clean implementation, Not pixel-perfect design.
