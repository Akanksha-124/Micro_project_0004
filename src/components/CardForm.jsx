import React from 'react';

const CardForm = ({ cardData, setCardData, errors, handleSubmit, handleInputChange }) => {
  return (
    <form className="card-form" onSubmit={handleSubmit} noValidate>
      {/* Cardholder Name */}
      <div className="form-group">
        <label htmlFor="cardholderName">Cardholder Name</label>
        <input
          type="text"
          id="cardholderName"
          name="name"
          placeholder="e.g. Jane Appleseed"
          value={cardData.name}
          onChange={handleInputChange}
          className={errors.name ? 'input-error' : ''}
          autoComplete="cc-name"
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      {/* Card Number */}
      <div className="form-group">
        <label htmlFor="cardNumber">Card Number</label>
        <input
          type="text"
          id="cardNumber"
          name="number"
          placeholder="e.g. 1234 5678 9123 0000"
          value={cardData.number}
          onChange={handleInputChange}
          className={errors.number ? 'input-error' : ''}
          maxLength={19}
          autoComplete="cc-number"
        />
        {errors.number && <span className="error-message">{errors.number}</span>}
      </div>

      {/* Exp Date & CVC Row */}
      <div className="form-row">
        {/* Exp Date */}
        <div className="form-group">
          <label htmlFor="expMonth">Exp. Date (MM/YY)</label>
          <div className="expiry-inputs">
            <input
              type="text"
              id="expMonth"
              name="expMonth"
              placeholder="MM"
              value={cardData.expMonth}
              onChange={handleInputChange}
              className={errors.expMonth || errors.expDate ? 'input-error' : ''}
              maxLength={2}
              autoComplete="cc-exp-month"
            />
            <input
              type="text"
              id="expYear"
              name="expYear"
              placeholder="YY"
              value={cardData.expYear}
              onChange={handleInputChange}
              className={errors.expYear || errors.expDate ? 'input-error' : ''}
              maxLength={2}
              autoComplete="cc-exp-year"
            />
          </div>
          {(errors.expMonth || errors.expYear || errors.expDate) && (
            <span className="error-message">
              {errors.expMonth || errors.expYear || errors.expDate}
            </span>
          )}
        </div>

        {/* CVC */}
        <div className="form-group">
          <label htmlFor="cvc">CVC</label>
          <input
            type="text"
            id="cvc"
            name="cvc"
            placeholder="e.g. 123"
            value={cardData.cvc}
            onChange={handleInputChange}
            className={errors.cvc ? 'input-error' : ''}
            maxLength={4}
            autoComplete="cc-csc"
          />
          {errors.cvc && <span className="error-message">{errors.cvc}</span>}
        </div>
      </div>

      <button type="submit" className="btn-confirm">
        Confirm
      </button>
    </form>
  );
};

export default CardForm;
