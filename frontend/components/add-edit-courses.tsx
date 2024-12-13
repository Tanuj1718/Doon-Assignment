"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { createCard, getCards } from "@/services/api";
import { useRouter } from "next/navigation";

export default function AddCoursesDemo() {
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newCardTitle, setNewCardTitle] = useState("");
  const [newCardDescription, setNewCardDescription] = useState("");
  const [newCardInstructor, setNewCardInstructor] = useState("");
  const [newCardDuration, setNewCardDuration] = useState("");
  const router = useRouter();

  const checkAdminStatus = () => {
    const isAdminUser = true; // Replace with actual logic
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Sending the form data to the API
      await createCard({
        title: newCardTitle,
        description: newCardDescription,
        instructor: newCardInstructor,
        duration: newCardDuration,
      });
      
      // Clear input fields (optional, based on your design)
      setNewCardTitle("");
      setNewCardDescription("");
      setNewCardInstructor("");
      setNewCardDuration("");
      
      // Re-fetch cards after creating a new one

      fetchCards();
      window.location.reload(); 
    } catch (error) {
      console.error("Error creating card:", error);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to LMS
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Add a new Course
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="newCardTitle">Title</Label>
            <Input 
              id="newCardTitle" 
              type="text" 
              value={newCardTitle} 
              onChange={(e) => setNewCardTitle(e.target.value)} 
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
            <Label htmlFor="newCardDescription">Description</Label>
            <Input 
              id="newCardDescription" 
              type="text" 
              value={newCardDescription} 
              onChange={(e) => setNewCardDescription(e.target.value)} 
            />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="newCardDuration">Duration</Label>
          <Input 
            id="newCardDuration" 
            type="text" 
            value={newCardDuration} 
            onChange={(e) => setNewCardDuration(e.target.value)} 
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="newCardInstructor">Instructor</Label>
          <Input 
            id="newCardInstructor" 
            type="text" 
            value={newCardInstructor} 
            onChange={(e) => setNewCardInstructor(e.target.value)} 
          />
        </LabelInputContainer>
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Add &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
