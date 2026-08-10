import React from 'react';

const CreditCard = ({ cardData }) => {
  const { name, number, expMonth, expYear, cvc } = cardData;

  // Format card number to show 16 digits grouped in 4s with placeholder default
  const formattedNumber = (() => {
    const rawDigits = (number || '').replace(/\s+/g, '');
    const defaultPlaceholder = '0000000000000000';
    const padded = rawDigits + defaultPlaceholder.slice(rawDigits.length);
    const groups = padded.match(/.{1,4}/g) || ['0000', '0000', '0000', '0000'];
    return groups.join(' ');
  })();

  const displayName = name ? name.toUpperCase() : 'JANE APPLESEED';
  const displayMonth = expMonth ? expMonth.padStart(2, '0') : '00';
  const displayYear = expYear ? expYear.padStart(2, '0') : '00';
  const displayCvc = cvc ? cvc : '000';

  return (
    <div className="cards-wrapper">
      {/* Front Card */}
      <div className="credit-card credit-card-front" aria-label="Front of credit card">
        <div className="card-logo">
          <div className="logo-circle-large"></div>
          <div className="logo-circle-small"></div>
        </div>

        <div className="card-number-display">
          {formattedNumber}
        </div>

        <div className="card-details-row">
          <div className="cardholder-name" title={displayName}>
            {displayName}
          </div>
          <div className="card-expiry">
            {displayMonth}/{displayYear}
          </div>
        </div>
      </div>

      {/* Back Card */}
      <div className="credit-card credit-card-back" aria-label="Back of credit card">
        <div className="black-stripe"></div>
        <div className="cvc-strip">
          <span className="cvc-display">{displayCvc}</span>
        </div>
        <div className="back-lines">
          <div className="back-line back-line-1"></div>
          <div className="back-line back-line-2"></div>
          <div className="back-line back-line-3"></div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
