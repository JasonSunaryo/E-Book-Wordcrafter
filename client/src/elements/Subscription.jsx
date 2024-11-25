import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CreditCard, Edit, Trash2, PlusCircle, BookOpen } from "lucide-react";

function Subscriptions() {
  const [deleted, setDeleted] = useState(true);
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    if (deleted) {
      setDeleted(false);
      axios
        .get("http://localhost:5000/book_subscription")
        .then((res) => {
          console.log("Fetched Subscriptions:", res.data);
          const subscriptionData = res.data.data || [];
          setSubscriptions(Array.isArray(subscriptionData) ? subscriptionData : []);
        })
        .catch((err) => {
          console.log(err);
          setSubscriptions([]);
        });
    }
  }, [deleted]);

  function handleDelete(id) {
    axios
      .delete(`http://localhost:5000/book_subscription/${id}`)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.message);
          setDeleted(true);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <div className="max-w-7xl mx-auto mt-[5rem]">
        <div className="bg-white rounded-lg shadow-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <CreditCard className="text-purple-600 h-8 w-8" />
              <h1 className="text-3xl font-bold text-gray-900">
                Subscription Plans
              </h1>
            </div>
            <Link
              to="/create-subscription"
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-md transition-all"
            >
              <PlusCircle size={20} />
              Add Plan
            </Link>
          </div>

          {subscriptions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 text-lg">No subscription plans available</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg shadow-md">
              <table className="w-full text-left border-collapse bg-white">
                <thead>
                  <tr className="bg-purple-600 text-white">
                    <th className="px-6 py-3 font-semibold">ID</th>
                    <th className="px-6 py-3 font-semibold">Plan Name</th>
                    <th className="px-6 py-3 font-semibold">Details</th>
                    <th className="px-6 py-3 font-semibold">Price (Monthly)</th>
                    <th className="px-6 py-3 font-semibold">Created At</th>
                    <th className="px-6 py-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {subscriptions.map((plan) => (
                    <tr
                      key={plan.id}
                      className="hover:bg-gray-50 transition-all"
                    >
                      <td className="px-6 py-4">{plan.id}</td>
                      <td className="px-6 py-4 font-medium">{plan.name}</td>
                      <td className="px-6 py-4">
                        <div className="max-w-[20rem] truncate">{plan.detail}</div>
                      </td>
                      <td className="px-6 py-4">
                        ${parseFloat(plan.prices).toFixed(2)}/month
                      </td>
                      <td className="px-6 py-4">
                        {new Date(plan.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Link
                            to={`/read-subscription/${plan.id}`}
                            className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow transition-all"
                          >
                            <BookOpen size={16} />
                            Read
                          </Link>
                          <Link
                            to={`/edit-subscription/${plan.id}`}
                            className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow transition-all"
                          >
                            <Edit size={16} />
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(plan.id)}
                            className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow transition-all"
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Subscriptions;