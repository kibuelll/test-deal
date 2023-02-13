import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Row, Col,Button } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import TableCarts from "./carts";
import TableProducts from "./products/TableProducts";
const { Header, Sider, Content } = Layout;

export default function Home() {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

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
        setProducts(data);
      })
      .catch((err) => console.log(err));
  }, []);
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
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <ShoppingOutlined />,
              label: <a href="/">Products</a>,
            },
            {
              key: "2",
              icon: <ShoppingCartOutlined />,
              label: (
                <a
                  onClick={() => {
                    router.push("/carts");
                  }}
                >
                  Carts
                </a>
              ),
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
          }}
        >
          {!loading ? (
            router.route.includes("carts") ? (
              <TableCarts />
            ) : (
              <TableProducts products={products} />
            )
          ) : null}
        </Content>
      </Layout>
    </Layout>
  );
}
