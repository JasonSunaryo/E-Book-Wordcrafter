import { useState, useEffect } from "react";
import axios from "axios";
import "../assets/css/app.css";
import "../output.css";

function Subs() {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
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
  }, []);

  // Function to format features from detail string
  const getFeatures = (detail) => {
    // Split the detail string by newlines or periods to create feature list
    return detail.split(/[.\n]/).filter(feature => feature.trim().length > 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 via-purple-900 to-red-900 overflow-hidden">
      <section className="subs-subscription-section">
        <div className="subs-container">
          {subscriptions.map((plan) => (
            <div key={plan.id} className="subs-card">
              <div className="subs-card-content">
                <div className="subs-title">{plan.name}</div>
                <div className="subs-price">
                  ${parseFloat(plan.prices).toFixed(2)}
                  <span className="subs-monthly">/monthly</span>
                </div>
                <ul className="subs-features">
                  {getFeatures(plan.detail).map((feature, index) => (
                    <li key={index}>{feature.trim()}</li>
                  ))}
                </ul>
                <button className="subs-btn">GET STARTED</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Subs;