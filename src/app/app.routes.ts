import { Routes } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';
import { AboutusComponent } from './shared/components/aboutus/aboutus.component';
import { UserDashboardComponent } from './features/user/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './features/admin/admin-dashboard/admin-dashboard.component';
import { authGuard } from './cores/guards/auth.guard';
import { ProfileComponent } from './features/user/profile/profile.component';
import { BecomeHostComponent } from './shared/components/become-host/become-host.component';
import { ProviderRegisterComponent } from './features/auth/provider-register/provider-register.component';
import { AddRentalsComponent } from './features/admin/admin-dashboard/add-rentals/add-rentals.component';
import { ManageBookingComponent } from './features/admin/admin-dashboard/manage-booking/manage-booking.component';
import { EarningsComponent } from './features/admin/admin-dashboard/earnings/earnings.component';
import { ManageVehiclesComponent } from './features/admin/admin-dashboard/manage-vehicles/manage-vehicles.component';
import { OurServiceComponent } from './shared/components/our-service/our-service.component';
import { RentalsComponent } from './shared/components/rentals/rentals.component';
import { EditRentalComponent } from './features/admin/admin-dashboard/edit-rental/edit-rental.component';
import { DashboardComponent } from './features/admin/admin-dashboard/dashboard/dashboard.component';
import { AddDriverComponent } from './features/admin/admin-dashboard/add-driver/add-driver.component';
import { ViewDriversComponent } from './features/admin/admin-dashboard/view-drivers/view-drivers.component';
import { BookingSummaryComponent } from './features/user/booking-summary/booking-summary.component';
import { BookingFormComponent } from './features/user/booking-form/booking-form.component';
import { MyBookingComponent } from './features/user/my-booking/my-booking.component';


export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Sidhi rental booking website'
    },
    {
        path: 'aboutus',
        component: AboutusComponent,
        title: 'about us'
    },
    {
        path: 'services',
        component: OurServiceComponent,
        title: 'service page'
    },
    {
        path : 'rentals',
        component: RentalsComponent,
        title: 'rentals page'
    },
    {
        path: 'become-a-host',
        component: BecomeHostComponent,
        title: 'new provider become host'
    },
    {
        path: 'provider-register',
        component: ProviderRegisterComponent
    },
    { 
        path: 'user-dashboard',
        component: UserDashboardComponent, 
         canActivate: [authGuard],
         data: { roles: ['user'] },
     },
     {
        path: 'book-rental/:id',
        component: BookingFormComponent,
        canActivate: [authGuard],
        title: 'book rental page'
     },
     {
        path: 'book-rental-summary',
        component: BookingSummaryComponent,
        canActivate: [authGuard],
        title: 'book rental summary page'
     },
     {
        path: 'bookings',
        component: MyBookingComponent,
        canActivate: [authGuard],
        title: 'my booking page'
     },
     
     
    { 
        path: 'admin-dashboard',
         component: AdminDashboardComponent,
          canActivate: [authGuard], 
        data: { roles: ['admin'] },
        children: [
            {
                path: '',  // This ensures DashboardComponent loads by default
                pathMatch: 'full',
                component: DashboardComponent,
                canActivate: [authGuard]
            },
            {
                path: 'dashboard',
                component: DashboardComponent,
                canActivate: [authGuard],
            },
            { 
                path: 'add-rental',
                component: AddRentalsComponent
            },
            { 
                path: 'add-driver',
                component: AddDriverComponent
            }, 
            {
                path: 'view-drivers',
                component: ViewDriversComponent
            },
    
            { 
                path: 'manage-bookings', 
                component: ManageBookingComponent 
            },
            {
                path: 'manage-vehicals',
                component: ManageVehiclesComponent
            },
            {
                path: 'edit-rental/:id',
                component: EditRentalComponent
            },
            { 
                path: 'earnings', 
                component: EarningsComponent
            }
        ]
            
    },
    {
        path: 'profile',
        component: ProfileComponent
    }
    
  
   
];
