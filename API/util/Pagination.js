const Pagination = (page, size) => {
    const limit = size ? +size : 8;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
  };

  module.exports = Pagination;