"use client";

import ProjectsList from "@/components/ProjectsList";
import React, { useEffect, useState } from "react";

export default function DeletePage() {
  const [properties, setProperties] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState({});

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/properties`);
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || `Failed to fetch properties`);
      }

      setProperties(result.data.data.properties);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="relative">
      <div className="max-w-7xl mx-auto px-4">
        <ProjectsList
          title="Projects"
          subtitle="Featured projects in Dronagiri, Navi Mumbai"
          properties={properties}
          type="delete"
        />
      </div>
    </div>
  );
}
