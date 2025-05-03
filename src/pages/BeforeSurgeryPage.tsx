
import React from 'react';
import QASection from '@/components/QASection';

const BeforeSurgeryPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Before Surgery</h1>
      <p className="text-lg text-neutral-dark max-w-3xl mx-auto mb-10 text-center">
        Understanding what to expect before your procedure can help reduce anxiety and ensure the best possible outcome.
      </p>

      <div className="max-w-3xl mx-auto">
        <QASection question="What is pre-operative assessment?" defaultOpen={true}>
          <p>
            A pre-operative assessment is a thorough review of your medical history, physical examination, blood tests, 
            ECG and other investigations to identify potential risks and optimize your health before anaesthesia.
          </p>
          <p className="mt-4">
            During this assessment, your anaesthetist will:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Review your medical history and previous surgeries</li>
            <li>Ask about allergies and current medications</li>
            <li>Perform a physical examination focused on your heart and lungs</li>
            <li>Evaluate test results including blood work and ECG</li>
            <li>Discuss the anaesthetic plan and answer your questions</li>
          </ul>
        </QASection>

        <QASection question="Why is fasting required?">
          <p>
            Fasting before surgery is essential to reduce the risk of stomach contents entering your lungs during anaesthesia, 
            a serious complication called aspiration.
          </p>
          <div className="mt-4 bg-amber/10 p-4 rounded-lg border border-amber">
            <h4 className="font-semibold">Fasting Guidelines:</h4>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li><strong>Solids and milk:</strong> Stop 6 hours before surgery</li>
              <li><strong>Clear fluids (water, tea without milk):</strong> Stop 2 hours before surgery</li>
            </ul>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold">Sip Till Send Program:</h4>
            <p>
              Many hospitals now encourage patients to drink clear fluids until 2 hours before surgery. This helps 
              prevent dehydration and may improve your recovery. Ask your healthcare provider about the "Sip Till Send" protocol.
            </p>
            <p className="mt-2">
              <a 
                href="https://cpoc.org.uk/sites/cpoc/files/documents/2025-01/Sip%20Til%20Send%20information%20for%20patients_0.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo hover:text-indigo-light underline"
              >
                Learn more about Sip Till Send fasting information
              </a>
            </p>
          </div>
        </QASection>

        <QASection question="Which medications to avoid?">
          <p>
            Some medications can interfere with anaesthesia or increase surgical bleeding risk. Always inform your 
            anaesthetist about all medications you're taking, including over-the-counter drugs and supplements.
          </p>
          <div className="mt-4">
            <h4 className="font-semibold">Medications that may need to be stopped or adjusted include:</h4>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li><strong>Blood thinners:</strong> Aspirin, clopidogrel, warfarin</li>
              <li><strong>NSAIDs:</strong> Ibuprofen, diclofenac</li>
              <li><strong>Herbal supplements:</strong> Ginkgo, garlic, fish oil</li>
            </ul>
            <p className="mt-4 text-sm bg-neutral-light p-3 rounded-lg">
              Important: Never stop prescription medications without consulting your doctor or anaesthetist first.
            </p>
          </div>
        </QASection>

        <QASection question="How to prepare mentally and physically?">
          <div>
            <h4 className="font-semibold">Physical Preparation:</h4>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Get a good night's sleep before surgery</li>
              <li>Stay hydrated until fasting time begins</li>
              <li>Follow any specific instructions from your surgical team</li>
              <li>Avoid alcohol for at least 24 hours before surgery</li>
              <li>If you smoke, try to quit or reduce smoking before surgery</li>
            </ul>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold">Mental Preparation:</h4>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Ask questions during your pre-op assessment to address any concerns</li>
              <li>Practice relaxation techniques like deep breathing or meditation</li>
              <li>Bring comforting items to the hospital (within hospital guidelines)</li>
              <li>Arrange for support from family or friends after discharge</li>
            </ul>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold">Practical Preparations:</h4>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Arrange transport to and from the hospital</li>
              <li>Prepare your home for your return (easy meals, comfortable recovery area)</li>
              <li>Bring a list of your medications, allergies, and previous anaesthetic experiences</li>
              <li>Remove jewelry, makeup, and nail polish before surgery</li>
              <li>Follow specific instructions about bathing/showering before surgery</li>
            </ul>
          </div>
        </QASection>
      </div>
    </div>
  );
};

export default BeforeSurgeryPage;
