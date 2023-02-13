import { Table, Typography, Input, Button } from "antd";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";

const { Text } = Typography;

const TableProduct = ({ products }) => {
  const [search, setSearch] = useState("");
  const [charted, setCharted] = useState(false);
  const [filtered, setFiltered] = useState([]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const colors = [];
  products.products.forEach((el) => {
    colors.push(getRandomColor());
  });

  const Charts = () => {
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      stock,
    }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
        >
          {`${stock}`}
        </text>
      );
    };

    const data = products.products.map((el) => {
      return {
        id: el.id,
        name: el.title,
        stock: el.stock,
      };
    });

    return (
      <section style={{ display: "flex" }}>
        <PieChart width={700} height={700}>
          <Pie
            data={data}
            dataKey="stock"
            outerRadius={300}
            fill="#8884d8"
            cx={"50%"}
            cy={"50%"}
            labelLine={false}
            label={renderCustomizedLabel}
          >
            {data.map((entry, index) => (
              <Cell
                id={`cell-${index}`}
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
                lightingColor={false}
              />
            ))}
          </Pie>
        </PieChart>
        <div style={{ marginTop: "2em", marginLeft: "2em" }}>
          <p style={{ marginBottom: "1em" }}>
            Click on product list bellow, focus will be shown on black color
            chart!!
          </p>
          <ul>
            {data.map((el, index) => {
              return (
                <li
                  id={`list-${index}`}
                  style={{
                    textDecoration: "none",
                    overflow: "hidden",
                    color: colors[index % colors.length],
                  }}
                  onClick={() => {
                    let selected = document.getElementById(`cell-${index}`);
                    let hovered = document.getElementById(`list-${index}`);
                    let previousColor = selected.getAttribute("fill");
                    selected.setAttribute("fill", "black");
                    hovered.style.fontWeight = "bolder";
                    setTimeout(() => {
                      selected.setAttribute("fill", previousColor);
                      hovered.style.fontWeight = "normal";
                    }, 2000);
                  }}
                >
                  {`${el.id} ${el.name}`}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    );
  };

  useEffect(() => {
    setFiltered(
      products.products.filter((el) => el.title.toLowerCase().includes(search))
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
          products.products.map((el) => {
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
          products.products.map((el) => {
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
          {charted ? "Back to table" : "See On Charts"}
        </Button>
      </div>
      {charted ? (
        <Charts />
      ) : (
        <Table
          dataSource={filtered.length ? filtered : products.products}
          columns={columns}
          pagination={{ position: ["bottomCenter"] }}
        />
      )}
    </section>
  );
};

export default TableProduct;
