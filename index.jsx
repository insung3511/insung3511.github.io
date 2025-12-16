import React, { useState, useEffect, useRef } from 'react';
import { Mail, Smartphone, Linkedin, Github, MessageSquare, X, Send, Sparkles, Loader2 } from 'lucide-react';

export default function App() {
  const [scale, setScale] = useState(1);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'model', text: 'Hello! I am AI InSung. Ask me anything about my research or projects!' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
  // A4 용지 기준 해상도 (96DPI 기준 약 794px x 1123px)
  const A4_WIDTH = 794;
  const A4_HEIGHT = 1123; 

  // 이력서 데이터 (Gemini에게 컨텍스트로 제공)
  const RESUME_CONTEXT = `
    You are InSung Bahk, a B.S. in Artificial Intelligence Convergence graduate from Hallym University (GPA 3.99/4.5).
    Your goal is to be helpful, professional, and concise. Answer questions based STRICTLY on the following resume content. Do not invent facts.

    [Contact]
    Email: insung.bahk@gmail.com, Mobile: +82-10-3511-0256
    LinkedIn: linkedin.com/in/insung3511, GitHub: github.com/insung3511

    [Research Interests]
    Undergraduate researcher at Hallym Univ (Mar 2022-Present). Specialized in Medical AI (1D, 2D, Spectral ECG) and FastAPI deployment.
    Currently researching distributed EdgeAI optimization via MILP. Goal: Stable/scalable EdgeAI architectures in medical domain.

    [Experience]
    1. RNDIx EDGEAI Team (Feb 2023-Nov 2024): Research Participant.
       - 2nd author of paper at ICS 2024 (Kyoto). Topic: Efficient model inference on edge devices.
       - Implemented optimization using Python/PyTorch. Formulated resource allocation as MILP solved by IBM CPLEX.
    2. LIKELION 11TH (Dec 2022-Dec 2023): Vice President.
       - Managed study groups, taught Python/Git. Co-organized "Potatothon" (30 participants).
    3. Healthcare Innovation Lab (Mar 2022-Dec 2022): Research Intern.
       - Benchmarked DL models for ECG (83% acc). Designed CNN+GRU hybrid model (F1 0.95 on MIT-BIH).

    [Projects]
    1. Re:Hab Project (Aug 2023-Aug 2024): Grand Prize at Capstone Design. FastAPI backend, PyTorch exercise similarity, ChatGPT clinical dialogue system.
    2. Motus Project (Aug 2023-Nov 2023): CV-based pose estimation platform for motion analysis.

    [Publications]
    "An Autonomous Parallelization of Transformer Model Inference on Heterogeneous Edge Devices", ICS 2024.
    
    [Skills]
    Python (Signal processing), AI/ML (PyTorch, TF/Keras), Deployment (FastAPI), Korean(Native), English(Intermediate).
  `;

  const handleSendMessage = async () => {
    if (!chatMessage.trim()) return;

    const userMsg = chatMessage;
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatMessage('');
    setIsLoading(true);

    try {
      const apiKey = ""; // API Key handled by environment
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: userMsg }]
              }
            ],
            systemInstruction: {
              parts: [{ text: RESUME_CONTEXT }]
            }
          }),
        }
      );

      const data = await response.json();
      const botResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't process that request right now.";

      setChatHistory(prev => [...prev, { role: 'model', text: botResponse }]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setChatHistory(prev => [...prev, { role: 'model', text: "Sorry, I encountered a connection error." }]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const availableWidth = window.innerWidth - 40;
      const availableHeight = window.innerHeight - 40;
      const scaleX = availableWidth / A4_WIDTH;
      const scaleY = availableHeight / A4_HEIGHT;
      const newScale = Math.min(scaleX, scaleY);
      setScale(newScale);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-screen h-screen bg-[#525659] flex items-center justify-center overflow-hidden">
      <div 
        style={{ 
          width: `${A4_WIDTH}px`,
          height: `${A4_HEIGHT}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
        }}
        className="bg-white shadow-[0_0_15px_rgba(0,0,0,0.5)] text-black p-[50px] box-border relative font-serif"
      >
        {/* === Photo Placeholder === */}
        <div className="absolute top-[50px] right-[50px] w-[110px] h-[140px] border border-gray-300 bg-gray-50 flex flex-col items-center justify-center text-gray-400 text-xs text-center p-2">
          <span>PHOTO</span>
          <span className="text-[10px] mt-1">(Add Later)</span>
        </div>

        {/* === Header === */}
        <div className="mb-8 border-b-2 border-black pb-4 pr-[130px]"> 
          <h1 className="text-4xl font-bold mb-2 uppercase tracking-wide">InSung Bahk</h1>
          <p className="text-lg italic mb-3 text-gray-700">B.S. in Artificial Intelligence Convergence</p>
          
          <div className="text-sm space-y-1 text-gray-800">
            <div className="flex items-center gap-2"><span className="font-bold w-16">Email:</span> <span>insung.bahk@gmail.com</span></div>
            <div className="flex items-center gap-2"><span className="font-bold w-16">Mobile:</span> <span>+82-10-3511-0256</span></div>
            <div className="flex items-center gap-2"><span className="font-bold w-16">LinkedIn:</span> <span>linkedin.com/in/insung3511</span></div>
            <div className="flex items-center gap-2"><span className="font-bold w-16">GitHub:</span> <span>github.com/insung3511</span></div>
          </div>
        </div>

        {/* === Content Grid === */}
        <div className="space-y-6 text-sm leading-snug">
          {/* EDUCATION */}
          <section>
            <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-2 pb-1">Education</h2>
            <div className="flex justify-between font-bold">
              <span>Hallym University</span>
              <span className="font-normal text-gray-600">Chuncheon, Republic of Korea</span>
            </div>
            <div className="flex justify-between"><span className="italic">B.S. Artificial Intelligence Convergence</span></div>
            <div className="mt-1"><span className="font-semibold">GPA: 3.99/4.5</span></div>
          </section>

          {/* RESEARCH INTERESTS */}
          <section>
            <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-2 pb-1">Research Interests</h2>
            <div className="flex">
              <div className="w-[120px] font-bold shrink-0">Mar 2022 - Present</div>
              <div className="text-justify">
                Undergraduate researcher at Hallym University specialized in Medical AI and Healthcare. 
                Focused on experimental signal processing (1D, 2D, Spectral ECG) and FastAPI-based service deployment. 
                Currently researching distributed EdgeAI optimization via MILP. Driven by these experiences, 
                I aim to develop stable and scalable EdgeAI architectures that are highly applicable and reliable within the medical domain.
              </div>
            </div>
          </section>

          {/* EXPERIENCE */}
          <section>
            <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-2 pb-1">Experience</h2>
            <div className="mb-4">
              <div className="flex justify-between font-bold"><span>RNDIx EDGEAI Team</span><span>Seoul, Republic of Korea</span></div>
              <div className="flex justify-between mb-1"><span className="italic">Research Participant</span><span className="italic text-gray-600">Feb 2023 - Nov 2024</span></div>
              <ul className="list-disc ml-5 space-y-1 text-justify">
                <li>Contributed as second author to a paper accepted at the prestigious International Conference on Supercomputing (ICS 2024), focusing on efficient model inference on edge devices.</li>
                <li>Implemented the optimization strategy using Python and PyTorch, and formulated the resource allocation problem as a Mixed-Integer Linear Program (MILP) solved by IBM CPLEX.</li>
                <li>Developed and delivered technical presentations on research progress, facilitating knowledge sharing within the research team.</li>
              </ul>
            </div>
            <div className="mb-4">
              <div className="flex justify-between font-bold"><span>LIKELION 11TH & Potatothon</span><span>Chuncheon, Republic of Korea</span></div>
              <div className="flex justify-between mb-1"><span className="italic">Vice President</span><span className="italic text-gray-600">Dec 2022 - Dec 2023</span></div>
              <ul className="list-disc ml-5 space-y-1 text-justify">
                <li>Served as Vice President of a university-wide software club (LIKELION), spearheading operational management and establishing structured study groups.</li>
                <li>Trained junior members by conducting specialized technical sessions on foundational development tools, including Python programming and Git/GitHub version control.</li>
                <li>Co-organized and Managed Potatothon, a 24-hour regional inter-university hackathon, overseeing logistics for 30 participants and four corporate sponsors.</li>
              </ul>
            </div>
            <div>
              <div className="flex justify-between font-bold"><span>Healthcare Innovation Lab., Hallym University</span><span>Chuncheon, Republic of Korea</span></div>
              <div className="flex justify-between mb-1"><span className="italic">Research Intern (Advisor: Prof. In cheol Jeong)</span><span className="italic text-gray-600">Mar 2022 - Dec 2022</span></div>
              <ul className="list-disc ml-5 space-y-1 text-justify">
                <li>Developed and benchmarked deep learning models for 12-class ECG classification using wearable data, achieving an 83% classification accuracy.</li>
                <li>Designed a highly effective CNN+GRU hybrid model, demonstrating superior performance with an F1 score of 0.95 on the public MIT-BIH database.</li>
                <li>Implemented custom signal extraction and preprocessing algorithms to optimize raw ECG datasets for deep learning analysis.</li>
              </ul>
            </div>
          </section>

          {/* PROJECTS */}
          <section>
            <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-2 pb-1">Projects</h2>
            <div className="mb-3">
              <div className="flex justify-between font-bold"><span>Re:Hab Project | <span className="font-normal text-sm">github.com/sync-without-async</span></span><span className="text-sm font-normal text-gray-600">Aug 2023 - Aug 2024</span></div>
              <ul className="list-disc ml-5 space-y-1 text-justify">
                <li>Won the Grand Prize (1st) at Hallym Capstone Design for developing a FastAPI-based backend with high-precision exercise similarity evaluation using PyTorch.</li>
                <li>Integrated a ChatGPT-based clinical dialogue system to automate the recording and summarization of patient consultations into digital charts.</li>
              </ul>
            </div>
            <div>
              <div className="flex justify-between font-bold"><span>Motus Project | <span className="font-normal text-sm">github.com/MotuS-Web</span></span><span className="text-sm font-normal text-gray-600">Aug 2023 - Nov 2023</span></div>
              <ul className="list-disc ml-5 space-y-1 text-justify">
                <li>Developed a CV-based platform using Pose Estimation to quantify movement similarity and provide real-time feedback for motion analysis.</li>
                <li>Engineered the core algorithm for measuring similarity between human movements, optimized for a user-centric open-source web interface.</li>
              </ul>
            </div>
          </section>
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-6 text-sm">
           {/* CERTIFICATION & AWARDS */}
           <div>
            <h2 className="text-md font-bold uppercase border-b border-gray-400 mb-2 pb-1">Certification & Awards</h2>
            <ul className="list-disc ml-4 space-y-1 text-xs">
              <li>Corporate Sponsorship Award (Deepnoid), National SW Contest (Aug 2024)</li>
              <li>First Prize, AI Convergence Academic Festival (Dec 2023)</li>
              <li>Grand Prize, Hallym University Capstone Design Contest (Dec 2023)</li>
              <li>Third Prize, College of Info. Sciences Academic Festival (Nov 2023)</li>
              <li>Excellence Award, Korean Society of Digital Health (Nov 2022)</li>
              <li>Academic Excellence Scholarship (3 consecutive semesters)</li>
            </ul>
           </div>

           {/* SKILLS & INTERESTS */}
           <div>
             <h2 className="text-md font-bold uppercase border-b border-gray-400 mb-2 pb-1">Skills</h2>
             <div className="text-xs space-y-1">
               <p><span className="font-bold">Python:</span> Data analysis, signal processing, experimental app.</p>
               <p><span className="font-bold">AI & ML:</span> Deep learning model research (PyTorch, TF/Keras).</p>
               <p><span className="font-bold">Deployment:</span> FastAPI, RESTful API, AI service integration.</p>
               <p><span className="font-bold">Collaboration:</span> GitHub, Notion, Slack.</p>
               <p><span className="font-bold">Language:</span> Korean (Native), English (Intermediate).</p>
             </div>
           </div>
        </div>
        
        <div className="mt-4 text-xs text-gray-500 text-center border-t pt-2">
           <span className="font-bold text-black">Republic of Korea Army (Feb 2024 - Aug 2025):</span> Battalion-level communications specialist in a regional defense unit.
        </div>

        {/* === GEMINI AI CHAT FEATURE === */}
        {/* Floating Post-it Note Style Button/Chat */}
        <div className={`absolute bottom-8 right-8 transition-all duration-300 ${isChatOpen ? 'w-80 h-96' : 'w-48 h-12'}`}>
          {!isChatOpen ? (
            <button 
              onClick={() => setIsChatOpen(true)}
              className="w-full h-full bg-yellow-200 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2 border border-yellow-300 rotate-[-2deg] font-sans text-sm text-yellow-900 font-bold"
            >
              <Sparkles size={16} />
              Ask AI InSung
            </button>
          ) : (
            <div className="w-full h-full bg-yellow-50 shadow-xl border border-yellow-200 flex flex-col relative rotate-0 transition-transform font-sans">
              {/* Post-it Header */}
              <div className="bg-yellow-200 p-3 flex justify-between items-center border-b border-yellow-300">
                <span className="text-xs font-bold text-yellow-900 flex items-center gap-1">
                  <Sparkles size={12}/> AI Assistant
                </span>
                <button onClick={() => setIsChatOpen(false)} className="text-yellow-800 hover:text-black">
                  <X size={16} />
                </button>
              </div>

              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-yellow-50">
                {chatHistory.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-2 rounded text-xs ${
                      msg.role === 'user' 
                        ? 'bg-white border border-yellow-200 text-gray-800' 
                        : 'bg-yellow-100 border border-yellow-200 text-gray-900'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                   <div className="flex justify-start">
                    <div className="bg-yellow-100 p-2 rounded text-xs flex items-center gap-1">
                      <Loader2 size={12} className="animate-spin"/> Thinking...
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-2 border-t border-yellow-200 bg-white flex gap-2">
                <input 
                  type="text" 
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about my resume..."
                  className="flex-1 text-xs p-2 border border-yellow-200 rounded focus:outline-none focus:border-yellow-400"
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={isLoading}
                  className="bg-yellow-300 p-2 rounded text-yellow-900 hover:bg-yellow-400 disabled:opacity-50"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
