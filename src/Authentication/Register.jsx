/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { useContext, useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
// import axiosPublic from "../components/axiosPublic"; // Adjust the path if needed

const Register = () => {
  const { createNewUser, setUser, createUserWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState({});

  const handleGoogleSignUP = () => {
    // createUserWithGoogle()
    //     .then((result) => {
    //         const user = result.user;

    //         // Check if the user already exists in the backend
    //         return axiosPublic.get(`/users/email/${user.email}`)
    //             .then((response) => {
    //                 if (response.data.exists) {
    //                     // User already exists, just log them in
    //                     // SuccessToaster("Successfully Logged In with Google");
    //                     navigate(location?.state ? location.state : "/");
    //                 } else {
    //                     // User doesn't exist, save their data to the backend
    //                     const userData = {
    //                         name: user.displayName,
    //                         email: user.email,
    //                         photo: user.photoURL,
    //                         role: "User", // Default role for Google sign-ups
    //                         createdAt: new Date().toISOString(),
    //                     };

    //                     return axiosPublic.post("/users", userData);
    //                 }
    //             });
    //     })
    //     .then((response) => {
    //         if (response && response.data?.acknowledged) {
    //             // SuccessToaster("Successfully Logged In with Google");
    //             navigate(location?.state ? location.state : "/dashboard");
    //         }
    //     })
    //     .catch((error) => {
    //         console.error("Google Sign-Up Error:", error.message);
    //         setError((prevError) => ({
    //             ...prevError,
    //             google: "Google sign-up failed. Please try again.",
    //         }));
    //     });

    createUserWithGoogle()
    .then((result) => {
      const userData = {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
        role: "User",
      };
      axiosPublic.post("/users", userData).catch(console.error);
      navigate("/");
    })
    .catch(error);
};


  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});

    const form = new FormData(e.target);
    const name = form.get("name");
    const email = form.get("email");
    const photo = form.get("photo");
    const password = form.get("password");
    const role = form.get("role"); // Get the role value

    if (name.length < 5) {
      setError((prevError) => ({
        ...prevError,
        name: "Name should be more than 5 characters.",
      }));
      return;
    }

    const passwordValidation = {
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      length: password.length >= 6,
    };

    if (!passwordValidation.uppercase) {
      setError((prevError) => ({
        ...prevError,
        password: "Password must contain at least one uppercase letter.",
      }));
      return;
    }
    if (!passwordValidation.lowercase) {
      setError((prevError) => ({
        ...prevError,
        password: "Password must contain at least one lowercase letter.",
      }));
      return;
    }
    if (!passwordValidation.length) {
      setError((prevError) => ({
        ...prevError,
        password: "Password must be at least 6 characters long.",
      }));
      return;
    }

    if (!role || role === "Select Role") {
      setError((prevError) => ({
        ...prevError,
        role: "Please select a role before creating an account.",
      }));
      return;
    }

    createNewUser(email, password, photo)
      .then((result) => {
        setUser(result.user);
        // Save user data to backend
        const userData = { name, email, photo, role };
        axiosPublic.post('/users', userData)
          .then((response) => {
            console.log(response);
            navigate("/");
          })
          .catch((error) => {
            setError((prevError) => ({
              ...prevError,
              register: "Failed to save user data. Please try again.",
            }));
          });
      })
      .catch((err) => {
        setError((prevError) => ({
          ...prevError,
          register: "Failed to register. Please try again.",
        }));
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Create Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                name="name"
                type="text"
                placeholder="Enter your full name"
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-100 focus:border-indigo-400"
                required
              />
              {error.name && <p className="text-red-500 text-xs mt-1">{error.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Photo URL</label>
              <input
                name="photo"
                type="text"
                placeholder="Enter photo URL"
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-100 focus:border-indigo-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-100 focus:border-indigo-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Create a password"
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-100 focus:border-indigo-400"
                required
              />
              {error.password && <p className="text-red-500 text-xs mt-1">{error.password}</p>}
            </div>
            <div>
              <select
                name="role"
                className="select select-bordered max-w-xs"
                required
              >
                <option disabled value="">Select Role</option>
                <option value="User">User</option>
              </select>
              {error.role && <p className="text-red-500 text-xs mt-1">{error.role}</p>}
            </div>
          </div>
          {error.register && <p className="text-red-500 text-sm mt-4">{error.register}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-100 mt-6"
          >
            Register
          </button>
        </form>
        <div className="flex flex-col text-center items-center gap-2 justify-center mt-6">
          <button
            onClick={handleGoogleSignUP}
            className="flex gap-2 mx-auto text-center items-center w-full bg-gray-100 border rounded-md py-2 px-4 text-gray-700 hover:bg-gray-50"
          >
            <FaGoogle className="text-lg" /> Sign up with Google
          </button>
          <button className="flex gap-2 items-center w-full bg-white border rounded-md py-2 px-4 text-gray-700 hover:bg-gray-50">
            <FaGithub className="text-lg" /> Sign up with Github
          </button>
        </div>
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
