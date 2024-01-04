export const environments = {
  GRAPHQL_BACKEND_URI: process.env.GRAPHQL_BACKEND_URI || "",
  GRAPHQL_BACKEND_SECRET: process.env.GRAPHQL_BACKEND_SECRET || "",
  VOLDEMORT_API: process.env.VOLDEMORT_API || "",
  TOKENVOL_DEMORT: process.env.TOKENVOL_DEMORT || "",
};
console.log(environments);
