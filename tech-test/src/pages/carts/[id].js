import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Row, Col, Table,Typography } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
const { Header, Sider, Content } = Layout;
const {Text} = Typography

const DetailCart = () => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState([]);

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
        console.log(data);
        setLoading(false);
        setDetail(data);
      })
      .catch((err) => console.log(err));
  }, []);

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
      render : (price) => (
        <Text>$ {price}</Text>
      )
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
    },
    {
      title: 'Discount',
      dataIndex:'discountPercentage',
      key:'discountPercentage',
      render : (discount) => (
        <Text>{discount}%</Text>
      )
    },
    {
      title: 'Final Price',
      dataIndex:'discountedPrice',
      key:'discountedPrice',
      render : (discount) => (
        <Text>$ {discount}</Text>
      )
    }
  ];

  return (
    <Layout className="layout">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ backgroundColor: "#192a56" }}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          style={{ backgroundColor: "#192a56" }}
          mode="inline"
          items={[
            {
              key: "1",
              icon: <ShoppingOutlined />,
              label: <Link href="/">Products</Link>,
            },
            {
              key: "2",
              icon: <ShoppingCartOutlined />,
              label: <Link href="/cLinkrts">Carts</Link>,
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          <Row style={{ backgroundColor: "#192a56", color: "white" }}>
            <Col span={4}>
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: () => setCollapsed(!collapsed),
                }
              )}
            </Col>
            <Col span={20}>
              <h1>WELLCOME ADMIN</h1>
            </Col>
          </Row>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            color: "black",
          }}
        >
          {!loading ? (
            <>
              <h1 style={{ fontSize: "1.5rem", marginBottom: "1.5em" }}>
                CART {router.query.id}
              </h1>
              <h3 style={{ marginBottom: "1em" }}>Details : </h3>
              <div
                style={{
                  backgroundColor: "#487eb0",
                  marginBottom:'1.5em',
                  height: "5rem",
                  width: "35%",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                }}
              >
                <Row justify={"center"}>
                  <Col span={12} align="center">
                    User : {detail.userId}
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
              <Table dataSource={detail.products} columns={columns} pagination={false}/>
            </>
          ) : null}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DetailCart;
