export const useFilter = (data,filterFunctiton) => {
    const filteredData = data.filter(filterFunctiton);
    return filteredData;
}