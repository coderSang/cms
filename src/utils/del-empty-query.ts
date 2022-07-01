export function delEmptyQuery(query: any) {
  const params = <IObjKeyValue>{}
  for (const item in query) {
    if (query[item] !== '') {
      params[item] = query[item]
    }
  }
  return params;
}
