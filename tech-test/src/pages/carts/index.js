import React, { useState, useEffect } from "react";
import { Table, Row, Col, Layout, Menu, Button } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import Link from "next/link";
const { Header, Sider, Content } = Layout;

const TableCarts = () => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
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
        console.log(data);
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
    },
    {
      title: "Detail",
      dataIndex: "id",
      key: "detail",
      render: (id) => (
        <Link href={`/carts/${id}`}>
          <Button style={{ backgroundColor: "blue", color: "white" }}>
            Detail
          </Button>
        </Link>
      ),
    },
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
              label: <a href="/">Products</a>,
            },
            {
              key: "2",
              icon: <ShoppingCartOutlined />,
              label: <a href="/carts">Carts</a>,
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
          <h1 style={{ textAlign: "center" }}>Carts</h1>
          {!loading ? (
            <Table dataSource={carts.carts} columns={columns} />
          ) : null}
        </Content>
      </Layout>
    </Layout>
  );
};

export default TableCarts;
