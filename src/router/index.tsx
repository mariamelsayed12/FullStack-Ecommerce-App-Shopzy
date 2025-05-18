import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import RoutLayout from '../pages/Layout'
import ErrorHandler from '../errors/ErrorHandler'
import ProductsPage from '../pages/Products'
import DetailseOfProduct from '../pages/DetailseOfProduct.tsx'
import Login from '../pages/Login'
import CookiesService from '../services/CookiesService'
import AdminDashBoard from '../pages/dashboard/index.tsx'
import DashboardLayout from '../pages/dashboard/DashboardLayout.tsx'
import DashboardProducts from '../pages/dashboard/DashboardProducts.tsx'
import SignUpPage from '../pages/SignUP.tsx'
import ContactUs from '../pages/ContectUs.tsx'
import ProtectedRoute from '../auth/ProtectedRout.tsx'
import ArticleList from '../pages/Blog.tsx'


const token =CookiesService.get('jwt')
const adminEmail = (localStorage.getItem('loggedInAdmin') || '').trim().toLowerCase();
const isAdmin = adminEmail === 'test@gmail.com';

const router = createBrowserRouter(createRoutesFromElements(
<>

<Route path="/" element={<RoutLayout/>} errorElement={<ErrorHandler/>}>
<Route index 
                element ={
                        <ProductsPage/>
                }
        />


<Route
        path='/blog'
        element={
        <ArticleList/>
        }
/>

<Route path='/products' 
                element={
                        <ProductsPage/>
                }/>

<Route path='/detailseofproduct' 
                element={
                        <ProtectedRoute
                                isAllowed={!!token}
                                redirectPath="/login"
                        >
                                                        <DetailseOfProduct/>
                        </ProtectedRoute>
                        }
                
                
                />


<Route path='/contectus' 
                element={
                        <ContactUs/>
                }/>

                

</Route>



<Route path="/dashboard" element={
        <ProtectedRoute 
        isAllowed={!!isAdmin}
        redirectPath="/login"
        >
                        <DashboardLayout/>
        </ProtectedRoute>
        
        } errorElement={<ErrorHandler/>}>
<Route index 
                element ={
                        <AdminDashBoard/>
                }
        />

<Route path='/dashboard/dashboardproducts' 
                element={
                        <DashboardProducts/>
                }/>

</Route>


<Route path='/login' 
                element={
                        <Login isAuthenticated={token}/>
                }/>

<Route path='/signuP' 
                element={
                        <SignUpPage />
                }/>

</>
))

export default router