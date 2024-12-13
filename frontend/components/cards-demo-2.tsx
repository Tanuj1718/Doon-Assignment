"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { updateCard, deleteCard } from "@/services/api";

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

export default function Card({
  _id,
  instructor,
  duration,
  title,
  description,
  isAdmin,
  onUpdate,
  onDelete,
}: CardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);

  const handleUpdate = async () => {
    try {
      await updateCard(_id, { title: editedTitle, description: editedDescription });
      setIsEditing(false);
      onUpdate();
      window.location.reload(); 
    } catch (error) {
      console.error("Error updating card:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCard(_id);
      onDelete();
      window.location.reload(); 
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  return (
    <div className="max-w-xs w-full group/card">
      <div
        className={cn(
          "cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4",
          ``
        )}
      >
        <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-gray-500 opacity-60  ">
        <div className="absolute w-full h-full top-0 left-0 transition bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMhVRkPPsyNm7VYwR8zFUJLdbaa2z3knE1pg&s')] bg-cover z-10 opacity-20"></div>
          </div>
        <div className="flex flex-row items-center space-x-4 z-10">
          <div className="flex flex-col">
            <p className="font-normal text-base text-black relative z-10">
              {instructor}
            </p>
            <p className="text-sm text-black">{duration}</p>
          </div>
        </div>
        <div className="text content">
          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="font-bold text-xl md:text-2xl text-gray-800 relative z-10 w-full mb-2"
            />
          ) : (
            <h1 className="font-bold text-xl md:text-2xl text-black relative z-10">
              {title}
            </h1>
          )}
          {isEditing ? (
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="font-normal text-sm text-gray-800 relative z-10 w-full h-20"
            />
          ) : (
            <p className="font-normal text-sm text-black relative z-10 my-4">
              {description}
            </p>
          )}
        </div>
      </div>
      {isAdmin && (
        <div className="h-10 rounded-[8px] mt-1">
          <div className="flex items-center justify-evenly">
            {isEditing ? (
              <button
                className="bg-green-500 rounded-[8px] p-1 w-[80px]"
                onClick={handleUpdate}
              >
                Save
              </button>
            ) : (
              <button
                className="bg-blue-500 rounded-[8px] p-1 w-[80px]"
                onClick={() => setIsEditing(true)}
              >
                Update
              </button>
            )}
            <button
              className="bg-red-500 rounded-[8px] p-1 w-[80px]"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

