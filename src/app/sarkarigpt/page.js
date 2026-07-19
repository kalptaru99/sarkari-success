"use client";
import { useState, useRef, useEffect } from "react";

const suggestedQuestionsByLanguage = {
  "Hindi": [
    "SSC CGL 2026 की पात्रता क्या है?",
    "RRB NTPC का सिलेबस बताएं",
    "UPSC की तैयारी कैसे शुरू करें?",
    "बैंकिंग परीक्षा में कौन से विषय होते हैं?",
    "Railway Group D की फिजिकल टेस्ट डिटेल्स",
    "SSC CGL vs IBPS PO कौन बेहतर है?",
  ],
  "English": [
    "SSC CGL 2026 eligibility criteria",
    "RRB NTPC syllabus details",
    "UPSC preparation strategy for beginners",
    "Subjects in banking exams",
    "Railway Group D physical test details",
    "SSC CGL vs IBPS PO which is better?",
  ],
  "Tamil": [
    "TNPSC Group 4 2026 தகுதி என்ன?",
    "SSC CGL தேர்வு எப்படி தயாரிக்கணும்?",
    "RRB NTPC பாடத்திட்டம் விவரங்கள்",
    "வங்கி தேர்வுகளில் என்ன பாடங்கள் உள்ளன?",
    "UPSC தேர்வு எப்படி படிக்கணும்?",
    "அரசு வேலை சம்பளம் எவ்வளவு?",
  ],
  "Telugu": [
    "APPSC Group 2 2026 అర్హతలు ఏమిటి?",
    "SSC CGL పరీక్షకు ఎలా సిద్ధం కావాలి?",
    "RRB NTPC సిలబస్ వివరాలు",
    "బ్యాంకింగ్ పరీక్షలలో ఏ విషయాలు ఉంటాయి?",
    "UPSC పరీక్షకు ఎలా చదవాలి?",
    "ప్రభుత్వ ఉద్యోగ జీతం ఎంత?",
  ],
  "Malayalam": [
    "Kerala PSC LDC 2026 യോഗ്യത എന്ത്?",
    "SSC CGL പരീക്ഷക്ക് എങ്ങനെ തയ്യാറെടുക്കാം?",
    "RRB NTPC സിലബസ് വിവരങ്ങൾ",
    "ബാങ്കിംഗ് പരീക്ഷകളിൽ എന്ത് വിഷയങ്ങൾ?",
    "UPSC പരീക്ഷക്ക് എങ്ങനെ പഠിക്കാം?",
    "സർക്കാർ ജോലി ശമ്പളം എത്ര?",
  ],
  "Kannada": [
    "KPSC 2026 ಅರ್ಹತೆ ಏನು?",
    "SSC CGL ಪರೀಕ್ಷೆಗೆ ಹೇಗೆ ತಯಾರಾಗಬೇಕು?",
    "RRB NTPC ಪಠ್ಯಕ್ರಮ ವಿವರಗಳು",
    "ಬ್ಯಾಂಕಿಂಗ್ ಪರೀಕ್ಷೆಗಳಲ್ಲಿ ಯಾವ ವಿಷಯಗಳು?",
    "UPSC ಪರೀಕ್ಷೆಗೆ ಹೇಗೆ ಓದಬೇಕು?",
    "ಸರ್ಕಾರಿ ಉದ್ಯೋಗ ವೇತನ ಎಷ್ಟು?",
  ],
  "Marathi": [
    "MPSC 2026 पात्रता काय आहे?",
    "SSC CGL परीक्षेची तयारी कशी करावी?",
    "RRB NTPC अभ्यासक्रम तपशील",
    "बँकिंग परीक्षांमध्ये कोणते विषय असतात?",
    "UPSC परीक्षेसाठी कसे अभ्यास करावे?",
    "सरकारी नोकरीचा पगार किती असतो?",
  ],
  "Bengali": [
    "WBPSC 2026 যোগ্যতা কী?",
    "SSC CGL পরীক্ষার প্রস্তুতি কীভাবে নেব?",
    "RRB NTPC সিলেবাস বিবরণ",
    "ব্যাংকিং পরীক্ষায় কী কী বিষয় থাকে?",
    "UPSC পরীক্ষার জন্য কীভাবে পড়ব?",
    "সরকারি চাকরির বেতন কত?",
  ],
  "Gujarati": [
    "GPSC 2026 લાયકાત શું છે?",
    "SSC CGL પરીક્ષાની તૈયારી કેવી રીતે કરવી?",
    "RRB NTPC અભ્યાસક્રમ વિગતો",
    "બેંકિંગ પરીક્ષાઓમાં કયા વિષયો હોય છે?",
    "UPSC પરીક્ષા માટે કેવી રીતે અભ્યાસ કરવો?",
    "સરકારી નોકરીનો પગાર કેટલો?",
  ],
  "Odia": [
    "OPSC 2026 ଯୋଗ୍ୟତା କ'ଣ?",
    "SSC CGL ପରୀକ୍ଷା ପ୍ରସ୍ତୁତି କିପରି କରିବ?",
    "RRB NTPC ପାଠ୍ୟକ୍ରମ ବିବରଣୀ",
    "ବ୍ୟାଙ୍କିଂ ପରୀକ୍ଷାରେ କ'ଣ ବିଷୟ ଅଛି?",
    "UPSC ପ୍ରସ୍ତୁତି କିପରି କରିବ?",
    "ସରକାରୀ ଚାକିରିର ବେତନ କେତେ?",
  ],
  "Punjabi": [
    "PPSC 2026 ਯੋਗਤਾ ਕੀ ਹੈ?",
    "SSC CGL ਪ੍ਰੀਖਿਆ ਦੀ ਤਿਆਰੀ ਕਿਵੇਂ ਕਰੀਏ?",
    "RRB NTPC ਸਿਲੇਬਸ ਵੇਰਵੇ",
    "ਬੈਂਕਿੰਗ ਪ੍ਰੀਖਿਆਵਾਂ ਵਿੱਚ ਕਿਹੜੇ ਵਿਸ਼ੇ ਹੁੰਦੇ ਹਨ?",
    "UPSC ਪ੍ਰੀਖਿਆ ਲਈ ਕਿਵੇਂ ਪੜ੍ਹੀਏ?",
    "ਸਰਕਾਰੀ ਨੌਕਰੀ ਦੀ ਤਨਖਾਹ ਕਿੰਨੀ ਹੈ?",
  ],
  "Assamese": [
    "APSC 2026 যোগ্যতা কি?",
    "SSC CGL পৰীক্ষাৰ প্ৰস্তুতি কেনেকৈ লব?",
    "RRB NTPC পাঠ্যক্ৰমৰ বিৱৰণ",
    "বেংকিং পৰীক্ষাত কি কি বিষয় থাকে?",
    "UPSC পৰীক্ষাৰ বাবে কেনেকৈ পঢ়িব?",
    "চৰকাৰী চাকৰিৰ দৰমহা কিমান?",
  ],
};

export default function SarkariGPT() {
  const [preferredLanguage, setPreferredLanguage] = useState("Hindi");

  const welcomeMessages = {
    "Hindi": "नमस्ते! 🙏 मैं SarkariGPT हूँ — आपका AI करियर गाइड सरकारी नौकरियों के लिए। SSC, Railway, UPSC, Banking या किसी भी सरकारी नौकरी के बारे में पूछें। मैं हिंदी और English दोनों में मदद कर सकता हूँ!",
    "English": "Hello! 🙏 I am SarkariGPT — your AI career guide for government jobs. Ask me about SSC, Railway, UPSC, Banking or any government exam. I can help you in English and Hindi!",
    "Tamil": "வணக்கம்! 🙏 நான் SarkariGPT — உங்கள் AI தொழில் வழிகாட்டி. SSC, Railway, UPSC, Banking மற்றும் அனைத்து அரசு வேலை தேர்வுகள் பற்றி கேளுங்கள். தமிழிலும் ஆங்கிலத்திலும் உதவுவேன்!",
    "Telugu": "నమస్కారం! 🙏 నేను SarkariGPT — మీ AI కెరీర్ గైడ్. SSC, Railway, UPSC, Banking లేదా ఏదైనా ప్రభుత్వ ఉద్యోగం గురించి అడగండి. తెలుగు మరియు ఇంగ్లీష్ లో సహాయం చేస్తాను!",
    "Malayalam": "നമസ്കാരം! 🙏 ഞാൻ SarkariGPT — നിങ്ങളുടെ AI കരിയർ ഗൈഡ്. SSC, Railway, UPSC, Banking അല്ലെങ്കിൽ ഏതെങ്കിലും സർക്കാർ ജോലിയെ കുറിച്ച് ചോദിക്കൂ. മലയാളത്തിലും ഇംഗ്ലീഷിലും സഹായിക്കാം!",
    "Kannada": "ನಮಸ್ಕಾರ! 🙏 ನಾನು SarkariGPT — ನಿಮ್ಮ AI ವೃತ್ತಿ ಮಾರ್ಗದರ್ಶಿ. SSC, Railway, UPSC, Banking ಅಥವಾ ಯಾವುದೇ ಸರ್ಕಾರಿ ಉದ್ಯೋಗದ ಬಗ್ಗೆ ಕೇಳಿ. ಕನ್ನಡ ಮತ್ತು ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಸಹಾಯ ಮಾಡುತ್ತೇನೆ!",
    "Marathi": "नमस्कार! 🙏 मी SarkariGPT — तुमचा AI करिअर गाइड. SSC, Railway, UPSC, Banking किंवा कोणत्याही सरकारी नोकरीबद्दल विचारा. मराठी आणि इंग्रजीत मदत करेन!",
    "Bengali": "নমস্কার! 🙏 আমি SarkariGPT — আপনার AI ক্যারিয়ার গাইড। SSC, Railway, UPSC, Banking বা যেকোনো সরকারি চাকরি সম্পর্কে জিজ্ঞেস করুন। বাংলা ও ইংরেজিতে সাহায্য করব!",
    "Gujarati": "નમસ્તે! 🙏 હું SarkariGPT — તમારો AI કારકિર્દી માર્ગદર્શક. SSC, Railway, UPSC, Banking અથવા કોઈ પણ સરકારી નોકરી વિશે પૂછો. ગુજરાતી અને અંગ્રેજીમાં મદદ કરીશ!",
    "Odia": "ନମସ୍କାର! 🙏 ମୁଁ SarkariGPT — ଆପଣଙ୍କ AI କ୍ୟାରିୟର ଗାଇଡ୍। SSC, Railway, UPSC, Banking ବା ଯେକୌଣସି ସରକାରୀ ଚାକିରି ବିଷୟରେ ପଚାରନ୍ତୁ। ଓଡ଼ିଆ ଓ ଇଂରାଜୀରେ ସାହାଯ୍ୟ କରିବି!",
    "Punjabi": "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! 🙏 ਮੈਂ SarkariGPT — ਤੁਹਾਡਾ AI ਕਰੀਅਰ ਗਾਈਡ। SSC, Railway, UPSC, Banking ਜਾਂ ਕਿਸੇ ਵੀ ਸਰਕਾਰੀ ਨੌਕਰੀ ਬਾਰੇ ਪੁੱਛੋ। ਪੰਜਾਬੀ ਅਤੇ ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ ਮਦਦ ਕਰਾਂਗਾ!",
    "Assamese": "নমস্কাৰ! 🙏 মই SarkariGPT — আপোনাৰ AI কেৰিয়াৰ গাইড। SSC, Railway, UPSC, Banking বা যিকোনো চৰকাৰী চাকৰিৰ বিষয়ে সুধিব। অসমীয়া আৰু ইংৰাজীত সহায় কৰিম!",
  };

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: welcomeMessages["Hindi"],
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [isListening, setIsListening] = useState(false);

  const startVoice = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {
      alert('Please allow microphone access to use voice search.');
      return;
    }
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice search not supported. Please use Chrome browser.');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'hi-IN';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = (event) => {
      setIsListening(false);
      if (event.error === 'not-allowed') {
        alert('Microphone access denied. Please allow it in Chrome settings.');
      } else if (event.error === 'no-speech') {
        alert('No speech detected. Please try again.');
      } else {
        alert('Voice error: ' + event.error);
      }
    };
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setTimeout(() => sendMessage(transcript, true), 300);
    };
    recognition.start();
  };
  const suggestedQuestions = suggestedQuestionsByLanguage[preferredLanguage] || suggestedQuestionsByLanguage["Hindi"];

  useEffect(() => {
    fetch("/api/student-profile")
      .then(res => res.json())
      .then(data => {
        const lang = data?.profile?.preferred_language || "Hindi";
        setPreferredLanguage(lang);
        setMessages([{
          role: "assistant",
          content: welcomeMessages[lang] || welcomeMessages["Hindi"],
        }]);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text, autoDetectLanguage = false) => {
    const userMessage = text || input.trim();
    if (!userMessage) return;

    setInput("");
    setLoading(true);

    const newMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);

    try {
      const profileRes = await fetch("/api/student-profile");
      const profileData = await profileRes.json();
      const preferredLanguage = autoDetectLanguage ? 'auto' : (profileData?.profile?.preferred_language || "Hindi");

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: messages.map(m => ({ role: m.role, content: m.content })),
          preferredLanguage,
        }),
      });

      const data = await response.json();

      setMessages(prev => [...prev, {
        role: "assistant",
        content: data.reply || data.error,
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Sorry, kuch problem aa gayi. Please dobara try karein.",
      }]);
    }

    setLoading(false);
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>
            Sarkari<span style={{ color: '#fca5a5' }}>GPT</span>
          </h1>
          <p style={{ color: '#93c5fd', fontSize: '12px', margin: '2px 0 0 0' }}>
            AI-Powered Govt Job Career Guide
          </p>
        </div>
        <a href="/" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← Home</a>
      </div>

      {/* Suggested Questions */}
      <div style={{ backgroundColor: 'white', padding: '12px 20px', borderBottom: '1px solid #e5e7eb', overflowX: 'auto' }}>
        <div style={{ display: 'flex', gap: '8px', whiteSpace: 'nowrap' }}>
          {suggestedQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => sendMessage(q)}
              style={{
                padding: '6px 14px',
                borderRadius: '20px',
                border: '1px solid #1e3a8a',
                backgroundColor: 'white',
                color: '#1e3a8a',
                fontSize: '12px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px', maxWidth: '800px', width: '100%', margin: '0 auto' }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: '16px',
            }}
          >
            {msg.role === 'assistant' && (
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#1e3a8a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', marginRight: '10px', flexShrink: 0 }}>
                🤖
              </div>
            )}
            <div style={{
              maxWidth: '70%',
              padding: '12px 16px',
              borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              backgroundColor: msg.role === 'user' ? '#1e3a8a' : 'white',
              color: msg.role === 'user' ? 'white' : '#1a1a1a',
              fontSize: '14px',
              lineHeight: '1.6',
              boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
              whiteSpace: 'pre-wrap',
            }}>
              {msg.content}
            </div>
            {msg.role === 'user' && (
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', marginLeft: '10px', flexShrink: 0 }}>
                👤
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#1e3a8a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
              🤖
            </div>
            <div style={{ backgroundColor: 'white', padding: '12px 16px', borderRadius: '18px 18px 18px 4px', boxShadow: '0 2px 6px rgba(0,0,0,0.08)' }}>
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{
                    width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#1e3a8a',
                    animation: `bounce 1s infinite ${i * 0.2}s`,
                  }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{ backgroundColor: 'white', borderTop: '1px solid #e5e7eb', padding: '16px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !loading && sendMessage()}
            placeholder="SSC, Railway, UPSC ke baare mein poochein..."
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '25px',
              border: '2px solid #e5e7eb',
              fontSize: '14px',
              outline: 'none',
              color: '#1a1a1a',
            }}
          />
          <button
            onClick={startVoice}
            style={{ padding: '10px', borderRadius: '50%', border: 'none', backgroundColor: isListening ? '#dc2626' : 'white', boxShadow: isListening ? '0 0 0 4px rgba(220,38,38,0.2)' : '0 1px 4px rgba(0,0,0,0.15)', cursor: 'pointer', flexShrink: 0, width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
            title={isListening ? 'Listening...' : 'Speak your question'}
          >
            {isListening ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <rect x="6" y="4" width="4" height="12" rx="2"/>
                <rect x="14" y="4" width="4" height="12" rx="2"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="9" y="2" width="6" height="12" rx="3" fill="#dc2626"/>
                <path d="M5 10a7 7 0 0 0 14 0" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round"/>
                <line x1="12" y1="17" x2="12" y2="21" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round"/>
                <line x1="9" y1="21" x2="15" y2="21" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
          </button><button
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            style={{
              padding: '12px 20px',
              borderRadius: '25px',
              border: 'none',
              backgroundColor: loading || !input.trim() ? '#93c5fd' : '#1e3a8a',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '14px',
              cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
            }}
          >
            Send →
          </button>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </main>
  );
}