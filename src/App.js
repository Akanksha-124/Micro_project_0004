import React, { useState } from 'react';
import CreditCard from './components/CreditCard';
import CardForm from './components/CardForm';
import SuccessState from './components/SuccessState';
import Toast from './components/Toast';

const initialCardState = {
  name: '',
  number: '',
  expMonth: '',
  expYear: '',
  cvc: '',
};

function App() {
  const [cardData, setCardData] = useState(initialCardState);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Auto-format card number as standard 4-digit groups (e.g. 1234 5678 9123 0000)
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/g, '');
    const matches = v.match(/\d{1,4}/g);
    const match = (matches && matches.join(' ')) || '';
    return match.substring(0, 19); // 16 digits + 3 spaces
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'number') {
      const formatted = formatCardNumber(value);
      setCardData((prev) => ({ ...prev, number: formatted }));
    } else if (name === 'expMonth' || name === 'expYear' || name === 'cvc') {
      // Numbers only constraint
      const numericVal = value.replace(/\D/g, '');
      setCardData((prev) => ({ ...prev, [name]: numericVal }));
    } else {
      setCardData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error for edited field dynamically
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const rawNumber = cardData.number.replace(/\s+/g, '');

    // 1. Name validation
    if (!cardData.name.trim()) {
      newErrors.name = "Can't be blank";
    }

    // 2. Card number validation
    if (!cardData.number.trim()) {
      newErrors.number = "Can't be blank";
    } else if (!/^\d+$/.test(rawNumber)) {
      newErrors.number = 'Wrong format, numbers only';
    } else if (rawNumber.length !== 16) {
      newErrors.number = 'Must be 16 digits';
    }

    // 3. Expiry Month validation
    if (!cardData.expMonth.trim()) {
      newErrors.expMonth = "Can't be blank";
    } else {
      const monthNum = parseInt(cardData.expMonth, 10);
      if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
        newErrors.expMonth = 'Invalid month';
      }
    }

    // 4. Expiry Year validation
    if (!cardData.expYear.trim()) {
      newErrors.expYear = "Can't be blank";
    } else if (cardData.expYear.length !== 2) {
      newErrors.expYear = 'Must be 2 digits';
    }

    // 5. CVC validation
    if (!cardData.cvc.trim()) {
      newErrors.cvc = "Can't be blank";
    } else if (cardData.cvc.length < 3 || cardData.cvc.length > 4) {
      newErrors.cvc = 'Must be 3 or 4 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
      setShowToast(true);
    }
  };

  const handleReset = () => {
    setCardData(initialCardState);
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <div className="app-container">
      {/* Visual Credit Card Hero Section */}
      <section className="hero-section">
        <CreditCard cardData={cardData} />
      </section>

      {/* Form / Success State Interactive Section */}
      <main className="form-section">
        <div className="form-container">
          {isSubmitted ? (
            <SuccessState handleReset={handleReset} />
          ) : (
            <CardForm
              cardData={cardData}
              setCardData={setCardData}
              errors={errors}
              handleSubmit={handleSubmit}
              handleInputChange={handleInputChange}
            />
          )}
        </div>
      </main>

      {/* Toast Notification */}
      {showToast && (
        <Toast
          message="Card details updated successfully!"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}

export default App;
