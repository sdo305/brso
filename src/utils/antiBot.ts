import CryptoJS from 'crypto-js';

interface BotCheckResult {
  isBot: boolean;
  suspicious: boolean;
  reason?: string;
}

const SELENIUM_MARKERS = [
  '__webdriver_script_fn', '__driver_evaluate', '__webdriver_evaluate',
  '__fxdriver_evaluate', '__driver_unwrapped', '__webdriver_unwrapped',
  '__selenium_unwrapped', '__fxdriver_unwrapped', '_Selenium_IDE_Recorder',
  '_selenium', 'calledSelenium', 'domAutomation', 'domAutomationController',
  '__$webdriverAsyncExecutor', '__lastWatirAlert', '__lastWatirConfirm',
  '__lastWatirPrompt', '_WEBDRIVER_ELEM_CACHE',
];

export class AntiBotProtection {
  private static instance: AntiBotProtection;
  private fingerprint: string = '';
  private ready: Promise<void>;
  private totalInteractions = 0;
  private mousePositions: Array<[number, number]> = [];

  private constructor() {
    this.ready = this.initFingerprint();
    this.setupListeners();
  }

  static getInstance(): AntiBotProtection {
    if (!AntiBotProtection.instance) AntiBotProtection.instance = new AntiBotProtection();
    return AntiBotProtection.instance;
  }

  async whenReady(): Promise<void> {
    return this.ready;
  }

  getFingerprint(): string {
    return this.fingerprint;
  }

  private async initFingerprint(): Promise<void> {
    try {
      const parts = [
        navigator.userAgent,
        navigator.language,
        (navigator.languages || []).join(','),
        `${screen.width}x${screen.height}`,
        String(screen.colorDepth),
        String(new Date().getTimezoneOffset()),
        String(navigator.hardwareConcurrency || 0),
        navigator.platform || '',
        String((navigator as any).deviceMemory || ''),
      ].join('|');
      this.fingerprint = CryptoJS.SHA256(parts).toString();
    } catch {
      this.fingerprint = CryptoJS.SHA256(navigator.userAgent + Date.now()).toString();
    }
  }

  private setupListeners(): void {
    const inc = () => { this.totalInteractions++; };
    document.addEventListener('mousemove', (e) => {
      this.totalInteractions++;
      this.mousePositions.push([e.clientX, e.clientY]);
      if (this.mousePositions.length > 12) this.mousePositions.shift();
    });
    document.addEventListener('keydown', inc);
    document.addEventListener('scroll', inc);
    document.addEventListener('click', inc);
    document.addEventListener('touchstart', inc);
    document.addEventListener('touchmove', inc);
  }

  async checkForBot(): Promise<BotCheckResult> {
    const hard = this.hardChecks();
    if (hard) return { isBot: true, suspicious: false, reason: hard };
    const soft = this.softChecks();
    if (soft) return { isBot: false, suspicious: true, reason: soft };
    return { isBot: false, suspicious: false };
  }

  private hardChecks(): string | null {
    if ((window as any)._phantom || (window as any).callPhantom) return 'phantom';
    if ((window as any).__nightmare) return 'nightmare';
    if (document.documentElement.getAttribute('webdriver')) return 'dom_webdriver';
    for (const m of SELENIUM_MARKERS) {
      if (m in window || m in document) return 'selenium';
    }
    const wk = Object.keys(window);
    if (wk.some(k => /^\$cdc_|^cdc_/.test(k))) return 'chromedriver';
    const ua = navigator.userAgent.toLowerCase();
    if (/headlesschrome|phantomjs|selenium|puppeteer|playwright|cypress|webdriver|bytespider/.test(ua)) return 'bot_ua';
    if (/googlebot|bingbot|yandexbot|duckduckbot|slurp|lighthouse|pagespeed|petalbot/.test(ua)) return 'crawler';
    try {
      const stack = new Error().stack || '';
      if (/phantomjs|selenium|puppeteer|playwright/.test(stack.toLowerCase())) return 'stack_automation';
    } catch {}
    return null;
  }

  private softChecks(): string | null {
    if ((navigator as any).webdriver === true) return 'webdriver';
    const ua = navigator.userAgent;
    if (/Electron/i.test(ua)) return 'electron';
    const isMobile = /mobile|android|iphone/i.test(ua);
    if (!isMobile && window.outerWidth - window.innerWidth === 0 && window.outerHeight - window.innerHeight === 0 && window.innerWidth > 900) return 'headless_window';
    if (/Chrome/i.test(ua) && !(window as any).chrome && navigator.plugins.length === 0) return 'fake_chrome';
    if (!isMobile && screen.width === 800 && screen.height === 600) return 'headless_resolution';
    if (screen.colorDepth < 24 && !isMobile) return 'low_color_depth';
    if (!navigator.languages || navigator.languages.length === 0) return 'no_languages';
    if (navigator.languages.length === 1 && navigator.languages[0] !== navigator.language) return 'lang_mismatch';
    return null;
  }

  async recheckBehavior(): Promise<boolean> {
    await new Promise(r => setTimeout(r, 4000));
    if (this.totalInteractions === 0) return true;
    if (this.mousePositions.length >= 5) {
      let collinear = 0;
      for (let i = 2; i < this.mousePositions.length; i++) {
        const [x1, y1] = this.mousePositions[i - 2];
        const [x2, y2] = this.mousePositions[i - 1];
        const [x3, y3] = this.mousePositions[i];
        const cross = Math.abs((x2 - x1) * (y3 - y2) - (y2 - y1) * (x3 - x2));
        if (cross < 1) collinear++;
      }
      if (collinear > 4) return true;
    }
    return false;
  }
}
