const ProductModel = require("../models/store");

const getProducts = async (req, res) => {
  const { featured, company, name, sort, field, numericFilters } = req.query;
  const queryParams = {};

  if (featured) {
    queryParams.featured = featured === "true" ? true : false;
  }

  if (company) {
    queryParams.company = company;
  }

  if (name) {
    queryParams.name = { $regex: name, $options: "i" };
  }
  
  if (numericFilters) {
    const opertorMap = {
      ">": "$gt",
      ">=": "$gte",
      "<": "$lt",
      "<=": "$lte",
      "=": "$eq",
    };

    const regex = /\b(<|>|>=|=|<=)\b/g;
    let filters = numericFilters.replace(
      regex,
      (match) => `-${opertorMap[match]}-`
    );

    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryParams[field] = {[operator]: Number([value])}
      }
    });
    console.log(filters);
  }


  result = ProductModel.find(queryParams);

  // sort based on sortlist
  if (sort) {
    const sortList = sort.replace(",", " ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  // return only specified fields
  if (field) {
    const fieldList = field.replace(",", " ");
    result = result.select(fieldList);
  }

  const page = Number(req.query.page) || 1;
  const limitCount = Number(req.query.limit) || 10;
  const skipCount = (page - 1) * limitCount;

  result = result.skip(skipCount).limit(limitCount);

  console.log(queryParams);
  const products = await result;
  res.status(200).json({ nbHits: products.length, products });
};

const getProductsStatic = async (req, res) => {
  const products = await ProductModel.find({
    name: { $regex: "a", $options: "i" },
    price: { $gt: 30 },
  })
    .limit(10)
    .sort("price");
  res.status(200).json({ nbHits: products.length, products });
};

module.exports = {
  getProducts,
  getProductsStatic,
};
