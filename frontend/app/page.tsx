"use client";

import { useState, useEffect } from "react";
import { getCards, login } from "@/services/api";
import Card from "@/components/cards-demo-2";
import AddCoursesDemo from "@/components/add-edit-courses";
import SigninFormDemo from "@/components/signin-form-demo";
interface CardProps {
  _id: string,
  instructor: string;
  duration: string;
  title: string;
  isAdmin: boolean,
  description: string;
  onUpdate: () => void;
  onDelete: () => void;
}

export default function Home() {
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  console.log(setUsername, setPassword);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      checkAdminStatus();
      fetchCards();
    }
  }, []);

  const checkAdminStatus = () => {
    const isAdminUser = true; // Has to implement
    setIsAdmin(isAdminUser);
  };

  const fetchCards = async () => {
    try {
      const fetchedCards = await getCards();
      setCards(fetchedCards);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token } = await login(username, password);
      localStorage.setItem("token", token);
      setIsLoggedIn(true);
      checkAdminStatus();
      fetchCards();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  console.log(handleLogin);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsAdmin(false);
    setCards([]);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <SigninFormDemo/>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Card Management</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded">
          Logout
        </button>
      </div>
      {isAdmin && (
        <AddCoursesDemo/>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cards.map((card:CardProps) => (
          <Card
            key={card._id}
            {...card}
            isAdmin={isAdmin}
            onUpdate={fetchCards}
            onDelete={fetchCards}
          />
        ))}
      </div>
    </div>
  );
}

