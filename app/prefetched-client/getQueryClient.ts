import { QueryClient } from '@tanstack/react-query';
import { cache } from 'react';

/**
 * TODO: Check if we still need this function
 */
const getQueryClient = cache(() => new QueryClient());
export default getQueryClient;
