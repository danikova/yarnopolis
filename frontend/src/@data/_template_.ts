// export function useGlobals(options?: Partial<UseQueryOptions<Globals, Error>>) {
//   const { data } = useQuery({
//     queryKey: ['globals'],
//     queryFn: async () => {
//       const globals: Globals = {};
//       const response = await sw(
//         pb.collection('globals').getFullList<GlobalRecord>(options)
//       );
//       for (const item of response) {
//         globals[item.key] = item.value;
//       }
//       return globals;
//     },
//     ...options,
//   });
//   return data ?? {};
// }
