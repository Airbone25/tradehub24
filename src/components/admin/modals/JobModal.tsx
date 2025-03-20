import { useState } from "react";
import { supabase } from "../../../services/supabaseClient";
import { Helmet } from "react-helmet-async";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function JobModal({ isOpen, onClose }: UserModalProps) {
  const [homeowner_id,sethomeownerid] = useState("")
  const [title,settitle] = useState("")
  const [description,setDescription] = useState("")
  const [status,setStatus] = useState("")
  const [bids,setbids] = useState("")

  async function postJob(formdata: any) {
    const {data,error} = await supabase.from('jobs').insert(formdata)
    if(error){
      console.error(error)
    }
    if(data){
      console.log({message: "success",data})
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", {homeowner_id,title,description,status,bids});
    postJob({homeowner_id,title,description,status,bids,created_at: new Date().toISOString()})
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add Job</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              name="homeowner_id"
              placeholder="Homeowner ID"
              value={homeowner_id}
              onChange={(e)=>sethomeownerid(e.target.value)}
              className="border p-2 w-full rounded-md"
              required
            />
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={title}
              onChange={(e)=>settitle(e.target.value)}
              className="border p-2 w-full rounded-md"
              required
            />
          </div>
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            className="border p-2 w-full rounded-md"
          />
          <select
            name="status"
            value={status}
            onChange={(e)=>setStatus(e.target.value)}
            className="border p-2 w-full rounded-md"
            required
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
          <input
            type="number"
            name="bids"
            placeholder="Bids"
            value={bids}
            onChange={(e)=>setbids(e.target.value)}
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
