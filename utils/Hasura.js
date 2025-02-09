// utils/Hasura.js
import axios from "axios";

export async function Hasura(query, variables) {
  try {
    if (!process.env.HASURA_GRAPHQL_ENDPOINT) {
      throw new Error("HASURA_GRAPHQL_ENDPOINT is not defined");
    }

    const response = await axios({
      url: process.env.HASURA_GRAPHQL_ENDPOINT,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
      },
      data: {
        query,
        variables,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error in Hasura request:", error);
    throw error;
  }
}
