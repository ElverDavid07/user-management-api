const paginationOptions = {
 page: 1,
 limit: 25,
 sort: { createdAt: "desc" },
 populate: { path: "role" },
 select: "-password",
};

export { paginationOptions };
