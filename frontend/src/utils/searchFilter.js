export const searchFilter = (
    data,
    searchTerm,
    fields
) => {

    if (!searchTerm) return data;

    return data.filter((item) =>
        fields.some((field) =>
            item[field]
                ?.toString()
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        )
    );

};