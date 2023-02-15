import {ArrowLeftOutlined,ArrowRightOutlined} from '@ant-design/icons'
import { Row, Col, Table, Typography, Skeleton, Button } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
const { Text } = Typography;

const DetailCart = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState({});


  useEffect(() => {
    fetch(`https://dummyjson.com/carts/${router.query.id}`, {
      method: "get",
    })
      .then((response) => {
        if (!response.ok) {
          throw response.json();
        }
        return response.json();
      })
      .then((data) => {
        setLoading(false)
        setDetail(data);
      })
      .catch((err) => console.log(err));
  }, [router.query.id]);

  const columns = [
    {
      title: "Product Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => <Text>$ {price}</Text>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Total Price",
      dataIndex: "total",
      key: "total",
      render: (total) => <Text>$ {total}</Text>,
    },
    {
      title: "Discount",
      dataIndex: "discountPercentage",
      key: "discountPercentage",
      render: (discount) => <Text>{discount}%</Text>,
    },
    {
      title: "Final Price",
      dataIndex: "discountedPrice",
      key: "discountedPrice",
      render: (discount) => <Text>$ {discount}</Text>,
    },
  ];

  return (
    <section style={{ color: "black" }}>
      {!loading ? (
        <>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button onClick={() => {
              router.push(`/carts/${+router.query.id -1}`)
            }} disabled={+router.query.id == 1}>
              <ArrowLeftOutlined style={{fontSize:'1.5rem'}}/>
            </Button>
            <h1
              style={{
                fontSize: "1.5rem",
                marginLeft: "8em",
                marginBottom: "1.5em",
                left: "2rem",
              }}
            >
              CART {router.query.id}
            </h1>
            <div
              style={{
                marginLeft: "3em",
                marginRight:'auto',
                backgroundColor: "#487eb0",
                marginBottom: "1.5em",
                height: "5rem",
                width: "35%",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                color: "white",
                fontWeight: "700",
              }}
            >
              <Row justify={"center"}>
                <Col span={12} align="center">
                  User ID : {detail.userId}
                </Col>
                <Col span={12} align="center">
                  # of items :{detail.products.length}
                </Col>
              </Row>
              <Row justify={"center"}>
                <Col span={12} align="center">
                  Added on: 20 Jan 2022
                </Col>
                <Col span={12} align="center">
                  Total ammount : {detail.total}
                </Col>
              </Row>
            </div>
            <Button onClick={() => {
              router.push(`/carts/${+router.query.id +1}`)
            }}
              disabled={+router.query.id == 20}
            >
              <ArrowRightOutlined style={{fontSize:'1.5rem'}}/>
            </Button>
          </div>
          <Table
            dataSource={detail.products}
            columns={columns}
            pagination={false}
          />
        </>
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Skeleton
            avatar={{ size: "large" }}
            active
            style={{ marginBottom: "2em" }}
          />
          <Skeleton paragraph={{ rows: 6 }} active />
        </div>
      )}
    </section>
  );
};

export default DetailCart;
