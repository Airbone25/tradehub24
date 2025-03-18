import { useState } from "react";
import { supabase } from "../../../services/supabaseClient";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// interface FormData {
//   first_name: string;
//   last_name: string;
//   email: string;
//   user_type: "homeowner" | "professional";
//   postcode: string;
//   phone: string;
//   password: string;
// }

export default function UserModal({ isOpen, onClose }: UserModalProps) {
  const [firstName,setFirstName] = useState("")
  const [lastName,setLastName] = useState("")
  const [email,setEmail] = useState("")
  const [userType,setUserType] = useState("")
  const [postCode,setPostCode] = useState("")
  const [phone,setPhone] = useState("")

  async function postUser(formdata: any) {
    const {data,error} = await supabase.from('profiles').insert(formdata)
    if(error){
      console.error(error)
    }
    if(data){
      console.log({message: "success",data})
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", {firstName,lastName,email,userType,confirmed:true,postCode,phone});
    postUser({firstName,lastName,email,userType,confirmed:true,postCode,phone,created_at: new Date().toISOString()})
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">User Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={firstName}
              onChange={(e)=>setFirstName(e.target.value)}
              className="border p-2 w-1/2 rounded-md"
              required
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={lastName}
              onChange={(e)=>setLastName(e.target.value)}
              className="border p-2 w-1/2 rounded-md"
              required
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="border p-2 w-full rounded-md"
            required
          />
          <select
            name="user_type"
            value={userType}
            onChange={(e)=>setUserType(e.target.value)}
            className="border p-2 w-full rounded-md"
            required
          >
            <option value="homeowner">Homeowner</option>
            <option value="professional">Professional</option>
          </select>
          <input
            type="text"
            name="postcode"
            placeholder="Postcode"
            value={postCode}
            onChange={(e)=>setPostCode(e.target.value)}
            className="border p-2 w-full rounded-md"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            className="border p-2 w-full rounded-md"
            required
          />
          <div className="flex justify-between mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-500 text-white rounded-md"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
