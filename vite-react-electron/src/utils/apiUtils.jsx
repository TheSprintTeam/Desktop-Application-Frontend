// constant variable for base endpoints
export const base_url = "http://127.0.0.1:8000/"


// function for resolving API requests
export async function resolve (promise) {
    const response = {
      data: null,
      error: null
    };
  
    try {
      response.data = await promise;
    } catch(e) {
      response.error = e;
    }
  
    return response;
}