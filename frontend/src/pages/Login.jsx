import React, { useState } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import axios from "axios";
import toast, { useToaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const LoginForm = () => {
  // State to handle form inputs
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  //   const toast = useToaster();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res = await axios.post(
        "http://localhost:5000/api/users/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(res);

      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className=" h-screen w-screen flex justify-center items-center">
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-md">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div className="flex flex-col">
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              name="username"
              placeholder="Enter a username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Enter a password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full mt-4">
            Login
          </Button>
        </form>

        <p className="text-blue-800 text-center mt-2">
          new user ?{" "}
          <Link to="/register" className="text-blue-800 underline">
            register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
