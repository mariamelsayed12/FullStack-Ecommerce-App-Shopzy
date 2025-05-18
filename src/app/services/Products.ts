import { createApi } from '@reduxjs/toolkit/query/react'
import { supabase } from '../../config/supabaseClient'

interface IProduct {
    id: number;
    documentId: string;
    title: string;
    description: string;
    stock: number;
    price: number;
    thumbnail: string;
}

interface IProductResponse {
    data: IProduct[];
}

export const ProductsApiSlice = createApi({
    reducerPath: 'ApiProducts',
    tagTypes: ['DashboardProducts'],
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    baseQuery: () => ({ data: null }),
    endpoints: (builder) => ({
        getDashboardProductList: builder.query<IProductResponse, void>({
            async queryFn() {
                const { data, error } = await supabase
                    .from('products')
                    .select('*');
                if (error) return { error };
                return { data: { data: data || [] } };
            },
            providesTags: (result) =>
                result
                    ? [
                        ...result.data.map(({ id }) => ({ type: 'DashboardProducts' as const, id })),
                        { type: 'DashboardProducts', id: 'LIST' }
                    ]
                    : [{ type: 'DashboardProducts', id: 'LIST' }],
        }),
        UpdateDashboardProducts: builder.mutation({
            async queryFn({ id, body }: { id: number | null; body: Partial<IProduct> }) {
                if (id === null) return { error: { message: 'No ID provided' } };
                const { data, error } = await supabase
                    .from('products')
                    .update(body)
                    .eq('id', id)
                    .select();
                if (error) return { error };
                return { data };
            },
            invalidatesTags: [{ type: 'DashboardProducts', id: 'LIST' }],
        }),
        deleteDashboardProducts: builder.mutation({
            async queryFn(id: number | null) {
                if (id === null) return { error: { message: 'No ID provided' } };
                const { error } = await supabase
                    .from('products')
                    .delete()
                    .eq('id', id);
                if (error) return { error };
                return { data: { success: true } };
            },
            invalidatesTags: [{ type: 'DashboardProducts', id: 'LIST' }],
        })
    }),
})

export const { useGetDashboardProductListQuery, useDeleteDashboardProductsMutation, useUpdateDashboardProductsMutation } = ProductsApiSlice
