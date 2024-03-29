import React, { useEffect, useState } from "react";
import { PieChart, Pie, ResponsiveContainer } from "recharts";

const EventGenre = ({ events }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = () => {
      const genres = [
        "React",
        "JavaScript",
        "Node",
        "jQuery",
        "AngularJS",
        "Angular",
      ];

      const data = genres
        .map((genre) => {
          const value = events.filter((event) =>
            // => genres.some((g) => event.summary.includes(g))
            event.summary.split(" ").includes(genre)
          ).length;
          return { name: genre, value };
        })
        .filter(({ value }) => value > 0);
      return data;
    };
    setData(() => getData());
  }, [events]);

  return (
    <ResponsiveContainer className="pieChart" height={400}>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          outerRadius={80}
          fill="#8224d8"
          dataKey="value"
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
        ></Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenre;
