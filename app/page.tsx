"use client";

import React, { useEffect, useState } from "react";
import { LucideIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

type DataItem = {
  id: number;
  title: string;
  body: string;
};

const fetchData = async (): Promise<DataItem[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

const Page = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData()
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  }

  if (data.length === 0) {
    return <div className="text-center mt-10">No data available</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Data List</h1>
      <ul className="space-y-4">
        {data.map((item) => (
          <li key={item.id} className="border p-4 rounded-lg shadow">
            <img
              src={"https://loremflickr.com/320/240?random=" + item.id}
              alt="Random"
              className="w-full h-48 object-cover mb-4"
            />
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p>{item.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;