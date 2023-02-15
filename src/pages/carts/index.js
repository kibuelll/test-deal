import React, { useState, useEffect } from "react";
import { Table, Button, Typography ,Skeleton} from "antd";
import Link from "next/link";
const { Text } = Typography;

const TableCarts = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/carts", {
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
        setCarts(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "User Id",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Total Products",
      dataIndex: "totalProducts",
      key: "totalProducts",
    },
    {
      title: "Total Quantity",
      dataIndex: "totalQuantity",
      key: "totalQuantity",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (total) => (
        <div
          style={{
            backgroundColor: "#4cd137",
            oppacity: "0.5",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Text>$ {total}</Text>
        </div>
      ),
    },
    {
      title: "Detail",
      dataIndex: "id",
      key: "detail",
      render: (id) => (
        <Link href={`/carts/${id}`}>
          <Button style={{ backgroundColor: "#487eb0", color: "white" }}>
            Detail
          </Button>
        </Link>
      ),
    },
  ];
  return (
    <section
      style={{
        margin: "0 16px",
        color: "black",
      }}
    >
      <h1
        style={{ textAlign: "center", marginBottom: "1em", fontSize: "1.5rem" }}
      >
        Carts
      </h1>
      {!loading ? <Table dataSource={carts.carts} columns={columns} pagination={{position:['bottomCenter']}}/> : <Skeleton active/>}
    </section>
  );
};

export default TableCarts;
