"use client";
import React, { useEffect, useState } from "react";
import { push, ref, set } from "firebase/database";
import { db } from "../../firebase/firestore/addData";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { database } from "../../firebase/firestore/getRealtime";

import { useRouter } from "next/navigation";
interface UserDataType {
  id: string; // Assuming each object has an id of type string
  name: string; // and a name of type string
  email: string;
  message: string;
  // Add other properties as needed
}
// async function fetchDataFromFirestore(): Promise<UserDataType[]> {
//   const querySnapshot = await getDocs(collection(db, "message"));
//   const data = [];
//   querySnapshot.forEach((doc) => {
//     data.push({ id: doc.id, ...doc.data() });
//   });
// }
async function fetchDataFromFirestore(): Promise<UserDataType[]> {
    const querySnapshot = await getDocs(collection(db, "message")); // Make sure the collection name matches
    const data: UserDataType[] = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...(doc.data() as Omit<UserDataType, 'id'>) });
    });
    return data;
  }

async function addDataToFireStore(
  name: String,
  email: String,
  message: String,
) {
  try {
    const docRef = await addDoc(collection(db, "message"), {
      name: name,
      email: email,
      message: message,
    });
    console.log("document write:", docRef.id);
    return true;
  } catch (error) {
    console.error("Error", error);
    return false;
  }
}

export default function Test() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [userData, setUserData] = useState<UserDataType[]>([]);
  useEffect(() => {
    async function fetchData() {
      const data: UserDataType[] = await fetchDataFromFirestore(); // Assumed returned type
      setUserData(data);
    }
    fetchData();
  }, []);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const added = await addDataToFireStore(name, email, message);
    if (added) {
      setName("");
      setEmail("");
      setMessage("");
      alert("Data added to firestore");
    }
  };
  const handleAddData = async (e: any) => {
    try {
      const usersRef = ref(database, "users");
      const newDataRef = push(usersRef);
      set(newDataRef, {
        title: title,
        subtitle: subtitle,
      });
      setTitle("");
      setSubtitle("");
      alert("Data added to firestore___");
    } catch (error) {
      console.log("Firebase Error", error);
    }
  };

  const router = useRouter();
  //   useEffect(() => {
  //     router.push("/ChatPage");
  //   }, []);

  return (
    <>
      <div onClick={() => router.push("/signin")}>Add Database</div>
      <form onSubmit={handleSubmit}>
        <label>name</label>
        <input
          type="text"
          className="border-2 border-black"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>email</label>
        <input
          type="text"
          className="border-2 border-black"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          rows={5}
          id="message"
          className="border-2 border-black"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {/* <div>RealTime Add</div>
      <form onSubmit={handleAddData}>
        <label>Title</label>
        <input
          type="text"
          className="border-2 border-black"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Subtitle</label>
        <input
          type="text"
          className="border-2 border-black"
          id="subtitle"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form> */}
      <p>Fetch Data from Friebase Store</p>
      <div>
        {userData.map((user) => (
          <div key={user.id} className="mb-4">
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.message}</p>
          </div>
        ))}
      </div>
    </>
  );
}
