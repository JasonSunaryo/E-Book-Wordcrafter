import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Home, CreditCard, Save, Loader2 } from "lucide-react";

function CreateSubscription() {
  const [values, setValues] = useState({
    name: "",
    detail: "",
    prices: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    axios
      .post("http://localhost:5000/book_subscription", values)
      .then((res) => {
        setLoading(false);
        navigate("/subscriptions");
        console.log(res);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto mt-[5rem]">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <CreditCard className="text-purple-600 h-8 w-8" />
              <h1 className="text-3xl font-bold text-gray-900">Add New Subscription Plan</h1>
            </div>
            <Link
              to="/subscriptions"
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Home size={20} />
              Back
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Plan Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={values.name}
                onChange={(e) =>
                  setValues((prevState) => ({
                    ...prevState,
                    [e.target.name]: e.target.value,
                  }))
                }
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-gray-900 px-4 py-2.5 bg-gray-50"
                placeholder="Enter plan name (e.g. Basic, Premium)"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="detail"
                className="block text-sm font-medium text-gray-700"
              >
                Plan Details
              </label>
              <textarea
                name="detail"
                id="detail"
                required
                value={values.detail}
                onChange={(e) =>
                  setValues((prevState) => ({
                    ...prevState,
                    [e.target.name]: e.target.value,
                  }))
                }
                rows={4}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-gray-900 px-4 py-2.5 bg-gray-50"
                placeholder="Enter plan details and features"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="prices"
                className="block text-sm font-medium text-gray-700"
              >
                Price (Monthly)
              </label>
              <div className="relative mt-1 rounded-lg shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  name="prices"
                  id="prices"
                  required
                  value={values.prices}
                  onChange={(e) =>
                    setValues((prevState) => ({
                      ...prevState,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  className="block w-full rounded-lg border-gray-300 pl-7 pr-12 focus:border-purple-500 focus:ring-purple-500 text-gray-900 px-4 py-2.5 bg-gray-50"
                  placeholder="0.00"
                  step="0.01"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-gray-500 sm:text-sm">/month</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Creating Plan...
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5" />
                    Create Plan
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateSubscription;