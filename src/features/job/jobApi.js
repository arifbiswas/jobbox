import apiSlice from "../api/apiSlice";

const jobApi = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        postJob : builder.mutation({
            query : (data) => ({
                url : "/job",
                method : "POST",
                body : data
            })
        }),
        getJobs : builder.query({
            query : () => ({
                url : "/jobs",
            })
        }),
        JobById : builder.query({
            query : (id) => ({
                url :  `/job/${id}`,
            })
        })
    })
})

export const {usePostJobMutation , useJobByIdQuery , useGetJobsQuery} = jobApi;