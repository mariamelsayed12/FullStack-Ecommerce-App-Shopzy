import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import CookiesService from '../../services/CookiesService'

interface IProduct {
    id: number;
    documentId: string;
    title: string;
    description: string;
    stock: number;
    price: number;
    thumbnail: {
        formats: {
            thumbnail: {
                url: string;
            };
        };
    };
}


interface IProductResponse {
    data: IProduct[];
}

export const ProductsApiSlice=createApi({
    reducerPath:'ApiProducts',
    tagTypes:['DashboardProducts'],
    refetchOnReconnect:true, 
    refetchOnMountOrArgChange:true,
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:1337"}),
    endpoints:(builder)=>({
        // Get =>get
        getDashboardProductList: builder.query<IProductResponse, void>({
            query:()=>{
                return{
                    url:"/api/products?populate=thumbnail"
                }
            },
            providesTags: (result) =>
                result
                    ? [
                        ...result.data.map(({ id }) => ({ type: 'DashboardProducts' as const, id })),
                        { type: 'DashboardProducts', id: 'LIST' }
                    ]
                    : [{ type: 'DashboardProducts', id: 'LIST' }],
        }),
        //Update=>put
        UpdateDashboardProducts: builder.mutation({
            query: ({ id, body }: { id: number|null; body: FormData }) => ({
                url: `/api/products/${id}`,
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${CookiesService.get('jwt')}`
                },
                body: body
            }),
            async onQueryStarted({id,...patch}, { dispatch, queryFulfilled }){
                if (id === null) return; 
                const patchResult = dispatch(
                    ProductsApiSlice.util.updateQueryData('getDashboardProductList', undefined, (draft) => {
                    Object.assign(draft, patch)
                    })
                );
                try {
                    await queryFulfilled
                    } catch {
                    patchResult.undo()
                    }

            },
            invalidatesTags: [{ type: "DashboardProducts", id: "LIST" }]
        }),
        

        //Delete=>delete
        deleteDashboardProducts:builder.mutation({
            query:(id:number|null)=>{
                return{
                    url:`/api/products/${id}`,
                    method:"DELETE",
                    headers:{
                        Authorization:`Bearer ${CookiesService.get('jwt')} `
                    }
                }
            },
            invalidatesTags: [{ type: 'DashboardProducts', id: 'LIST' }]


        })
    }),
})

export const {useGetDashboardProductListQuery,useDeleteDashboardProductsMutation,useUpdateDashboardProductsMutation} =ProductsApiSlice
