import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { fetchSales, fetchTopProducts } from "../redux/analyticsSlice";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, ResponsiveContainer } from "recharts";

const AdminDashboard = () => {
  const dispatch = useAppDispatch();
  const { sales, topProducts, loading } = useAppSelector(s => s.analytics);

  useEffect(() => {
    dispatch(fetchSales());
    dispatch(fetchTopProducts());
  }, [dispatch]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Analytics Dashboard</h2>
      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        <div style={{ background: "#fff", padding: 16, borderRadius: 8, flex: 1 }}>
          <h3>Revenue (Last 30 days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div style={{ background: "#fff", padding: 16, borderRadius: 8, flex: 1 }}>
          <h3>Orders (Last 30 days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div style={{ background: "#fff", padding: 16, borderRadius: 8, marginTop: 32 }}>
        <h3>Top 5 Best Sellers</h3>
        <ul>
          {topProducts.map((p: any) => (
            <li key={p.id}>{p.name} — Sold: {p.sold}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;