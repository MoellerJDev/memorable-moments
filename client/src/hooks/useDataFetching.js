import { useQuery } from '@apollo/client';

export const useDataFetching = (query) => {
  const { loading, error, data } = useQuery(query);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return data;
};
