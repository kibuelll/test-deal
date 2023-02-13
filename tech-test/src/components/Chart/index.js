import {Button,Typography} from 'antd'
import { PieChart, Pie, Cell } from "recharts";
const {Title} = Typography


const Chart = ({products,setCharted}) => {
  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const colors = [];
  products.forEach(() => {
    colors.push(getRandomColor());
  });

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

  const data = products.map((el) => {
    return {
      id: el.id,
      name: el.title,
      stock: el.stock,
    };
  });

  return (
    <section style={{ display: "flex" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Title level={2} style={{margin:0}}> Products Charts </Title>
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
      </div>
      <div style={{marginLeft: "2em" }}>
        <Button
          style={{
            width: "15rem",
            backgroundColor: "#192a56",
            marginRight: "5em",
            marginBottom: "2em",
            color: "white",
          }}
          onClick={() => {
            setCharted(false);
          }}
        >
          "Back to table"
        </Button>
        <p style={{ marginBottom: "1em", fontWeight: "700" }}>
          Click on product list bellow, focus will be shown on black color
          chart!!
        </p>
        <ul style={{ columns: 2, WebkitColumns: 2 }}>
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

export default Chart