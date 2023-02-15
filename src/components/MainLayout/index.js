import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Row, Col, Button } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
const { Header, Sider, Content } = Layout;

const MainLayout = ({ children, ...props }) => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout className="layout">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ backgroundColor: "#192a56", padding: "1em" }}
      >
        <div className="logo">
          <img
            src={
              "https://media-exp1.licdn.com/dms/image/C560BAQGfSaW1cDM5qg/company-logo_200_200/0/1648392785779?e=2147483647&v=beta&t=UVdQdXG_aGRmPMZLDKLO2RQbOrN-RZep4kKYVnZloPU"
            }
            alt="LOGO"
            width={100}
            height={50}
            style={{objectFit:'cover'}}
          />
        </div>
        <Menu
          theme="dark"
          style={{ backgroundColor: "#192a56",justifyContent:'space-between' }}
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <ShoppingOutlined />,
              label: <Link href="/">Products</Link>,
            },
            {
              key: "2",
              icon: <ShoppingCartOutlined />,
              label: (
                <Link
                href="/carts"
                >
                  Carts
                </Link>
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
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
