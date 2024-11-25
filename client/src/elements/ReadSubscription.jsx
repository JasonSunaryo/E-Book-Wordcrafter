import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CreditCard } from "lucide-react";
import axios from "axios";

function ReadSubscription() {
  const [subscription, setSubscription] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/book_subscription/${id}`)
      .then((res) => {
        console.log('Subscription data:', res.data);
        if (res.data && res.data.data) {
          setSubscription(res.data.data);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!subscription) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto mt-[5rem]">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto mt-[5rem]">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-purple-600">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <CreditCard className="h-6 w-6" />
                Subscription Plan Details
              </h1>
              <Link
                to="/subscriptions"
                className="flex items-center gap-2 bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                Back to Plans
              </Link>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-6">
              <div className="bg-purple-50 rounded-lg p-6 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-500 font-medium">Plan Name</label>
                  <p className="text-2xl font-semibold text-gray-900">{subscription.name}</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-500 font-medium">Price</label>
                  <p className="text-xl font-medium text-purple-600">
                    ${parseFloat(subscription.prices).toFixed(2)}/month
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-500 font-medium">Plan Details</label>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-gray-700 whitespace-pre-wrap">{subscription.detail}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-purple-100">
                  <div className="flex justify-between text-sm text-gray-500">
                    <div>
                      <span className="font-medium">Plan ID:</span> #{subscription.id}
                    </div>
                    <div>
                      <span className="font-medium">Created:</span>{' '}
                      {new Date(subscription.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Link
                  to={`/edit-subscription/${subscription.id}`}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-center py-3 rounded-lg shadow transition-colors"
                >
                  Edit Plan
                </Link>
                <Link
                  to="/subscriptions"
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-center py-3 rounded-lg shadow transition-colors"
                >
                  Back to List
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReadSubscription;