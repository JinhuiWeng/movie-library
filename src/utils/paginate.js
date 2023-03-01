import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  // starting index for each page
  const startIndex = (pageNumber - 1) * pageSize;

  // pagination based on startIndex and page size
  return _(items).slice(startIndex).take(pageSize).value();
}
