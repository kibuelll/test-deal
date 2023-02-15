import { Table, Typography, Input, Button,Skeleton } from "antd";
import { useEffect, useState } from "react";
import Chart from "../../components/Chart";
const { Text } = Typography;

const TableProduct = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [charted, setCharted] = useState(false);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products", {
      method: "get",
    })
      .then((response) => {
        if (!response.ok) {
          throw response.json();
        }
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        setProducts(data.products);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    setFiltered(
      products.filter((el) => el.title.toLowerCase().includes(search))
    );
  }, [search]);

  const columns = [
    {
      title: "Product Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      filters: [
        ...new Set(
          products.map((el) => {
            return el.brand;
          })
        ),
      ].map((el) => {
        return {
          text: el,
          value: el,
        };
      }),
      onFilter: (value, record) => record.brand.indexOf(value) === 0,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => <Text>$ {price}</Text>,
      filters: [
        {
          text: " 0 - $100",
          value: [0, 100],
        },
        {
          text: "$100 - $500",
          value: [100, 500],
        },
        {
          text: "$500 - $1000",
          value: [500, 1000],
        },
        {
          text: "> $1000",
          value: [1000, Infinity],
        },
      ],
      onFilter: (value, record) =>
        record.price >= value[0] && record.price <= value[1],
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      defaultSortOrder: "descend",
      sorter: (a, b) => b.stock - a.stock,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      filters: [
        ...new Set(
          products.map((el) => {
            return el.category;
          })
        ),
      ].map((el) => {
        return {
          text: el,
          value: el,
        };
      }),
      onFilter: (value, record) => record.category.indexOf(value) === 0,
    },
  ];

  return (
    <section style={{ color: "black" }}>
      {!loading && !charted ? (
        <>
          <div style={{ marginBottom: "1em", display: "flex" }}>
            <Input
              type="search"
              placeholder="product name"
              style={{
                width: "30%",
                marginRight: "auto",
                border: "1px solid #192a56",
              }}
              value={search}
              onChange={handleSearch}
            />
            <Button
              style={{
                width: "15rem",
                backgroundColor: "#192a56",
                marginRight: "5em",
                color: "white",
              }}
              onClick={() => {
                setCharted(!charted);
              }}
            >
              See On Charts
            </Button>
          </div>
          <Table
            dataSource={filtered.length ? filtered : products}
            columns={columns}
            pagination={{ position: ["bottomCenter"] }}
          />
        </>
      ) : null}
      {!loading && charted ? (
        <Chart products={products} setCharted={setCharted} />
      ) : null}
      {loading && !charted ? <Skeleton active/>: null}
    </section>
  );
};

export default TableProduct;
